package database

import (
	"log"
	"strings"

	"BackendFramework/internal/config"
	"BackendFramework/internal/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	DbWebkita *gorm.DB
)

func OpenWebkita() {
	var err error

	// Log konfigurasi database (tanpa password)
	log.Printf("🔹 DB Config - Username: '%s', Hostname: '%s', DBName: '%s'",
		config.DB_WEBKITA_USERNAME, config.DB_WEBKITA_HOSTNAME, config.DB_WEBKITA_DBNAME)

	// Format DSN untuk MySQL
	dsn := config.DB_WEBKITA_USERNAME + ":" +
		config.DB_WEBKITA_PASSWORD + "@tcp(" +
		config.DB_WEBKITA_HOSTNAME + ")/" +
		config.DB_WEBKITA_DBNAME +
		"?charset=utf8mb4&parseTime=True&loc=Local"

	// Log DSN dengan password tersembunyi
	safeDSN := strings.Replace(dsn, config.DB_WEBKITA_PASSWORD, "****", 1)
	log.Printf("🔹 Connecting to DB Webkita: %s", safeDSN)

	// Konfigurasi GORM
	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
		// Logger: logger.Default.LogMode(logger.Silent), // Uncomment untuk production
	}

	// Buka koneksi database dengan GORM
	DbWebkita, err = gorm.Open(mysql.Open(dsn), gormConfig)
	if err != nil {
		log.Fatalf("❌ Failed to connect to DB Webkita with GORM: %v", err)
	}

	// Dapatkan underlying sql.DB untuk konfigurasi lebih lanjut
	sqlDB, err := DbWebkita.DB()
	if err != nil {
		log.Fatalf("❌ Failed to get underlying sql.DB from GORM: %v", err)
	}

	// Cek koneksi dengan ping
	if err = sqlDB.Ping(); err != nil {
		log.Fatalf("❌ DB Webkita connection error: %v", err)
	}

	log.Println("✅ Connected to DB Webkita")

	// Konfigurasi connection pool
	ConfigureConnectionPool()

	// Auto-migrate tables
	AutoMigrate()
}

// ConfigureConnectionPool mengatur connection pool untuk performa optimal
func ConfigureConnectionPool() {
	sqlDB, err := DbWebkita.DB()
	if err != nil {
		log.Fatalf("❌ Failed to get underlying sql.DB: %v", err)
	}

	// SetMaxIdleConns mengatur jumlah maksimum koneksi idle
	sqlDB.SetMaxIdleConns(10)

	// SetMaxOpenConns mengatur jumlah maksimum koneksi open
	sqlDB.SetMaxOpenConns(100)

	// SetConnMaxLifetime mengatur waktu maksimum koneksi dapat digunakan kembali
	// sqlDB.SetConnMaxLifetime(time.Hour)

	log.Println("⚙️  Connection pool configured")
}


func AutoMigrate() {
	log.Println("🔄 Starting database auto-migration...")

	err := DbWebkita.AutoMigrate(
		&model.User{},
		
	)

	if err != nil {
		log.Fatalf("❌ Failed to auto-migrate database: %v", err)
	}

	log.Println("✅ Database auto-migration completed successfully")
}

// CloseWebkita menutup koneksi database
func CloseWebkita() {
	sqlDB, err := DbWebkita.DB()
	if err != nil {
		log.Printf("❌ Failed to get underlying sql.DB: %v", err)
		return
	}

	err = sqlDB.Close()
	if err != nil {
		log.Printf("❌ Failed to close database connection: %v", err)
		return
	}

	log.Println("🔌 DB Webkita connection closed")
}


func CloseAll() {
	CloseWebkita()
}