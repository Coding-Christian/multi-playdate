import React, { useState } from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import StyledButton from './emotion/styledButton';
import StyledInput from './emotion/styledInput';
import StyledContainer from './emotion/styledContainer';
import FriendCard from './friendCard';

const StyledH1 = styled.h1`
  margin: 10px;
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

function UserEntry({ friends, reset, getFriends, getSharedGames, isLoading }) {
  const [userId, setUserId] = useState('');
  const [friendIds, setFriendIds] = useState([]);
  function resetForm() {
    setUserId('');
    setFriendIds([]);
    reset();
  }
  function handleChange(e) {
    if (/^\d{0,17}$/.test(e.target.value)) {
      setUserId(e.target.value);
    }
  }
  return (
    <StyledContainer>
      <StyledH1>MultiPlayDate</StyledH1>
      <form>
        <SpacedDiv>
          <StyledInput
            onChange={handleChange}
            placeholder="SteamID"
            type="text"
            maxLength="17"
            value={userId}
            required
          />
          <StyledButton onClick={resetForm} type="button">
            Reset
          </StyledButton>
        </SpacedDiv>
        <SpacedDiv>
          <StyledButton onClick={() => getFriends(userId)} type="button">
            Find Friends
          </StyledButton>
          <StyledButton
            onClick={() => getSharedGames([userId, ...friendIds])}
            type="button"
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
      {friends.map(friend => (
        <FriendCard
          key={friend.steamid}
          name={friend.personaname}
          realName={friend.realname}
          status={1}
          profileUrl="https://google.com"
        />
      ))}
    </StyledContainer>
  );
}

export default UserEntry;
