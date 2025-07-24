// backend/main.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"horaweb-backend/backup"
	"io"
	"log"
	"net/http"

	"github.com/rs/cors"
)

type DemoRequest struct {
	CompanyName string `json:"company_name"`
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

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("📥 Received request at /")
		fmt.Fprintln(w, "✅ Hora backend is running!")
	})

	http.HandleFunc("/submit-demo", handleSubmitDemo)
	http.HandleFunc("/submit-join", handleSubmitJoin)
	http.HandleFunc("/submit-contact", handleSubmitContact)
	// 🚀 新增這一行：馬上手動備份用
	http.HandleFunc("/backup-now", func(w http.ResponseWriter, r *http.Request) {
		err := backup.BackupAndSend()
		if err != nil {
			http.Error(w, "Backup failed: "+err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write([]byte("✅ Backup sent successfully!"))
	})

	backup.StartBackupScheduler()

	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://my-hora.com"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}).Handler(http.DefaultServeMux)

	log.Println("🚀 Server running at http://localhost:8080")
	http.ListenAndServe(":8080", handler)

}

func sendToPocketbase(w http.ResponseWriter, collection string, payload map[string]interface{}) {
	jsonData, _ := json.Marshal(payload)

	url := "http://127.0.0.1:8090/api/collections/" + collection + "/records"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		http.Error(w, "建立請求失敗", 500)
		return
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode >= 400 {
		log.Println("PocketBase Error:", err, resp.StatusCode)
		http.Error(w, "PocketBase 寫入失敗", 500)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}

func handleSubmitDemo(w http.ResponseWriter, r *http.Request) {

	// ✅ 只允許 POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// 🧾 解析傳入 JSON 資料
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

	payload := map[string]interface{}{
		"company_name": form.CompanyName,
		"full_name":    form.FullName,
		"email":        form.Email,
	}

	sendToPocketbase(w, "demo_requests", payload)
}

func handleSubmitJoin(w http.ResponseWriter, r *http.Request) {

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
