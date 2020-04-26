import React from 'react';
import styled from '@emotion/styled';

function Header(props) {
  return <StyledH1>MultiPlayDate</StyledH1>;
}

const StyledH1 = styled.h1`
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.75);
  padding: 15px;
  margin: 0;
  box-sizing: border-box;
`;

export default Header;
