import React, { useState } from 'react';
import styled from '@emotion/styled';
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
  function reset() {
    setView('initial');
    setSharedGames([]);
    setFriends([]);
  }
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
      <UserEntry
        reset={reset}
        getFriends={getFriends}
        getSharedGames={getSharedGames}
        isLoading={isLoading}
        canGetGames={selectedIds.length > 1}
      />
      {viewElement}
    </StyledAppArea>
  );
}

const StyledAppArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
  font-family: "Raleway", sans-serif;
  text-align: center;
  background-image: url("img/peripherals.png");
  margin: auto;
  & button:disabled {
    cursor: not-allowed;
  }
  @media (min-width: 926px) {
    width: 916px;
    text-align: left;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-image: linear-gradient(
      to bottom right,
      #b827fc 0%,
      #2c90fc 25%,
      #b8fd33 50%,
      #fec837 75%,
      #fd1892 100%
    );
    border-image-slice: 1;
  }
  @media (min-width: 1366px) {
    width: 70%;
  }
`;

export default App;
