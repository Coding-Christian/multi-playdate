import React from 'react';
import styled from '@emotion/styled';
import StyledCard from './emotion/styledCard';

function GameCard({
  appId,
  name,
  score,
  genres,
  description,
  background,
  selected
}) {
  return (
    <BackroundCard background={background} selected={selected}>
      <StyledP>
        <b>{name}</b>
      </StyledP>
      <StyledDiv>
        <StyledSpan>
          Metacritic Score:
          <br />
          {score || 'N/A'}
        </StyledSpan>
        <StyledSpan>
          Genres:
          <br />
          {genres.length ? genres.slice(0, 2).join(', ') : 'N/A'}
        </StyledSpan>
      </StyledDiv>
      <StyledP>
        {description.substring(0, 128).replace(/&quot;/g, "'") + '...'}
      </StyledP>
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

const BackroundCard = styled(StyledCard)`
  justify-content: space-between;
  width: 90%;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  background-color: #bfbfbf;
  background-blend-mode: screen;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 992px) {
    width: ${props => (props.selected ? '90%' : '45%')};
  }
  @media (min-width: 1200px) {
    width: ${props => (props.selected ? '90%' : '30%')};
  }
`;

const StyledDiv = styled.div`
  display: flex;
`;

const StyledP = styled.p`
  margin: 10px;
`;

const StyledSpan = styled.span`
  margin: 10px;
`;

const StyledA = styled.a`
  margin: 10px;
`;

export default GameCard;
