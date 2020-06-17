package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"server/steam"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type server struct{}

func convertGameSliceToSet(games []steam.Game) Set {
	gameSet := NewSet()
	for _, elem := range games {
		gameSet.m[elem.Appid] = true
	}
	return *gameSet
}

func findCommonGames(allGames [][]steam.Game) []int {
	primarySet := convertGameSliceToSet(allGames[0])
	for _, gameSlice := range allGames[1:] {
		primarySet.Union(convertGameSliceToSet(gameSlice))
	}
	sharedGames := make([]int, 0, len(primarySet.m))
	for k := range primarySet.m {
		sharedGames = append(sharedGames, k)
	}
	return sharedGames
}

func getGamesForAllPlayers(IDs []string) ([]int, error) {
	allGames := make([][]steam.Game, len(IDs))

	for i, ID := range IDs {
		games, err := steam.GetGamesForPlayer(ID)
		if err != nil {
			return nil, err
		}
		allGames[i] = games
	}
	sharedGames := findCommonGames(allGames)

	return sharedGames, nil
}

func getSharedGames(w http.ResponseWriter, r *http.Request) {
	steamIDsParameter, ok := r.URL.Query()["steamids"]
	if !ok {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("steamids query parameter missing or malformed"))
		return
	}

	steamIDsParsed := strings.Split(steamIDsParameter[0], ",")
	if len(steamIDsParsed) < 2 {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("steamids query parameter missing or malformed"))
		return
	}

	w.Header().Set("Content-Type", "application/json")

	allGames, err := getGamesForAllPlayers(steamIDsParsed)
	if err != nil {
		log.Println(err)
	}

	bytes, _ := json.Marshal(allGames)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(bytes))
}

func getUserFriends(w http.ResponseWriter, r *http.Request) {
	userIDParameter, ok := r.URL.Query()["userid"]
	if !ok {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("userid query parameter missing or malformed"))
		return
	}
	userID := userIDParameter[0]
	if userID == "" {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("userid query parameter missing or malformed"))
		return
	}
	friends, err := steam.GetFriendsForPlayer(userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error getting friends"))
		return
	}
	json, err := json.Marshal(friends)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(json))
}

func main() {
	router := mux.NewRouter()

	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/shared/games", getSharedGames).Methods(http.MethodGet)
	api.HandleFunc("/friends/", getUserFriends).Methods(http.MethodGet)
	log.Fatal(http.ListenAndServe(":8000", handlers.RecoveryHandler(handlers.PrintRecoveryStack(true))(router)))
}
