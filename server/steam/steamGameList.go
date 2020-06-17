// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse and unparse this JSON data, add this code to your project and do:
//
//    steamGameListResponse, err := UnmarshalSteamGameListResponse(bytes)
//    bytes, err = steamGameListResponse.Marshal()

package steam

import (
	"encoding/json"
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
	Steamid     *string `json:"steamid,omitempty"`
	Realname    *string `json:"realname,omitempty"`
	Personaname *string `json:"personaname,omitempty"`
}
