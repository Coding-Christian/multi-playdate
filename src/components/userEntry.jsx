import React from 'react';
// import styled from '@emotion/styled';
import StyledH1 from './styledH1';
import StyledButton from './styledButton';
import StyledInput from './styledInput';

function UserEntry(props) {
  // const [steamId, setSteamId] = useState('');
  return (
    <>
      <StyledH1>MultiPlayDate</StyledH1>
      <StyledInput type="number" maxLength="17" required />
      <StyledButton type="button">Play</StyledButton>
    </>
  );
}

export default UserEntry;
