package main

import (
	"log"

	"BackendFramework/internal/config"
	"BackendFramework/internal/database"
	"github.com/joho/godotenv"
	"BackendFramework/internal/middleware"
	"BackendFramework/internal/route"
)

func init() {
	// Load .env file di root project
	if err := godotenv.Load(); err != nil {
		log.Println("Tidak bisa load .env, pakai environment system")
	}

	config.InitEnvronment()
	config.InitDatabaseVars()
	config.InitEncryptionVars()
	config.InitBucketVars()
	config.InitEmailVars()

	middleware.InitLogger()
	middleware.InitValidator()

	database.OpenWebkita()
	database.OpenAuth()
}

func main() {
	router := route.SetupRouter()

	
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
