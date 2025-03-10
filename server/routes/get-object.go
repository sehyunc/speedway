package routes

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GetObject struct {
	SchemaDid string `json:"schemaDid"`
	ObjectCid string `json:"objectCid"`
}

// @BasePath /api/v1
// @Summary GetObject
// @Schemes
// @Description Get an object on Sonr using the object module of Sonr's Blockchain.
// @Tags Object
// @Accept json
// @Produce json
// @Param 		 SchemaDid body string true "SchemaDid" example("did:sonr:172ljvam8m7xxlv59v6w27lula58zwwct3vgn9p")
// @Param 		 ObjectCid body string true "ObjectCid" example("bafyreigfzxrtvfzuaoyhn5vgndneeeirq62efgf2s3igmoenxgx7jxy2cm")
// @Success 200 {object} GetObjectResponse
// @Failure      500  {object} FailedResponse
// @Router /object/get [post]
func (ns *NebulaServer) GetObject(c *gin.Context) {
	var body GetObject
	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, FailedResponse{
			Error: err.Error(),
		})
		return
	}

	m := ns.Config.Binding

	ctx := context.Background()

	object, err := m.GetObject(ctx, body.SchemaDid, body.ObjectCid)
	if err != nil {
		fmt.Printf("GetObject failed %v\n", err)
		c.JSON(http.StatusInternalServerError, FailedResponse{
			Error: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, object)
}
