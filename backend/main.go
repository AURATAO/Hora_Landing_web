// backend/main.go
package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type DemoRequest struct {
	CompanyName string `json:"company_name"`
	FullName    string `json:"full_name"`
	Email       string `json:"email"`
}

func main() {
	http.HandleFunc("/submit-demo", handleSubmitDemo)

	log.Println("🚀 Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func handleSubmitDemo(w http.ResponseWriter, r *http.Request) {
	// ✅ 設定 CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// ✅ 處理預檢請求（OPTIONS）時，立刻回應 200，避免錯誤
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

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
	jsonData, _ := json.Marshal(payload)

	req, err := http.NewRequest("POST", "http://127.0.0.1:8090/api/collections/demo_requests/records", bytes.NewBuffer(jsonData))
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

	// 回傳 PocketBase 結果
	w.Header().Set("Content-Type", "application/json")
	io.Copy(w, resp.Body)
}
