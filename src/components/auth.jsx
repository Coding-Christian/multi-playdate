import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

function Auth() {
  const [authURL, setAuthURL] = useState('');
  useEffect(() => {
    const getUrl = async () => {
      const body = await (await fetch(`/api/auth`)).json();
      setAuthURL(body.url);
    };
    getUrl();
  }, []);

  return (
    <a href={authURL}>
      <StyledImg src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
    </a>
  );
}

const StyledImg = styled.img`
  max-width: 180px;
  max-height: 35px;
`;
export default Auth;
