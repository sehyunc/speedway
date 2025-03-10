package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	rtmv1 "github.com/sonr-io/sonr/third_party/types/motor/api/v1"
)

type CreateAccountBody struct {
	Password string `json:"password"`
}

type CreateAccountResponse struct {
	Address string `json:"address"`
}

type FailedResponse struct {
	Error string `json:"error"`
}

// @BasePath /api/v1
// @Summary CreateAccount
// @Schemes
// @Description Create a new account on Sonr using the Registry module of Sonr's Blockchain.
// @Tags Account
// @Accept json
// @Produce json
// @Param 		 password body string true "password" example("Password")
// @Success 	 200  {object}  CreateAccountResponse
// @Failure      500  {object}  FailedResponse
// @Router /account/create [post]
func (ns *NebulaServer) CreateAccount(c *gin.Context) {
	var body CreateAccountBody
	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, FailedResponse{
			Error: err.Error(),
		})
		return
	}

	req := rtmv1.CreateAccountRequest{
		Password: body.Password,
	}
	b := ns.Config.Binding

	res, err := b.CreateAccount(req)
	if err != nil {
		fmt.Println("err", err)
		c.JSON(http.StatusInternalServerError, FailedResponse{
			Error: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, CreateAccountResponse{
		Address: res.Address,
	})
}
