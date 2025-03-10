module github.com/sonr-io/speedway

go 1.16

replace (
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	github.com/google/certificate-transparency-go => github.com/google/certificate-transparency-go v1.1.0
	github.com/ipfs/go-ipfs-blockstore => github.com/ipfs/go-ipfs-blockstore v1.1.2
	github.com/keybase/go-keychain => github.com/99designs/go-keychain v0.0.0-20191008050251-8e49817e8af4
	google.golang.org/grpc => google.golang.org/grpc v1.29.1
)

require (
	github.com/Songmu/prompter v0.5.1
	github.com/denisbrodbeck/machineid v1.0.1
	github.com/duo-labs/webauthn v0.0.0-20220330035159-03696f3d4499
	github.com/duo-labs/webauthn.io v0.0.0-20200929144140-c031a3e0f95d
	github.com/gin-gonic/contrib v0.0.0-20201101042839-6a891bf89f19
	github.com/gin-gonic/gin v1.8.1
	github.com/kataras/golog v0.1.7
	github.com/pkg/browser v0.0.0-20180916011732-0a3d74bf9ce4
	github.com/shengdoushi/base58 v1.0.0
	github.com/sonr-io/sonr v0.5.3
	github.com/spf13/cobra v1.4.0
	github.com/stretchr/testify v1.8.0 // indirect
	github.com/swaggo/files v0.0.0-20220610200504-28940afbdbfe
	github.com/swaggo/gin-swagger v1.5.0
	github.com/swaggo/swag v1.8.1
	github.com/ttacon/chalk v0.0.0-20160626202418-22c06c80ed31
	github.com/withfig/autocomplete-tools/integrations/cobra v1.2.1
	google.golang.org/grpc v1.48.0
)
