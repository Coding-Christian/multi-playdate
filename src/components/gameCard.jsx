import React from 'react';
import styled from '@emotion/styled';
import StyledCard from './emotion/styledCard';

function GameCard({ appId, name, score, genres, description, background }) {
  return (
    <BackroundCard background={background}>
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
      <StyledA
        href={`steam://advertise/${appId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View in Steam (may not work with certain browsers)
      </StyledA>
    </BackroundCard>
  );
}

const StyledP = styled.p`
  margin: 10px;
`;

const StyledSpan = styled.span`
  margin: 10px;
`;

const StyledA = styled.a`
  margin: 10px;
`;

const BackroundCard = styled(StyledCard)`
  width: 90%;
  max-width: 100%;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  background-color: #bfbfbf;
  background-blend-mode: screen;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    border-width: 2px;
  }
  @media (min-width: 768px) {
    max-width: calc(50% - 60px);
  }
`;

export default GameCard;
