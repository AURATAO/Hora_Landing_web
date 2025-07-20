package backup

import (
	"fmt"

	"github.com/robfig/cron/v3"
)

func StartBackupScheduler() {
	c := cron.New()

	// 每週一凌晨 3 點自動備份
	c.AddFunc("0 3 * * 1", func() {
		fmt.Println("⏰ Running scheduled backup...")
		if err := BackupAndSend(); err != nil {
			fmt.Println("❌ Backup failed:", err)
		} else {
			fmt.Println("✅ Backup success and email sent!")
		}
	})
	c.AddFunc("0 3 * * 1", func() {
		fmt.Println("⏰ Running scheduled backup...")
		_ = BackupAndSend()
	})

	c.Start()
}
