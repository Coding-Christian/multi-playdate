import React, { useState } from 'react';
import StyledH1 from './emotion/styledH1';
import StyledP from './emotion/styledP';
import StyledSpan from './emotion/styledSpan';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

function UserEntry(props) {
  const [sharedGames, setSharedGames] = useState([]);
  const [steamIds, setSteamIds] = useState(['', '']);
  let inputs = [];
  for (let i = 0; i < steamIds.length; i++) {
    inputs.push(
      <StyledInput
        key={i}
        id={i}
        onChange={handleChange}
        placeholder="SteamID"
        type="number"
        maxLength="17"
        value={steamIds[i]}
        required
      />
    );
  }
  async function getSharedGames() {
    const response = await fetch(
      `/api/shared/games?steamids=${steamIds.join(',')}`
    );
    const games = await response.json();
    setSharedGames(games);
  }
  function clearSteamIds() {
    let newSteamIds = steamIds.map(steamId => '');
    setSteamIds(newSteamIds);
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
            steamIds.length < 8
              ? setSteamIds(steamIds => [...steamIds, ''])
              : null
          }
          type="button"
        >
          Add
        </StyledButton>
        <StyledButton
          onClick={() =>
            steamIds.length > 2
              ? setSteamIds(steamIds => steamIds.slice(0, -1))
              : null
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
          <StyledButton onClick={clearSteamIds} type="button">
            Clear
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
