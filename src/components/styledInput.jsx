import React from 'react';
import styled from '@emotion/styled';

function StyledInput({ type, placeholder }) {
  const StyledInput = styled.input`
    height: 30px;
    padding: 0px 10px;
    border: none;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: inset 3px 3px 8px #d9d9d9, inset -3px -3px 8px #ffffff;
  `;
  return <StyledInput type={type} placeholder={placeholder} />;
}

export default StyledInput;
