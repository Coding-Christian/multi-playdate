package set

import "server/steam"

//Set is a simple set implimentation
type Set struct{ m map[int]bool }

//NewSet Returns an empty *set
func NewSet() *Set {
	s := &Set{}
	s.m = make(map[int]bool)
	return s
}

//Union removes keys from set s that are not in otherset
func (s *Set) Union(otherSet Set) {
	for key := range s.m {
		if _, ok := otherSet.m[key]; !ok {
			delete(s.m, key)
		}
	}
}

func (s *Set) ConvertToIntSlice() []int {
	keys := make([]int, 0, len(s.m))
	for k := range s.m {
		keys = append(keys, k)
	}
	return keys
}

func ConvertGameSliceToSet(games []steam.Game) Set {
	gameSet := NewSet()
	for _, elem := range games {
		gameSet.m[elem.Appid] = true
	}
	return *gameSet
}
