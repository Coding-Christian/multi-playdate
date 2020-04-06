import React from 'react';
import styled from '@emotion/styled';

function StyledButton({ onClick, label }) {
  const StyledButton = styled.button`
    height: 50px;
    font-family: "Raleway", sans-serif;
    font-size: 1.5rem;
    background-color: #fff;
    padding: 0px 20px;
    border: none;
    border-radius: 12px;
    box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
    margin: 10px;
    &:focus {
      text-decoration: underline;
      outline: none;
    }
    &:hover {
      background: linear-gradient(145deg, #e6e6e6, #ffffff);
      box-shadow: 5px 5px 12px #d9d9d9, -5px -5px 12px #ffffff;
    }
    &:active {
      box-shadow: inset 5px 5px 10px #e0e0e0, inset -5px -5px 10px #ffffff;
    }
  `;
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}

export default StyledButton;
