import React from 'react';
import StyledH1 from './emotion/styledH1';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

function UserEntry(props) {
  const numPlayers = 2;
  // const [steamIds, setSteamIds] = useState([]);
  let inputs = [];
  for (let i = 0; i < numPlayers; i++) {
    inputs.push(
      <StyledInput
        key={i}
        placeholder="SteamID"
        type="number"
        maxLength="17"
        required
      />
    );
  }
  // function getSharedGames() {}
  // function handleChange(e) {}
  return (
    <StyledContainer>
      <StyledH1>MultiPlayDate</StyledH1>
      <form>
        {inputs}
        <StyledButton type="button">Play</StyledButton>
      </form>
    </StyledContainer>
  );
}

export default UserEntry;
