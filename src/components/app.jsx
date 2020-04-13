import React from 'react';
import styled from '@emotion/styled';
import UserEntry from './userEntry';

function App(props) {
  const AppArea = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `;
  return (
    <AppArea>
      <UserEntry />
    </AppArea>
  );
}

export default App;
