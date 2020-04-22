package main

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
