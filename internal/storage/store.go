package storage

import (
	"fmt"
	"os"

	"github.com/99designs/keyring"
	mtr "github.com/sonr-io/sonr/pkg/motor"
)

/*
The Store function stores the specified key in the keyring
*/
func Store(name string, data []byte) (keyring.Item, error) {
	ring, _ := keyring.Open(keyring.Config{
		ServiceName: "Sonr Speedway",
	})

	_ = ring.Set(keyring.Item{
		Key:  name,
		Data: data,
	})

	key, err := ring.Get(name)
	if err != nil {
		return key, err
	}
	if key.Data == nil {
		return key, fmt.Errorf("no data found")
	}

	return key, nil
}

/*
The StoreInfo function stores the specified key in the ~/.speedway/info directory
*/
func StoreInfo(name string, m mtr.MotorNode) error {
	homedir, err := os.UserHomeDir()
	if err != nil {
		return err
	}
	if _, err := os.Stat(homedir + "/.speedway/info/" + name); os.IsNotExist(err) {
		err := os.MkdirAll(homedir+"/.speedway/info/", 0700)
		if err != nil {
			return err
		}
	}

	file, err := os.Create(homedir + "/.speedway/info/" + name)
	if err != nil {
		return err
	}

	address := m.GetAddress()

	// write to the file with the address and did document in json format and close the file
	_, err = file.WriteString(address)
	if err != nil {
		return err
	}

	return err
}
