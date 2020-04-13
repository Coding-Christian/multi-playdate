import React from 'react';
import StyledH1 from './emotion/styledH1';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

function UserEntry(props) {
  // const [steamId, setSteamId] = useState('');
  return (
    <StyledContainer>
      <StyledH1>MultiPlayDate</StyledH1>
      <form>
        <StyledInput
          placeholder="SteamID"
          type="number"
          maxLength="17"
          required
        />
        <StyledButton type="button">Play</StyledButton>
      </form>
    </StyledContainer>
  );
}

export default UserEntry;
