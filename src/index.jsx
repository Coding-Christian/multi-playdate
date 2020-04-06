import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import StyledButton from './components/styledButton';

const TestDiv = styled.div`
  color: pink;
`;

ReactDOM.render(
  <>
    <TestDiv></TestDiv>
    <StyledButton onClick={() => {}} color="light" label="Click Me!" />
  </>,
  document.getElementById('root')
);
