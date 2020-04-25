import React from 'react';
import styled from '@emotion/styled';
import StyledContainer from './emotion/styledContainer';
import GameCard from './gameCard';

function GameList({ sharedGames }) {
  return (
    <StyledContainer>
      <StyledH2>You have {sharedGames.length} games in common!</StyledH2>
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
  );
}

const StyledH2 = styled.h2`
  margin: 10px;
`;

export default GameList;
