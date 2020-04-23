import React from 'react';
import styled from '@emotion/styled';
import StyledCard from './emotion/styledCard';

const StyledImg = styled.img`
  height: 48px;
  width: 48px;
  box-sizing: border-box;
  border: ${props => (props.checked ? '4px solid #4faf5f' : 'none')};
  border-radius: 4px;
  margin: 5px;
`;

const StyledA = styled.a`
  text-decoration: none;
`;

const StyledP = styled.p`
  margin: 10px;
`;

const GrowDiv = styled.div`
  flex-grow: 1;
  width: 80%;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

function FriendCard({
  steamId,
  name,
  realName,
  status,
  profileUrl,
  checked,
  handleClick
}) {
  return (
    <StyledCard>
      <StyledImg
        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2c/2c094f9800e47f09714dce598b4576c5b3ddc0b5_medium.jpg"
        alt={name}
        onClick={() => handleClick(steamId, checked)}
        checked={checked}
      />
      <GrowDiv>
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
      </GrowDiv>
    </StyledCard>
  );
}

export default FriendCard;
