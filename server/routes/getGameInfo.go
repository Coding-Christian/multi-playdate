package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"server/steam"
	"strconv"
)

func GetGameInfo(w http.ResponseWriter, r *http.Request) {
	appIDParameter, ok := r.URL.Query()["appid"]
	if !ok {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("appid query parameter missing or malformed"))
		return
	}
	appIDParsed, err := strconv.Atoi(appIDParameter[0])
	if err != nil {
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write([]byte("appid must contain a single integer"))
		return
	}

	allGameInfo, err := steam.GetAllDetailsForGame(appIDParsed)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error Getting Game: " + err.Error()))
		log.Println(err)
		return
	}
	bytes, _ := json.Marshal(allGameInfo)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(bytes))
}
