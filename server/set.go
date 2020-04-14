package main

type Set struct{ m map[int]bool }

func NewSet() *Set {
	s := &Set{}
	s.m = make(map[int]bool)
	return s
}

type Unioner interface {
	Union(otherSet map[int]bool)
}

func (s *Set) Union(otherSet Set) {
	for key := range s.m {
		if _, ok := otherSet.m[key]; !ok {
			delete(s.m, key)
		}
	}
}
