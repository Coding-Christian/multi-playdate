import React from 'react';
import StyledContainer from './emotion/styledContainer';
import StyledP from './emotion/styledP';
import StyledSpan from './emotion/styledSpan';

function DetailCard({ name, score, genres, description }) {
  return (
    <StyledContainer>
      <StyledP>
        <b>{name}</b>
      </StyledP>
      <div>
        <StyledSpan>Metacritic Score: {score || 'N/A'}</StyledSpan>
        <StyledSpan>
          Genres: {genres.length ? genres.slice(0, 2).join(', ') : 'N/A'}
        </StyledSpan>
      </div>
      <hr />
      <StyledP>{description}</StyledP>
    </StyledContainer>
  );
}

export default DetailCard;
