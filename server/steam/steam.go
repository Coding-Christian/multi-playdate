package steam

import (
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

//GetGamesForPlayer takes a steamid and returns an array of the games they own
func GetGamesForPlayer(ID string) ([]Game, error) {
	var apiKey = os.Getenv("STEAM_API_KEY")
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
	steamgames, err := unmarshalSteamGameListResponse(body)
	if err != nil {
		return nil, errors.New("Error parsing Request for getgames")
	}

	return steamgames.GameList.Games, nil
}

//GetUserInfo takes a string of comma seperated steamids and returns their userinfo like name
func GetUserInfo(IDs string) ([]Player, error) {
	var apiKey = os.Getenv("STEAM_API_KEY")
	steamFriends := fmt.Sprintf("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=%s&steamids=%s", apiKey, IDs)
	resp, err := http.Get(steamFriends)
	if err != nil {
		return nil, errors.New("Error with Request")
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("Error reading body Request")
	}

	players, err := unmarshalUserInfo(body)
	if err != nil {
		return nil, errors.New("Error coverting to json")
	}
	return players.UserResponse.Players, nil
}

//GetFriendsForPlayer takes a steam id and returns all their friends info
func GetFriendsForPlayer(ID string) ([]Player, error) {
	var apiKey = os.Getenv("STEAM_API_KEY")
	steamFriends := fmt.Sprintf("http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=%s&steamid=%s&relationship=friend", apiKey, ID)
	resp, err := http.Get(steamFriends)
	if err != nil {
		return nil, errors.New("Error with Request")
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("Error reading body Request")
	}
	friends, err := unmarshalSteamFriends(body)
	if err != nil {
		return nil, errors.New("Error parsing Request")
	}
	friendIDs := make([]string, len(friends.Friendslist.Friends))
	for i, f := range friends.Friendslist.Friends {
		friendIDs[i] = *f.Steamid
	}

	players, err := GetUserInfo(strings.Join(friendIDs, ","))
	if err != nil {
		return nil, err
	}

	return players, nil
}

//GetDetailsForGame takes a game id and returns the info steam has on that game
func GetDetailsForGame(appID int) (*GameInfo, error) {
	steamGameInfoURL := fmt.Sprintf("https://store.steampowered.com/api/appdetails?appids=%d", appID)
	resp, err := http.Get(steamGameInfoURL)
	if err != nil {
		return nil, errors.New("Error with Request")
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, errors.New("Error request did not send back a 200")
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("Error reading body Request")
	}
	gameInfo, err := unmarshalSteamGameInfoResponse(body)
	if err != nil {
		return nil, errors.New("Error parsing Request")
	}
	var response GameInfo
	for _, v := range gameInfo {
		response = v.GameInfo
	}
	return &response, nil
}
