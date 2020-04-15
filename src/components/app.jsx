import React, { useState } from 'react';
import StyledAppArea from './emotion/styledAppArea';
import StyledContainer from './emotion/styledContainer';
import StyledH1 from './emotion/styledH1';
import StyledP from './emotion/styledP';
import UserEntry from './userEntry';

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
          <StyledP>{sharedGames.map(game => game.name).join(', ')}</StyledP>
        </StyledContainer>
      ) : null}
    </StyledAppArea>
  );
}

export default App;
