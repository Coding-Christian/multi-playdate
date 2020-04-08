import React from 'react';
import StyledH1 from './styledH1';
import StyledButton from './styledButton';
import StyledInput from './styledInput';
import StyledContainer from './styledContainer';

function UserEntry(props) {
  // const [steamId, setSteamId] = useState('');
  return (
    <StyledContainer>
      <StyledH1>MultiPlayDate</StyledH1>
      <div>
        <StyledInput
          placeholder="SteamID"
          type="number"
          maxLength="17"
          required
        />
        <StyledButton type="button">Play</StyledButton>
      </div>
    </StyledContainer>
  );
}

export default UserEntry;
