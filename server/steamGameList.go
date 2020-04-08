// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse and unparse this JSON data, add this code to your project and do:
//
//    steamGameListResponse, err := UnmarshalSteamGameListResponse(bytes)
//    bytes, err = steamGameListResponse.Marshal()

package main

import (
	"encoding/json"
	"fmt"
)

func UnmarshalSteamGameListResponse(data []byte) (SteamGameListResponse, error) {
	var r SteamGameListResponse
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *SteamGameListResponse) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type SteamGameListResponse struct {
	GameList GameList `json:"response"`
}

type GameList struct {
	GameCount int    `json:"game_count"`
	Games     []Game `json:"games"`
}

type Game struct {
	Appid           int  `json:"appid"`
	PlaytimeForever int  `json:"playtime_forever"`
	Playtime2Weeks  *int `json:"playtime_2weeks,omitempty"`
}

func UnmarshalSteamGameInfoResponse(data []byte) (SteamGameInfoResponse, error) {
	var r SteamGameInfoResponse
	err := json.Unmarshal(data, &r)
	if err != nil {
		fmt.Println(err)

	}
	return r, err
}

func (r *SteamGameInfoResponse) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type SteamGameInfoResponse map[string]Response

type Response struct {
	Success  bool     `json:"success"`
	GameInfo GameInfo `json:"data"`
}

type GameInfo struct {
	Type             *string      `json:"type,omitempty"`
	Name             *string      `json:"name,omitempty"`
	SteamAppid       *int64       `json:"steam_appid,omitempty"`
	IsFree           *bool        `json:"is_free,omitempty"`
	ShortDescription *string      `json:"short_description,omitempty"`
	HeaderImage      *string      `json:"header_image,omitempty"`
	Metacritic       *Metacritic  `json:"metacritic,omitempty"`
	Categories       []Category   `json:"categories"`
	Genres           []Genre      `json:"genres"`
	Screenshots      []Screenshot `json:"screenshots"`
	Background       *string      `json:"background,omitempty"`
}

type Category struct {
	ID          *int64  `json:"id,omitempty"`
	Description *string `json:"description,omitempty"`
}

type Genre struct {
	ID          *string `json:"id,omitempty"`
	Description *string `json:"description,omitempty"`
}

type Metacritic struct {
	Score *int64  `json:"score,omitempty"`
	URL   *string `json:"url,omitempty"`
}

type Screenshot struct {
	ID            *int64  `json:"id,omitempty"`
	PathThumbnail *string `json:"path_thumbnail,omitempty"`
	PathFull      *string `json:"path_full,omitempty"`
}
