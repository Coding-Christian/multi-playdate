import React, { useState } from 'react';
import styled from '@emotion/styled';
import StyledContainer from './emotion/styledContainer';
import UserEntry from './userEntry';
import DetailCard from './detailCard';

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
  const [sharedGames, setSharedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getSharedGames(steamIds) {
    setIsLoading(true);
    const response = await fetch(
      `/api/shared/games?steamids=${steamIds.join(',')}`
    );
    const games = await response.json();
    setIsLoading(false);
    setSharedGames(games);
  }
  return (
    <StyledAppArea>
      <UserEntry
        getSharedGames={getSharedGames}
        maxPlayers={6}
        isLoading={isLoading}
      />
      {sharedGames.length ? (
        <StyledContainer>
          <StyledH1>You have {sharedGames.length} games in common!</StyledH1>
          {sharedGames.map(game => (
            <DetailCard
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
