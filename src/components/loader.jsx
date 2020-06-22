import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

function Loader(props) {
  return (
    <StyledLoader>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoader>
  );
}

const loading1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const loading3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const loading2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const StyledLoader = styled.div`
  display: ${props => props.display};
  position: relative;
  height: 30px;
  width: 80px;
  margin: auto;
  & div {
    position: absolute;
    top: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #000;
  }
  & div:nth-of-type(1) {
    left: 8px;
    animation: ${loading1} 0.5s infinite;
  }
  & div:nth-of-type(2) {
    left: 8px;
    animation: ${loading2} 0.5s infinite;
  }
  & div:nth-of-type(3) {
    left: 32px;
    animation: ${loading2} 0.5s infinite;
  }
  & div:nth-of-type(4) {
    left: 56px;
    animation: ${loading3} 0.5s infinite;
  }
`;

export default Loader;
