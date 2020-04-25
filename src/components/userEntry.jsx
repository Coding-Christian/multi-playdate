import React, { useState } from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

function UserEntry({
  reset,
  getFriends,
  getSharedGames,
  isLoading,
  canGetGames
}) {
  const [userId, setUserId] = useState('');
  function resetForm() {
    setUserId('');
    reset();
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
    <StyledContainer>
      <StyledH1>MultiPlayDate</StyledH1>
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
            Reset
          </StyledButton>
        </SpacedDiv>
        <SpacedDiv>
          <StyledButton
            onClick={() => getFriends(userId)}
            type="button"
            disabled={isLoading ? 'disabled' : ''}
          >
            Find Friends
          </StyledButton>
          <StyledButton
            onClick={() => handleSubmit()}
            type="button"
            disabled={isLoading || !canGetGames ? 'disabled' : ''}
          >
            Get Shared Games
          </StyledButton>
        </SpacedDiv>
      </form>
      <Loader display={isLoading ? 'inline-block' : 'none'}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Loader>
    </StyledContainer>
  );
}

const StyledH1 = styled.h1`
  margin: 10px;
`;

const SpacedDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  & button,
  input {
    @media (max-width: 370px) {
      width: 90%;
    }
  }
`;

const loading1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const loading3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const loading2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const Loader = styled.div`
  display: ${props => props.display};
  position: relative;
  height: 30px;
  width: 80px;
  & div {
    position: absolute;
    top: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #000;
  }
  & div:nth-child(1) {
    left: 8px;
    animation: ${loading1} 0.5s infinite;
  }
  & div:nth-child(2) {
    left: 8px;
    animation: ${loading2} 0.5s infinite;
  }
  & div:nth-child(3) {
    left: 32px;
    animation: ${loading2} 0.5s infinite;
  }
  & div:nth-child(4) {
    left: 56px;
    animation: ${loading3} 0.5s infinite;
  }
`;

export default UserEntry;
