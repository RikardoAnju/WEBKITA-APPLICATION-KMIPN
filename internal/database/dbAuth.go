package database

import (
	"database/sql"
	"log"
	"strings"

	_ "github.com/go-sql-driver/mysql"

	"BackendFramework/internal/config"
)

var DbAuth *sql.DB

func OpenAuth() {
	
	dsn := config.DB_AUTH_USERNAME + ":" +
		config.DB_AUTH_PASSWORD + "@tcp(" +
		config.DB_AUTH_HOSTNAME + ")/" +
		config.DB_AUTH_DBNAME

	// Mask password untuk log
	safeDSN := strings.Replace(dsn, config.DB_AUTH_PASSWORD, "****", 1)
	log.Printf("🔹 Connecting to DB Auth: %s", safeDSN)

	var err error
	DbAuth, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Printf("❌ Failed to connect to DB AUTH: %v", err)
		return
	}

	// Test koneksi
	if err := DbAuth.Ping(); err != nil {
		log.Printf("❌ Failed to ping DB AUTH: %v", err)
		return
	}

	log.Println("✅ Connected to DB Auth")
}
