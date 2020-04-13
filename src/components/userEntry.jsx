import React, { useState } from 'react';
import StyledH1 from './emotion/styledH1';
import StyledP from './emotion/styledP';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

function UserEntry(props) {
  const numPlayers = 2;
  const [sharedGames, setSharedGames] = useState([]);
  let initState = [];
  let inputs = [];
  for (let i = 0; i < numPlayers; i++) {
    initState.push('');
    inputs.push(
      <StyledInput
        key={i}
        id={i}
        onChange={handleChange}
        placeholder="SteamID"
        type="number"
        maxLength="17"
        required
      />
    );
  }
  const [steamIds, setSteamIds] = useState(initState);
  async function getSharedGames() {
    const response = await fetch(
      `/api/shared/games?steamids=${steamIds.join(',')}`
    );
    const games = await response.json();
    setSharedGames(games);
  }
  function handleChange(e) {
    const newSteamIds = [...steamIds];
    newSteamIds[e.target.id] = e.target.value;
    setSteamIds(newSteamIds);
  }
  return (
    <StyledContainer>
      <StyledH1>MultiPlayDate</StyledH1>
      <form>
        {inputs}
        <StyledButton onClick={getSharedGames} type="button">
          Play
        </StyledButton>
      </form>
      {sharedGames.length === 0 ? null : (
        <StyledP>
          You have <strong>{sharedGames.length}</strong> Steam Games in common:
          {' ' + sharedGames.map(game => game.name).join(', ')}.
        </StyledP>
      )}
    </StyledContainer>
  );
}

export default UserEntry;
