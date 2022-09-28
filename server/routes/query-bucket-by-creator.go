package routes

import (
	"net/http"

	rtmv1 "github.com/sonr-io/sonr/third_party/types/motor/api/v1"

	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1
// @Summary QueryBuckets
// @Schemes
// @Description Query the Sonr Blockchain for all public buckets by a specified creator.
// @Tags Proxy
// @Produce json
// @Param creator query string false "creator"
// @Param pagination query string false "pagination"
// @Success 200 {object} BucketResponse
// @Failure      500  {object} FailedResponse
// @Router /bucket/query [get]
func (ns *NebulaServer) QueryBucketByCreator(c *gin.Context) {
	var body rtmv1.QueryWhereIsByCreatorRequest
	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, FailedResponse{
			Error: err.Error(),
		})
		return
	}

	b := ns.Config.Binding
	res, err := b.Instance.QueryWhereIsByCreator(rtmv1.QueryWhereIsByCreatorRequest{
		Creator: body.Creator,
	})
	if err != nil {
		// TODO: Add proper error message
		c.JSON(http.StatusInternalServerError, FailedResponse{
			Error: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, res)
}
