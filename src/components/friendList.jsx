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
  return (
    <FlexRowDiv>
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

export default FriendList;
