package config

import (
	"os"
)

var (
	// Credential DB Core
	DB_CORE_HOSTNAME string
	DB_CORE_USERNAME string
	DB_CORE_PASSWORD string
	DB_CORE_DBNAME   string

	// Credential DB Akademik
	DB_WEBKITA_HOSTNAME string
	DB_WEBKITA_USERNAME string
	DB_WEBKITA_PASSWORD string
	DB_WEBKITA_DBNAME   string

	// Credential DB Auth
	DB_AUTH_HOSTNAME string
	DB_AUTH_USERNAME string
	DB_AUTH_PASSWORD string
	DB_AUTH_DBNAME   string
)

func InitDatabaseVars() {
	// Core
	DB_CORE_HOSTNAME = os.Getenv("DB_CORE_HOSTNAME" + Prefix)
	DB_CORE_USERNAME = os.Getenv("DB_CORE_USERNAME" + Prefix)
	DB_CORE_PASSWORD = os.Getenv("DB_CORE_PASSWORD" + Prefix)
	DB_CORE_DBNAME   = os.Getenv("DB_CORE_DBNAME" + Prefix)

	// Akademik
	DB_WEBKITA_HOSTNAME = os.Getenv("DB_WEBKITA_HOSTNAME" + Prefix)
	DB_WEBKITA_USERNAME = os.Getenv("DB_WEBKITA_USERNAME" + Prefix)
	DB_WEBKITA_PASSWORD = os.Getenv("DB_WEBKITA_PASSWORD" + Prefix)
	DB_WEBKITA_DBNAME   = os.Getenv("DB_WEBKITA_DBNAME" + Prefix)

	// Auth
	DB_AUTH_HOSTNAME = os.Getenv("DB_AUTH_HOSTNAME" + Prefix)
	DB_AUTH_USERNAME = os.Getenv("DB_AUTH_USERNAME" + Prefix)
	DB_AUTH_PASSWORD = os.Getenv("DB_AUTH_PASSWORD" + Prefix)
	DB_AUTH_DBNAME   = os.Getenv("DB_AUTH_DBNAME" + Prefix)
}
