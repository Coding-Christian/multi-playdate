import React from 'react';
import styled from '@emotion/styled';
import StyledContainer from './emotion/styledContainer';

const StyledP = styled.p`
  margin: 10px;
`;

const StyledSpan = styled.span`
  margin: 10px;
`;

const StyledA = styled.a`
  margin: 10px;
`;

const BackroundContainer = styled(StyledContainer)`
  width: 90%;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  background-color: #bfbfbf;
  background-blend-mode: screen;
  &:after {
    box-shadow: inset -5px -5px 7px rgba(94, 104, 121, 0.671),
      inset 5px 5px 7px rgba(94, 104, 121, 0.671);
  }
`;

function DetailCard({ appId, name, score, genres, description, background }) {
  return (
    <BackroundContainer background={background}>
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
      <StyledA href={`steam://advertise/${appId}`} target="_blank">
        View in Steam (may not work with certain browsers)
      </StyledA>
    </BackroundContainer>
  );
}

export default DetailCard;
