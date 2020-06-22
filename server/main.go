package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"

	"server/steam"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type server struct{}

var cache map[string]steam.GameInfo

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

func filterByMultiplayer(games []steam.GameInfo) []steam.GameInfo {
	acceptableTypes := map[string]bool{"Multi-player": true, "Co-op": true, "Local Multi-Player": true, "Local Co-op": true, "MMO": true}
	filteredGames := make([]steam.GameInfo, 0, len(games))
	for i := range games {
		types := games[i].Categories
		for _, elem := range types {
			if _, ok := acceptableTypes[*elem.Description]; ok {
				filteredGames = append(filteredGames, games[i])
				break
			}
		}
	}
	return filteredGames
}

func getDetailsForGames(appIDs []int) ([]steam.GameInfo, error) {
	allGameInfo := make([]steam.GameInfo, len(appIDs))

	var wg sync.WaitGroup
	wg.Add(len(appIDs))
	for i, appID := range appIDs {
		i := i
		go func(appID int, allGameInfo []steam.GameInfo) error {
			defer wg.Done()

			if gameInfo, ok := cache[strconv.Itoa(appID)]; ok {
				allGameInfo[i] = gameInfo
				return nil
			}

			gameInfo, err := steam.GetDetailsForGame(appID)
			if err != nil {
				return err
			}
			allGameInfo[i] = *gameInfo
			return nil
		}(appID, allGameInfo)
	}
	wg.Wait()
	return allGameInfo, nil
}

func getGamesForAllPlayers(IDs []string) ([]steam.GameInfo, error) {
	allGames := make([][]steam.Game, len(IDs))

	for i, ID := range IDs {
		games, err := steam.GetGamesForPlayer(ID)
		if err != nil {
			return nil, err
		}
		allGames[i] = games
	}
	sharedGames := findCommonGames(allGames)
	games, err := getDetailsForGames(sharedGames)
	if err != nil {
		return nil, errors.New("Error getting games")
	}

	return games, nil
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
	multiplayer := filterByMultiplayer(allGames)

	bytes, _ := json.Marshal(multiplayer)

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
	fmt.Println("preparing cache")

	f, err := os.Open("./gameInfogit .json")
	if err != nil {
		log.Println(err)
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		log.Println(err)
	}
	err = json.Unmarshal(b, &cache)
	if err != nil {
		log.Println(err)
	}

	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/shared/games", getSharedGames).Methods(http.MethodGet)
	api.HandleFunc("/friends/", getUserFriends).Methods(http.MethodGet)
	log.Fatal(http.ListenAndServe(":8000", handlers.RecoveryHandler(handlers.PrintRecoveryStack(true))(router)))
}
