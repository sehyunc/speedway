package document

import (
	"context"
	"fmt"

	"github.com/Songmu/prompter"
	"github.com/kataras/golog"
	"github.com/sonr-io/sonr/pkg/did"
	mt "github.com/sonr-io/sonr/third_party/types/motor/api/v1"
	"github.com/sonr-io/sonr/x/schema/types"
	"github.com/sonr-io/speedway/internal/client"
	"github.com/sonr-io/speedway/internal/status"
	"github.com/sonr-io/speedway/internal/utils"
	"github.com/spf13/cobra"
)

func bootstrapBuildDocumentCommand(ctx context.Context, logger *golog.Logger) (buildDocCmd *cobra.Command) {
	buildDocCmd = &cobra.Command{
		Use:   "build [did]",
		Short: "Create a new Schema Document associated to a Schema",
		Long:  "Creates a new Schema Document associated to a given schema",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			did, err := did.ParseDID(args[0])
			if err != nil {
				logger.Errorf("Error while validating did: %s", err)
			}

			cli, err := client.New(ctx)
			if err != nil {
				logger.Fatalf(status.Error("RPC Client Error: "), err)
				return
			}

			session, err := cli.GetSessionInfo()
			if err != nil {
				logger.Fatalf(status.Error("SessionInfo Error: "), err)
				return
			}

			res, err := cli.GetSchema(mt.QueryWhatIsRequest{
				Creator: session.Info.Address,
				Did:     did.String(),
			})
			if err != nil {
				logger.Fatalf("Error while querying schema: ", err)
				return
			}

			var fields []*types.SchemaDocumentValue
			if file, err := cmd.Flags().GetString("file"); err == nil && file != "" {
				fields, err = utils.LoadDocumentFieldsFromDisk(file)
				if err != nil {
					logger.Fatalf("Error while loading document fields: %s", err)
					return
				}
			}

			var label string
			if label, err = cmd.Flags().GetString("label"); err == nil && label == "" {
				label = (&prompter.Prompter{
					Message: "Enter Schema Label",
				}).Prompt()
				if label == "" {
					logger.Fatalf("Label cannot be empty")
					return
				}
			}

			uploadRes, err := cli.CreateDocument(mt.UploadDocumentRequest{
				Creator:    session.Info.Address,
				Label:      label,
				Definition: res.Schema,
				Fields:     fields,
			})

			if err != nil {
				fmt.Printf("Error while uploading document: %s", err)
				return
			}

			logger.Print("🚀 Upload Successful")
			logger.Printf("|── Document CID: %s", uploadRes.Cid)
		},
	}
	buildDocCmd.PersistentFlags().String("label", "", "name to associate with the schema document")
	buildDocCmd.PersistentFlags().String("file", "", "File Path to  Document Fields")
	return
}
