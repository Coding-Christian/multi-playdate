import React from 'react';
import styled from '@emotion/styled';

function StyledH1({ title, textAlign }) {
  const StyledH1 = styled.h1`
    font-family: "Raleway", sans-serif;
    text-align: ${textAlign};
  `;
  return <StyledH1>{title}</StyledH1>;
}

export default StyledH1;
