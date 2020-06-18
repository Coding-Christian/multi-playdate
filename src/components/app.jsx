import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import Header from './header';
import UserEntry from './userEntry';
import FriendList from './friendList';
import GameList from './gameList';

function App() {
  const [view, setView] = useState('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sharedGames, setSharedGames] = useState([]);
  async function getFriends(steamId) {
    setIsLoading(true);
    setSelectedIds([steamId]);
    setView('friends');
    const response = await fetch(`/api/friends?steamid=${steamId}`);
    const users = await response.json();
    setIsLoading(false);
    setFriends(users);
  }
  async function getSharedGames() {
    if (selectedIds.length >= 2) {
      setIsLoading(true);
      setView('games');
      const response = await fetch(
        `/api/shared/games?steamids=${selectedIds.join(',')}`
      );
      const games = await response.json();
      setIsLoading(false);
      setSharedGames(games);
    }
  }
  // function reset() {
  //   setView('initial');
  //   setSharedGames([]);
  //   setFriends([]);
  // }
  let viewElement;
  if (view === 'games' && !isLoading) {
    viewElement = <GameList sharedGames={sharedGames} />;
  } else if (view === 'friends' && !isLoading) {
    viewElement = (
      <FriendList
        friends={friends}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    );
  }
  return (
    <StyledAppArea>
      <Header />
      <UserEntry
        getFriends={getFriends}
        getSharedGames={getSharedGames}
        isLoading={isLoading}
        canGetGames={selectedIds.length > 1}
      />
      {viewElement}
    </StyledAppArea>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledAppArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 640px;
  font-family: "Fira Mono", monospace;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  margin: auto;
  & > * {
    animation: ${fadeIn} ease 0.5s;
  }
  @media (min-width: 576px) {
    height: 100vh;
  }
`;

export default App;
