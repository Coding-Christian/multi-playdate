import React from 'react';
import styled from '@emotion/styled';
import GameCard from './gameCard';

function GameList({ sharedGames }) {
  return (
    <>
      <StyledH2>You have {sharedGames.length} games in common!</StyledH2>
      {sharedGames.length > 0 ? (
        <GamesContainer>
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
        </GamesContainer>
      ) : null}
    </>
  );
}

const GamesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  width: 90%;
  padding: 10px;
  margin: 10px;
`;

const StyledH2 = styled.h2`
  color: #f5f5f5;
  margin: 30px 10px 10px 10px;
`;

export default GameList;
