package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"server/steam"
)

func GetFriends(w http.ResponseWriter, r *http.Request) {
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
		w.Write([]byte("Error Getting Friends" + err.Error()))
		log.Println(err)
		return
	}
	json, err := json.Marshal(friends)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(json))
}
