import React, { useState } from 'react';
import StyledH1 from './emotion/styledH1';
import StyledP from './emotion/styledP';
import StyledSpan from './emotion/styledSpan';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

function UserEntry(props) {
  const [numPlayers, setNumPlayers] = useState(2);
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
      <div>
        <StyledSpan>Add or Remove Players:</StyledSpan>
        <StyledButton
          onClick={() =>
            numPlayers < 8 ? setNumPlayers(num => num + 1) : null
          }
          type="button"
        >
          Add
        </StyledButton>
        <StyledButton
          onClick={() =>
            numPlayers > 2 ? setNumPlayers(num => num - 1) : null
          }
          type="button"
        >
          Remove
        </StyledButton>
      </div>
      <form>
        {inputs}
        <div>
          <StyledButton onClick={getSharedGames} type="button">
            Get Shared Games
          </StyledButton>
        </div>
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
