package backup

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gopkg.in/gomail.v2"
)

// PocketBase API base URL
const baseURL = "http://127.0.0.1:8090"

// Collections to back up
var collections = []string{"contact_us", "demo_requests", "join_requests"}

// Main function to back up data and email it
func BackupAndSend() error {
	allData := make(map[string]interface{})

	for _, col := range collections {
		url := fmt.Sprintf("%s/api/collections/%s/records?perPage=1000", baseURL, col)

		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("❌ Error fetching:", col, err)
			continue
		}
		defer resp.Body.Close()

		if resp.StatusCode != 200 {
			fmt.Println("❌ Error response for", col, "status:", resp.StatusCode)
			continue
		}

		body, _ := io.ReadAll(resp.Body)

		var parsed map[string]interface{}
		if err := json.Unmarshal(body, &parsed); err != nil {
			fmt.Println("❌ Failed to parse:", col)
			continue
		}

		items := parsed["items"].([]interface{})
		fmt.Printf("📦 %s - fetched %d items\n", col, len(items)) // ✅ 加這一行
		allData[col] = items
	}

	// Write to file
	timestamp := time.Now().Format("2006-01-02_15-04")
	filename := fmt.Sprintf("pb_backup_%s.json", timestamp)

	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	// 將備份內容寫入 JSON 檔案
	if err := json.NewEncoder(file).Encode(allData); err != nil {
		return err
	}

	// 傳送 email
	err = sendEmailWithAttachment(filename)
	if err != nil {
		return err
	}

	// ✅ 傳送成功後刪除本地檔案（不留下多餘備份）
	if removeErr := os.Remove(filename); removeErr != nil {
		fmt.Println("⚠️ 無法刪除備份檔案：", removeErr)
	}

	return nil
}

// Sends an email with the backup file attached
func sendEmailWithAttachment(filepath string) error {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("⚠️ 無法載入 .env 檔案:", err)
	}

	from := os.Getenv("EMAIL_FROM")
	to := os.Getenv("EMAIL_TO")
	pass := os.Getenv("EMAIL_PASS")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", "📦 PocketBase Weekly Backup")
	m.SetBody("text/plain", "Attached is your weekly backup file.")
	m.Attach(filepath)

	port, err := parsePort(smtpPort)
	if err != nil {
		return fmt.Errorf("SMTP_PORT 格式錯誤: %v", err)
	}
	d := gomail.NewDialer(smtpHost, port, from, pass)
	return d.DialAndSend(m)
}

func parsePort(s string) (int, error) {
	var p int
	_, err := fmt.Sscanf(s, "%d", &p)
	return p, err
}
