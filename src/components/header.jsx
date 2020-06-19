import React from 'react';
import styled from '@emotion/styled';

function Header(props) {
  return <StyledH1>multi-playdate</StyledH1>;
}

const StyledH1 = styled.h1`
  width: 100%;
  font-family: "Fira Mono", monospace;
  text-align: center;
  color: #f5f5f5;
  padding: 15px;
  margin: 0;
  box-sizing: border-box;
`;

export default Header;
