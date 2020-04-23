import React from 'react';
import styled from '@emotion/styled';
import StyledCard from './emotion/styledCard';

const StyledImg = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 4px;
  margin: 5px;
`;

const StyledA = styled.a`
  text-decoration: none;
`;

const StyledP = styled.p`
  margin: 10px;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const WideDiv = styled.div`
  width: 100%;
`;

function FriendCard({ name, realName, status, profileUrl }) {
  return (
    <StyledCard>
      <input type="checkbox" />
      <StyledImg
        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2c/2c094f9800e47f09714dce598b4576c5b3ddc0b5_medium.jpg"
        alt={name}
      />
      <WideDiv>
        <StyledP>
          <b>{name}</b>
          {realName ? ` (${realName})` : ''}
        </StyledP>
        <FlexDiv>
          <span>{status === 1 ? 'Online' : 'Offline'}</span>
          <StyledA href={profileUrl} target="_blank" rel="noopener noreferrer">
            {'Profile >>'}
          </StyledA>
        </FlexDiv>
      </WideDiv>
    </StyledCard>
  );
}

export default FriendCard;
