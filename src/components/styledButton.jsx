import React from 'react';
import styled from '@emotion/styled';

function StyledButton(props) {
  const StyledButton = styled.button`
    height: 50px;
    background-color: #fff;
    padding: 0px 20px;
    border: none;
    border-radius: 12px;
    box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
    &:active {
      box-shadow: inset 5px 5px 10px #e0e0e0, inset -5px -5px 10px #ffffff;
    }
  `;
  return <StyledButton onClick={props.onClick}>{props.label}</StyledButton>;
}

export default StyledButton;
