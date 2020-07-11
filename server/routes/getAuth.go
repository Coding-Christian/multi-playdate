package routes

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/yohcop/openid-go"
)

type authResponse struct {
	Url string `json:"url"`
}

func AuthHandler(w http.ResponseWriter, r *http.Request) {
	domain := r.Host
	url, err := openid.RedirectURL(
		"http://steamcommunity.com/openid",
		"http://"+domain+"/",
		"http://"+domain+"/")
	if err != nil {
		log.Printf("Error creating redirect URL: %q\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Could not start openId Auth process"))
		return
	}
	b, err := json.Marshal(authResponse{Url: url})
	if err != nil {
		log.Printf("Error marshaling response: %q\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Could not marshal to json"))
		return
	}
	w.Write([]byte(b))

}
