package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"server/steam"
	"time"
)

func readAppIds() ([]int, error) {
	f, err := os.Open("./games.json")
	if err != nil {
		return nil, err
	}
	defer f.Close()
	b, err := ioutil.ReadAll(f)
	if err != nil {
		return nil, err
	}
	var ids []int
	err = json.Unmarshal(b, &ids)
	if err != nil {
		return nil, err
	}
	return ids, nil
}

func main() {
	ids, err := readAppIds()
	if err != nil {
		fmt.Println("Error parsing file", err)
		return
	}

	w, err := os.Create("gameInfo.txt")
	defer w.Close()
	writer := bufio.NewWriter(w)
	defer writer.Flush()
	// fmt.Println(ids)
	timer := time.NewTicker(time.Second * 2)
	count := 0

	idChan := make(chan int)

	go func(c chan int, ids []int) {
		for _, id := range ids {
			c <- id
		}
		close(c)
	}(idChan, ids)

	for {
		select {
		case id := <-idChan:
			fmt.Print("processing id: ", id, " count: ", count, "\r")
			count++
			g, err := steam.GetDetailsForGame(id)
			if err != nil {
				fmt.Println("Error getting game for id: ", id, err)
				return
			}
			b, err := json.Marshal(g)
			if err != nil {
				fmt.Println("Error jsoning game for id: ", id)
				return
			}
			_, err = writer.Write(b)
			if err != nil {
				fmt.Println("Error writing game for id: ", id)
				return
			}
			_, err = writer.WriteRune('\n')
			if err != nil {
				fmt.Println("Error writing game for id: ", id)
				return
			}
			<-timer.C
		}
	}
}
