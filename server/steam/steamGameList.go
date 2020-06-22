// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse and unparse this JSON data, add this code to your project and do:
//
//    steamGameListResponse, err := UnmarshalSteamGameListResponse(bytes)
//    bytes, err = steamGameListResponse.Marshal()

package steam

import (
	"encoding/json"
	"fmt"
)

func unmarshalSteamGameListResponse(data []byte) (steamGameListResponse, error) {
	var r steamGameListResponse
	err := json.Unmarshal(data, &r)
	return r, err
}

type steamGameListResponse struct {
	GameList gameList `json:"response"`
}

type gameList struct {
	GameCount int    `json:"game_count"`
	Games     []Game `json:"games"`
}

//Game is a data model for steam games
type Game struct {
	Appid           int  `json:"appid"`
	PlaytimeForever int  `json:"playtime_forever"`
	Playtime2Weeks  *int `json:"playtime_2weeks,omitempty"`
}

func unmarshalSteamGameInfoResponse(data []byte) (steamGameInfoResponse, error) {
	var r steamGameInfoResponse
	err := json.Unmarshal(data, &r)
	if err != nil {
		fmt.Println(err)

	}
	return r, err
}

type steamGameInfoResponse map[string]response

type response struct {
	Success  bool     `json:"success"`
	GameInfo GameInfo `json:"data"`
}

//GameInfo is a data model for steam game info
type GameInfo struct {
	HeaderImage      *string     `json:"header_image,omitempty"`
	SteamAppid       *int64      `json:"steam_appid,omitempty"`
	Metacritic       *metacritic `json:"metacritic,omitempty"`
	Genres           []genre     `json:"genres"`
	Name             *string     `json:"name,omitempty"`
	ShortDescription *string     `json:"short_description,omitempty"`
	Categories       []category  `json:"categories"`
}

type category struct {
	ID          *int64  `json:"id,omitempty"`
	Description *string `json:"description,omitempty"`
}

type genre struct {
	ID          *string `json:"id,omitempty"`
	Description *string `json:"description,omitempty"`
}

type metacritic struct {
	Score *int64  `json:"score,omitempty"`
	URL   *string `json:"url,omitempty"`
}

func unmarshalSteamFriends(data []byte) (steamFriends, error) {
	var r steamFriends
	err := json.Unmarshal(data, &r)
	return r, err
}

type steamFriends struct {
	Friendslist *friendslist `json:"friendslist,omitempty"`
}

type friendslist struct {
	Friends []Friend `json:"friends"`
}

//Friend is a data model for a steam friend
type Friend struct {
	Steamid      *string `json:"steamid,omitempty"`
	Relationship *string `json:"relationship,omitempty"`
	FriendSince  *int64  `json:"friend_since,omitempty"`
}

func unmarshalUserInfo(data []byte) (userInfo, error) {
	var r userInfo
	err := json.Unmarshal(data, &r)
	return r, err
}

type userInfo struct {
	UserResponse userResponse `json:"response"`
}

type userResponse struct {
	Players []Player `json:"players"`
}

//Player is a data model for steam players
type Player struct {
	Steamid      *string `json:"steamid,omitempty"`
	Realname     *string `json:"realname,omitempty"`
	Personaname  *string `json:"personaname,omitempty"`
	Avatarmedium *string `json:"avatarmedium,omitempty"`
	ProfileUrl   *string `json:"profileurl,omitempty"`
	Personastate *int64  `json:"personastate,omitempty"`
}
