import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

const TestDiv = styled.div`
  color: pink;
`;

ReactDOM.render(
  <TestDiv>Hello World</TestDiv>,
  document.getElementById('root')
);
