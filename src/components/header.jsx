import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

function Header(props) {
  return <StyledH1>multi-playdate</StyledH1>;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledH1 = styled.h1`
  width: 100%;
  font-family: "Fira Mono", monospace;
  text-align: center;
  color: #f5f5f5;
  padding: 15px;
  margin: 0;
  box-sizing: border-box;
  animation: ${fadeIn} ease-in-out 2s;
`;

export default Header;
