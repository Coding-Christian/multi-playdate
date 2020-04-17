import React from 'react';
import styled from '@emotion/styled';
import StyledContainer from './emotion/styledContainer';
import StyledSpan from './emotion/styledSpan';

const StyledP = styled.p`
  margin: 10px;
`;

function DetailCard({ name, score, genres, description, background }) {
  const BackroundContainer = styled(StyledContainer)`
    width: 100%;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-color: #bfbfbf;
    background-blend-mode: screen;
    &:after {
      box-shadow: inset -5px -5px 7px rgba(94, 104, 121, 0.671),
        inset 5px 5px 7px rgba(94, 104, 121, 0.671);
    }
  `;
  return (
    <BackroundContainer>
      <StyledP>
        <b>{name}</b>
      </StyledP>
      <div>
        <StyledSpan>Metacritic Score: {score || 'N/A'}</StyledSpan>
        <StyledSpan>
          Genres: {genres.length ? genres.slice(0, 2).join(', ') : 'N/A'}
        </StyledSpan>
      </div>
      <StyledP>{description}</StyledP>
    </BackroundContainer>
  );
}

export default DetailCard;
