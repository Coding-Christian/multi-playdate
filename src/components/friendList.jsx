import React from 'react';
import styled from '@emotion/styled';
import FriendCard from './friendCard';

function FriendList({ friends, selectedIds, setSelectedIds }) {
  function handleFriendClick(steamId, checked) {
    if (checked) {
      setSelectedIds(selectedIds.filter(id => id !== steamId));
    } else if (selectedIds.length < 6) {
      setSelectedIds([...selectedIds, steamId]);
    }
  }
  let text = '';
  if (selectedIds.length === 6) {
    text = 'Get your shared games now!';
  } else if (selectedIds.length > 1) {
    text = `Choose up to ${
      6 - selectedIds.length
    } more friends or get shared games:`;
  } else {
    text = 'Choose up to 5 friends to compare games:';
  }
  return (
    <FlexRowDiv>
      <StyledH2>{text}</StyledH2>
      {friends.map(friend => (
        <FriendCard
          key={friend.steamid}
          steamId={friend.steamid}
          name={friend.personaname}
          realName={friend.realname}
          avatar={friend.avatarmedium}
          status={friend.personastate}
          profileUrl={friend.profileurl}
          handleFriendClick={handleFriendClick}
          checked={selectedIds.includes(friend.steamid)}
        />
      ))}
    </FlexRowDiv>
  );
}

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const StyledH2 = styled.h2`
  width: 100%;
  text-align: center;
  margin: 10px;
`;

export default FriendList;