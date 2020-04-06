import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import StyledButton from './components/styledButton';
import StyledInput from './components/styledInput';

const TestDiv = styled.div`
  color: pink;
`;

ReactDOM.render(
  <>
    <TestDiv>Hello World!</TestDiv>
    <StyledButton onClick={() => {}} label="Click Me!" />
    <StyledInput type="text" placeholder="Type Here!" />
  </>,
  document.getElementById('root')
);
