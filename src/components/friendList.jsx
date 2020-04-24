import React from 'react';
import StyledContainer from './emotion/styledContainer';
import FriendCard from './friendCard';

function FriendList({ friends, selectedIds, handleFriendClick }) {
  return (
    <StyledContainer>
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
    </StyledContainer>
  );
}

export default FriendList;
