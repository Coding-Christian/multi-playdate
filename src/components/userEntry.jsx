import React, { useState } from 'react';
import StyledH1 from './emotion/styledH1';
import StyledSpan from './emotion/styledSpan';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

function UserEntry({ getSharedGames }) {
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
        <div>
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
      </div>
      <form>
        {inputs}
        <div>
          <StyledButton onClick={() => getSharedGames(steamIds)} type="button">
            Get Shared Games
          </StyledButton>
          <StyledButton onClick={clearSteamIds} type="button">
            Clear
          </StyledButton>
        </div>
      </form>
    </StyledContainer>
  );
}

export default UserEntry;
