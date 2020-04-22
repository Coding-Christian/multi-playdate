import React, { useState } from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';

const StyledH1 = styled.h1`
  margin: 10px;
`;

const InlineDiv = styled.div`
  display: inline-block;
`;

const SpacedDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
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
  display: inline-block;
  visibility: ${props => props.visibility};
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

function UserEntry({ getSharedGames, maxPlayers, isLoading }) {
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
        Add or Remove Players:
        <InlineDiv>
          <StyledButton
            onClick={() =>
              steamIds.length < maxPlayers
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
        </InlineDiv>
      </div>
      <form>
        {inputs}
        <SpacedDiv>
          <InlineDiv>
            <StyledButton
              onClick={() => getSharedGames(steamIds)}
              type="button"
            >
              Get Shared Games
            </StyledButton>
            <StyledButton onClick={clearSteamIds} type="button">
              Clear
            </StyledButton>
          </InlineDiv>
          <Loader visibility={isLoading ? 'visible' : 'hidden'}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Loader>
        </SpacedDiv>
      </form>
    </StyledContainer>
  );
}

export default UserEntry;
