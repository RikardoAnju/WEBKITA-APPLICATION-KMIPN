package v1

import(
	"github.com/gin-gonic/gin"

	"BackendFramework/internal/controller"
	"BackendFramework/internal/middleware"
	"BackendFramework/internal/model"
)

func InitRoutes(r *gin.RouterGroup) {
	// Public Routes
	r.POST("/login", controller.Login)
	r.GET("/logout/:usrId", controller.Logout)
	r.POST("/refresh-access",middleware.LogUserActivity(), controller.RefreshAccessToken)
	r.POST("/register", controller.NewAuthController().Register)
    r.POST("/login-email", controller.NewAuthController().LoginWithEmail)
    r.POST("/login-username", controller.NewAuthController().LoginWithUsername)


	// User Group
	user := r.Group("/user")
	{
		user.Use(middleware.JWTAuthMiddleware(),middleware.LogUserActivity())
		user.GET("/",controller.GetUser)
		user.GET("/:usrId",controller.GetUser)
		user.DELETE("/:usrId",controller.DeleteUser)


		userInput := &model.UserInput{}
		user.PUT("/",middleware.InputValidator(userInput),controller.InsertUser)
		user.PATCH("/",middleware.InputValidator(userInput),controller.UpdatetUser)
		
		user.GET("/profile",controller.GetUserProfile)
	}

	misc := r.Group("/misc")
	{
		misc.Use(middleware.JWTAuthMiddleware(),middleware.LogUserActivity())
		fileInput := &model.FileInput{}	
		misc.POST("/upload-data-s3-local",middleware.InputValidator(fileInput),controller.UploadFile)
		misc.GET("/generate-pdf",controller.TryGeneratePdf)
		misc.GET("/send-mail",controller.SendMail)
		misc.GET("/generate-excel",controller.GenerateExcel)
		misc.POST("/read-excel",controller.ReadExcel)
		misc.GET("/test-ping",controller.PingMongo)
	}
}