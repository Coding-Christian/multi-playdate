import React from 'react';
import styled from '@emotion/styled';
import StyledCard from './emotion/styledCard';

const statuses = [
  'Offline',
  'Online',
  'Busy',
  'Away',
  'Snooze',
  'Looking to Trade',
  'Looking to Play'
];
const colors = [
  '#aa0000',
  '#009900',
  '#bbaa00',
  '#bbaa00',
  '#bbaa00',
  '#2255dd',
  '#2255dd'
];

function FriendCard({
  steamId,
  name,
  realName,
  avatar,
  status,
  profileUrl,
  checked,
  handleFriendClick
}) {
  return (
    <FixedCard onClick={() => handleFriendClick(steamId, checked)}>
      <StyledImg src={avatar} alt={name} checked={checked} />
      <GrowDiv>
        <StyledP>
          <b>{name}</b>
          {realName ? ` (${realName})` : ''}
        </StyledP>
        <FlexDiv>
          <StatusSpan color={status}>{statuses[status]}</StatusSpan>
          <StyledA
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            {'Profile >>'}
          </StyledA>
        </FlexDiv>
      </GrowDiv>
    </FixedCard>
  );
}

const StyledImg = styled.img`
  height: 48px;
  width: 48px;
  box-sizing: border-box;
  border: ${props => (props.checked ? '4px solid #4faf5f' : 'none')};
  border-radius: 4px;
  margin: 5px;
`;

const FixedCard = styled(StyledCard)`
  flex-direction: row;
  max-width: 365px;
  text-align: left;
  &:hover {
    cursor: pointer;
  }
`;

const StatusSpan = styled.span`
  color: ${props => colors[props.color]};
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

export default FriendCard;
