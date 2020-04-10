package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	// "./models/steamGameList"

	"github.com/gorilla/mux"
)

type server struct{}

func getGamesForPlayer(ID string) ([]Game, error) {
	steamAllGamesURL := fmt.Sprintf("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=%s&steamid=%s&format=json", apiKey, ID)
	resp, err := http.Get(steamAllGamesURL)
	if err != nil {
		return nil, errors.New("Error with Request")
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("Error reading body Request")
	}
	steamgames, err := UnmarshalSteamGameListResponse(body)
	if err != nil {
		return nil, errors.New("Error parsing Request")
	}

	return steamgames.GameList.Games, nil
}

func getDetailsForGame(appID int) (*GameInfo, error) {
	steamGameInfoURL := fmt.Sprintf("https://store.steampowered.com/api/appdetails?appids=%d", appID)
	fmt.Println(steamGameInfoURL)
	resp, err := http.Get(steamGameInfoURL)
	if err != nil {
		fmt.Println(err)

		return nil, errors.New("Error with Request")
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("Error reading body Request")
	}
	gameInfo, err := UnmarshalSteamGameInfoResponse(body)
	if err != nil {
		return nil, errors.New("Error parsing Request")
	}
	var response GameInfo
	for _, v := range gameInfo {
		response = v.GameInfo
	}
	return &response, nil
}

func convertGameSliceToSet(games []Game) Set {
	gameSet := NewSet()
	for _, elem := range games {
		gameSet.m[elem.Appid] = true
	}
	return *gameSet
}

func filterByMultiplayer(games []GameInfo) []GameInfo {
	acceptableTypes := map[string]bool{"Multi-player": true, "Co-op": true, "Local Multi-Player": true, "Local Co-op": true, "MMO": true}
	filteredGames := make([]GameInfo, 0, len(games))
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

func findCommonGames(allGames [][]Game) []int {
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

func getDetailsForGames(appIDs []int) ([]GameInfo, error) {
	allGameInfo := make([]GameInfo, 0, len(appIDs))
	for i := range appIDs {
		gameInfo, err := getDetailsForGame(appIDs[i])
		if err != nil {
			fmt.Println("error with %d : %s", appIDs[i], err)
			continue
		}
		allGameInfo = append(allGameInfo, *gameInfo)
	}
	return allGameInfo, nil
}

func getGamesForAllPlayers(IDs []string) ([]GameInfo, error) {
	allGames := make([][]Game, len(IDs))

	for i, ID := range IDs {
		games, err := getGamesForPlayer(ID)
		if err != nil {
			return nil, err
		}
		allGames[i] = games
	}
	sharedGames := findCommonGames(allGames)

	gameInfo, err := getDetailsForGames(sharedGames)
	if err != nil {
		return nil, errors.New("Error parsing Request")
	}
	return gameInfo, nil
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
		log.Fatalln(err)
	}
	multiplayerGames := filterByMultiplayer(allGames)

	bytes, _ := json.Marshal(multiplayerGames)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(bytes))
}

const apiKey = ""

func main() {
	router := mux.NewRouter()

	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/shared/games", getSharedGames).Methods(http.MethodGet)
	log.Fatal(http.ListenAndServe(":8000", router))
}
