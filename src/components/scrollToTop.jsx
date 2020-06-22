import React from 'react';
import styled from '@emotion/styled';

function ScrollToTop({ display }) {
  return (
    <FixedDiv
      onClick={e => {
        e.stopPropagation();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }}
      display={display}
    >
      ^
    </FixedDiv>
  );
}

const FixedDiv = styled.div`
  display: ${props => (props.display ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 48px;
  height: 48px;
  color: #f5f5f5;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 0.5rem 0 0.5rem;
  z-index: 1;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

export default ScrollToTop;
