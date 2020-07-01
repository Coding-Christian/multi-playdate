import React, { useState } from 'react';
import { keyframes } from '@emotion/core';
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
  function handleGetFriends() {
    getFriends(userId);
  }
  function handleSubmit() {
    setUserId('');
    getSharedGames();
  }
  return (
    <EntryContainer>
      <p>Enter your SteamID64 to find your friends:</p>
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
            <>
              <StyledButton
                onClick={handleGetFriends}
                type="button"
                disabled={/^\d{17}$/.test(userId) ? '' : 'disabled'}
              >
                Find Friends
              </StyledButton>
              <StyledButton
                onClick={handleSubmit}
                type="button"
                disabled={!canGetGames ? 'disabled' : ''}
              >
                Compare Games
              </StyledButton>
            </>
          )}
        </SpacedDiv>
      </form>
      <p>
        Find out your SteamID64{' '}
        <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer">
          HERE
        </a>
        .
      </p>
    </EntryContainer>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const EntryContainer = styled(StyledCard)`
  max-width: 576px;
  animation: ${fadeIn} ease-in-out 2s;
`;

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
