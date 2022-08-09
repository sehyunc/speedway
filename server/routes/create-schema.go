package nebula

import (
	"encoding/json"
	"fmt"

	"github.com/gin-gonic/gin"
	mtr "github.com/sonr-io/sonr/pkg/motor"
	"github.com/sonr-io/speedway/pkg/hwid"
	"github.com/ttacon/chalk"
	rtmv1 "go.buf.build/grpc/go/sonr-io/motor/api/v1"
)

// create a struct to hold the command line flags for the command
type CreateSchemaRequest struct {
	Did          string `json:"did"`
	SchemaLabel  string `json:"label"`
	SchemaFields string `json:"fields"`
}

func (ns *NebulaServer) CreateSchema(c *gin.Context) {
	rBody := c.Request.Body
	var r CreateSchemaRequest
	err := json.NewDecoder(rBody).Decode(&r)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	// take SchemaFields and convert it to map[string]CreateSchemaRequest_SchemaKind
	var fields map[string]rtmv1.CreateSchemaRequest_SchemaKind = make(map[string]rtmv1.CreateSchemaRequest_SchemaKind)

	hwid, err := hwid.GetHwid()
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Could not get hardware id",
		})
		return
	}
	m := mtr.EmptyMotor(hwid)
	// TODO: Call login from registry service
	aesKey, err := loadKey("AES.key")
	if err != nil {
		fmt.Println("err", err)
	}
	aesPskKey, err := loadKey("PSK.key")
	if err != nil {
		fmt.Println("err", err)
	}
	// * Create a new login & create schema request
	// Create a new login request
	loginRequest := (rtmv1.LoginRequest{
		Did:       r.Did,
		AesDscKey: aesKey,
		AesPskKey: aesPskKey,
	})
	loginResponse, err := m.Login(loginRequest)
	// if login fails, return error
	if loginResponse.Success {
		fmt.Println(chalk.Green, "Login successful")
	} else {
		fmt.Println(chalk.Red, "Login failed")
		c.JSON(500, gin.H{
			"error": "Login failed",
		})
		return
	}
	fmt.Println("loginResponse", loginResponse)
	// Create a new create schema request
	createSchemaRequest := (rtmv1.CreateSchemaRequest{
		Label:  r.SchemaLabel,
		Fields: fields,
	})

	fmt.Println("createSchemaRequest", createSchemaRequest)
	// Create a new motor client and login

	// create the schema
	res, err := m.CreateSchema(createSchemaRequest)
	if err != nil {
		fmt.Println("Create Schema Error: ", err)
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"schema": res,
	})
}
