package routes

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"server/set"
	"server/steam"
	"strconv"
	"strings"
	"sync"
)

var gameCache map[string]steam.GameInfo

func SetCache(cache *map[string]steam.GameInfo) {
	gameCache = *cache
}

func GetSharedGames(w http.ResponseWriter, r *http.Request) {
	steamIDsParameter, ok := r.URL.Query()["steamids"]
	if !ok {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("steamids query parameter missing or malformed"))
		return
	}

	steamIDsParsed := strings.Split(steamIDsParameter[0], ",")
	if len(steamIDsParsed) < 2 {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("steamids must contain 2 or more integers seperated by commas"))
		return
	}

	w.Header().Set("Content-Type", "application/json")

	allGames, err := getGamesForAllPlayers(steamIDsParsed)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error Getting Games: " + err.Error()))
		log.Println(err)
		return
	}
	multiplayer := filterByMultiplayer(allGames)

	bytes, _ := json.Marshal(multiplayer)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(bytes))
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

func findCommonGames(allGames [][]steam.Game) []int {
	primarySet := set.ConvertGameSliceToSet(allGames[0])
	for _, gameSlice := range allGames[1:] {
		primarySet.Union(set.ConvertGameSliceToSet(gameSlice))
	}
	return primarySet.ConvertToIntSlice()
}

func getDetailsForGames(appIDs []int) ([]steam.GameInfo, error) {
	games := make([]steam.GameInfo, len(appIDs))

	var wg sync.WaitGroup
	wg.Add(len(appIDs))
	for i, appID := range appIDs {
		i := i
		go func(appID int, games []steam.GameInfo) error {
			defer wg.Done()

			if game, ok := gameCache[strconv.Itoa(appID)]; ok {
				games[i] = game
				return nil
			}

			game, err := steam.GetDetailsForGame(appID)
			if err != nil {
				return err
			}
			games[i] = *game
			return nil
		}(appID, games)
	}
	wg.Wait()
	return games, nil
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
