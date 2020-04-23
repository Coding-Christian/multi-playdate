import React, { useState } from 'react';
import styled from '@emotion/styled';
import StyledContainer from './emotion/styledContainer';
import UserEntry from './userEntry';
import GameCard from './gameCard';

const StyledH1 = styled.h1`
  text-align: center;
  margin: 10px;
`;

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

function App(props) {
  const [view, setView] = useState('initial');
  const [friends, setFriends] = useState([]);
  const [sharedGames, setSharedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getFriends(steamId) {
    setIsLoading(true);
    setView('friends');
    const response = await fetch(`/api/friends?steamid=${steamId}`);
    const users = await response.json();
    setIsLoading(false);
    setFriends(users);
  }
  async function getSharedGames(steamIds) {
    setIsLoading(true);
    setView('games');
    const response = await fetch(
      `/api/shared/games?steamids=${steamIds.join(',')}`
    );
    const games = await response.json();
    setIsLoading(false);
    setSharedGames(games);
  }
  function reset() {
    setView('initial');
    setSharedGames([]);
    setFriends([]);
  }
  return (
    <StyledAppArea>
      <UserEntry
        reset={reset}
        getFriends={getFriends}
        getSharedGames={getSharedGames}
        isLoading={isLoading}
        friends={view === 'friends' && !isLoading ? friends : []}
      />
      {view === 'games' && !isLoading ? (
        <StyledContainer>
          <StyledH1>You have {sharedGames.length} games in common!</StyledH1>
          {sharedGames.map(game => (
            <GameCard
              key={game.steam_appid}
              appId={game.steam_appid}
              name={game.name}
              score={game.metacritic ? game.metacritic.score : undefined}
              genres={
                game.genres ? game.genres.map(genre => genre.description) : []
              }
              description={game.short_description}
              background={game.header_image}
            />
          ))}
        </StyledContainer>
      ) : null}
    </StyledAppArea>
  );
}

export default App;
