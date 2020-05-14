import React, { useState } from 'react';
import styled from '@emotion/styled';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledCard from './emotion/styledCard';
import Loader from './loader';

function UserEntry({ getFriends, getSharedGames, isLoading, canGetGames }) {
  const [userId, setUserId] = useState('');
  function resetForm() {
    setUserId('');
  }
  function handleChange(e) {
    if (/^\d{0,17}$/.test(e.target.value)) {
      setUserId(e.target.value);
    }
  }
  function handleSubmit() {
    setUserId('');
    getSharedGames();
  }
  return (
    <StyledCard>
      <p>Enter your SteamID to find your friends:</p>
      <form>
        <SpacedDiv>
          <StyledInput
            onChange={handleChange}
            placeholder="SteamID"
            type="text"
            maxLength="17"
            value={userId}
            disabled={isLoading ? 'disabled' : ''}
            required
          />
          <StyledButton
            onClick={resetForm}
            type="button"
            disabled={isLoading ? 'disabled' : ''}
          >
            Clear
          </StyledButton>
        </SpacedDiv>
        <SpacedDiv>
          {isLoading ? (
            <Loader />
          ) : (
            <StyledButton onClick={() => getFriends(userId)} type="button">
              Find Friends
            </StyledButton>
          )}
          <StyledButton
            onClick={() => handleSubmit()}
            type="button"
            disabled={isLoading || !canGetGames ? 'disabled' : ''}
          >
            Compare Games
          </StyledButton>
        </SpacedDiv>
      </form>
    </StyledCard>
  );
}

const SpacedDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  & > * {
    @media (max-width: 372px) {
      width: 90%;
    }
  }
`;

export default UserEntry;
