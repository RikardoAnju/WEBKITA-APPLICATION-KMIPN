package database

import (
	"database/sql"
	"log"
	"strings"

	_ "github.com/go-sql-driver/mysql"

	"BackendFramework/internal/config"
)

var (
	DbWebkita *sql.DB
)


func OpenWebkita() {
	// Buat DSN
	dsn := config.DB_WEBKITA_USERNAME + ":" +
		config.DB_WEBKITA_PASSWORD + "@tcp(" +
		config.DB_WEBKITA_HOSTNAME + ")/" +
		config.DB_WEBKITA_DBNAME

	
	safeDSN := strings.Replace(dsn, config.DB_WEBKITA_PASSWORD, "****", 1)
	log.Printf("🔹 Connecting to DB Webkita: %s", safeDSN)

	var err error
	DbWebkita, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Printf("❌ Failed to connect to DB Akademik: %v", err)
		return
	}

	// cek koneksi
	if err = DbWebkita.Ping(); err != nil {
		log.Printf("❌ DB Akademik connection error: %v", err)
		return
	}

	log.Println("✅ Connected to DB Webkita")
}

func CloseAll() {
	if DbWebkita != nil {
		_ = DbWebkita.Close()
	}
	log.Println("🔌 DB Webkita connection closed")
}
