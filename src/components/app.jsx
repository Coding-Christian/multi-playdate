import React, { useState } from 'react';
import styled from '@emotion/styled';
import StyledContainer from './emotion/styledContainer';
import StyledH1 from './emotion/styledH1';
import StyledP from './emotion/styledP';
import UserEntry from './userEntry';

function App(props) {
  const [sharedGames, setSharedGames] = useState([]);
  const AppArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 876px;
    margin: auto;
  `;
  async function getSharedGames(steamIds) {
    const response = await fetch(
      `/api/shared/games?steamids=${steamIds.join(',')}`
    );
    const games = await response.json();
    setSharedGames(games);
  }
  return (
    <AppArea>
      <UserEntry getSharedGames={getSharedGames} />
      {sharedGames.length ? (
        <StyledContainer>
          <StyledH1>You have {sharedGames.length} games in common!</StyledH1>
          <StyledP>{sharedGames.map(game => game.name).join(', ')}</StyledP>
        </StyledContainer>
      ) : null}
    </AppArea>
  );
}

export default App;
