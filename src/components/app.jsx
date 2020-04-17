import React, { useState } from 'react';
import styled from '@emotion/styled';
import StyledAppArea from './emotion/styledAppArea';
import StyledContainer from './emotion/styledContainer';
import UserEntry from './userEntry';
import DetailCard from './detailCard';

const StyledH1 = styled.h1`
  margin: 10px;
`;

function App(props) {
  const [sharedGames, setSharedGames] = useState([]);
  async function getSharedGames(steamIds) {
    const response = await fetch(
      `/api/shared/games?steamids=${steamIds.join(',')}`
    );
    const games = await response.json();
    setSharedGames(games);
  }
  return (
    <StyledAppArea>
      <UserEntry getSharedGames={getSharedGames} />
      {sharedGames.length ? (
        <StyledContainer>
          <StyledH1>You have {sharedGames.length} games in common!</StyledH1>
          {sharedGames.map(game => (
            <DetailCard
              key={game.steam_appid}
              name={game.name}
              score={game.metacritic ? game.metacritic.score : undefined}
              genres={game.genres.map(genre => genre.description)}
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
