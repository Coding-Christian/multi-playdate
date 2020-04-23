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

const statuses = [
  'Offline',
  'Online',
  'Busy',
  'Away',
  'Snooze',
  'Looking to Trade',
  'Looking to Play'
];

function FriendCard({
  steamId,
  name,
  realName,
  avatar,
  status,
  profileUrl,
  checked,
  handleClick
}) {
  return (
    <StyledCard>
      <StyledImg
        src={avatar}
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
          <span>{statuses[status]}</span>
          <StyledA href={profileUrl} target="_blank" rel="noopener noreferrer">
            {'Profile >>'}
          </StyledA>
        </FlexDiv>
      </GrowDiv>
    </StyledCard>
  );
}

export default FriendCard;
