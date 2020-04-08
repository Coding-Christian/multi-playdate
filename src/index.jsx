import React from 'react';
import ReactDOM from 'react-dom';
import StyledH1 from './components/styledH1';
import StyledButton from './components/styledButton';
import StyledInput from './components/styledInput';

ReactDOM.render(
  <>
    <StyledH1>Hello World!</StyledH1>
    <StyledButton title="Click Me!">Click Me!</StyledButton>
    <StyledInput type="text" placeholder="Type Here!" />
  </>,
  document.getElementById('root')
);
