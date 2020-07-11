package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"server/routes"
	"server/steam"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type server struct{}

var cache map[string]steam.GameInfo

func main() {
	router := mux.NewRouter()
	fmt.Println("preparing cache")

	f, err := os.Open("./gameInfo.json")
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		log.Println(err)
	}
	err = json.Unmarshal(b, &cache)
	if err != nil {
		log.Println(err)
	}
	routes.SetCache(&cache)

	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/shared/games", routes.GetSharedGames).Methods(http.MethodGet)
	api.HandleFunc("/game", routes.GetGameInfo).Methods(http.MethodGet)
	api.HandleFunc("/friends", routes.GetFriends).Methods(http.MethodGet)
	api.HandleFunc("/auth", routes.AuthHandler)

	log.Println("Listening on port 8000")
	log.Fatal(http.ListenAndServe(":8000", handlers.RecoveryHandler(handlers.PrintRecoveryStack(true))(router)))
}
