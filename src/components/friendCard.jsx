import React from 'react';
// import styled from '@emotion/styled';
import StyledCard from './emotion/styledCard';

function FriendCard({ name }) {
  return (
    <StyledCard>
      <h1>{name}</h1>
    </StyledCard>
  );
}

export default FriendCard;
