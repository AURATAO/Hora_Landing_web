package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"horaweb-backend/backup"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/rs/cors"
)

type DemoRequest struct {
	Company     string `json:"company"`      // 前端/DB 可能用的舊名
	CompanyName string `json:"company_name"` // 你前端現在送的
	FullName    string `json:"full_name"`
	Email       string `json:"email"`
}

type JoinRequest struct {
	Role     string `json:"role"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	City     string `json:"city"`
}
type ContactMessage struct {
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Message  string `json:"message"`
}

func main() {
	mux := http.NewServeMux()

	// healthz
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		log.Println("💓 /healthz hit, method=", r.Method)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("📥 Received request at /")
		fmt.Fprintln(w, "✅ Hora backend is running!")
	})

	mux.HandleFunc("/submit-demo", handleSubmitDemo)
	mux.HandleFunc("/submit-join", handleSubmitJoin)
	mux.HandleFunc("/submit-contact", handleSubmitContact)

	mux.HandleFunc("/backup-now", func(w http.ResponseWriter, r *http.Request) {
		if err := backup.BackupAndSend(); err != nil {
			http.Error(w, "Backup failed: "+err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write([]byte("✅ Backup sent successfully!"))
	})

	backup.StartBackupScheduler()

	// recover middleware
	recoverMw := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if rec := recover(); rec != nil {
					log.Printf("panic: %v", rec)
					http.Error(w, "internal error", http.StatusInternalServerError)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}

	// CORS
	env := os.Getenv("APP_ENV")
	var handler http.Handler

	if env == "dev" {
		log.Println("CORS mode: DEV (AllowAll)")
		handler = cors.AllowAll().Handler(recoverMw(mux))
	} else {
		log.Println("CORS mode: PROD (restricted origins)")
		handler = cors.New(cors.Options{
			AllowedOrigins: []string{
				"https://horaapp.co",
				"https://www.horaapp.co",
				"https://www.my-hora.com",
				"https://my-hora.com",
				"http://localhost:5173",
				"http://localhost:8080",
			},
			AllowOriginRequestFunc: func(r *http.Request, origin string) bool {
				return strings.HasSuffix(origin, ".vercel.app")
			},
			AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
			AllowedHeaders:   []string{"Content-Type", "Authorization"},
			AllowCredentials: true,
			Debug:            true,
		}).Handler(recoverMw(mux))
	}

	// PORT
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port
	log.Println("🚀 Server listening on", addr)
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal(err)
	}
}
func sendToPocketbase(w http.ResponseWriter, collection string, payload map[string]interface{}) {
	jsonData, err := json.Marshal(payload)
	if err != nil {
		log.Println("❌ JSON encode error:", err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	baseURL := os.Getenv("POCKETBASE_URL")
	if baseURL == "" {
		log.Println("❌ 環境變數 POCKETBASE_URL 沒設定")
		http.Error(w, "Server config error: missing PocketBase URL", http.StatusInternalServerError)
		return
	}

	url := baseURL + "/api/collections/" + collection + "/records"
	log.Println("📤 Sending request to:", url)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		http.Error(w, "建立請求失敗", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")

	// 加逾時，避免卡死
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("❌ PocketBase Error:", err)
		http.Error(w, "PocketBase 連線失敗", http.StatusBadGateway)
		return
	}
	// --- 先檢查 resp 是否為 nil，再 defer ---
	if resp == nil {
		log.Println("❌ PocketBase response is nil")
		http.Error(w, "PocketBase response error", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		bodyBytes, _ := io.ReadAll(resp.Body)
		log.Printf("❌ PocketBase returned status: %d Body: %s", resp.StatusCode, string(bodyBytes))
		http.Error(w, "PocketBase 寫入失敗", http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if _, err := io.Copy(w, resp.Body); err != nil {
		log.Println("❌ copy response error:", err)
	}
}

func handleSubmitDemo(w http.ResponseWriter, r *http.Request) {
	log.Println("🔥 handleSubmitDemo hit! method=", r.Method, "origin=", r.Header.Get("Origin"))
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var form DemoRequest
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "讀取資料失敗", http.StatusBadRequest)
		return
	}
	if err := json.Unmarshal(body, &form); err != nil {
		http.Error(w, "JSON 格式錯誤", http.StatusBadRequest)
		return
	}

	// 兼容：任一個有值都可
	company := form.Company
	if company == "" {
		company = form.CompanyName
	}
	if company == "" || form.FullName == "" || form.Email == "" {
		http.Error(w, "缺少必要欄位", http.StatusBadRequest)
		return
	}

	// ✅ 送進 PocketBase 時，用你實際 schema 的欄位名（常見是 "company"）
	payload := map[string]interface{}{
		"company":   company,
		"full_name": form.FullName,
		"email":     form.Email,
	}
	sendToPocketbase(w, "demo_requests", payload)
}

func handleSubmitJoin(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	var form JoinRequest
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "讀取資料失敗", http.StatusBadRequest)
		return
	}
	if err := json.Unmarshal(body, &form); err != nil {
		http.Error(w, "JSON 格式錯誤", http.StatusBadRequest)
		return
	}
	payload := map[string]interface{}{
		"role":      form.Role,
		"full_name": form.FullName,
		"email":     form.Email,
		"city":      form.City,
	}
	sendToPocketbase(w, "join_requests", payload)
}

func handleSubmitContact(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	var form ContactMessage
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "讀取資料失敗", http.StatusBadRequest)
		return
	}
	if err := json.Unmarshal(body, &form); err != nil {
		http.Error(w, "JSON 格式錯誤", http.StatusBadRequest)
		return
	}
	payload := map[string]interface{}{
		"full_name": form.FullName,
		"email":     form.Email,
		"message":   form.Message,
	}
	sendToPocketbase(w, "contact_us", payload)
}
