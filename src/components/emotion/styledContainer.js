import styled from '@emotion/styled';

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: -5px -5px 7px #fff, 5px 5px 7px rgba(94, 104, 121, 0.712);
  margin: 20px;
  &:after {
    content: "";
    position: absolute;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    background-color: transparent;
    border-radius: 10px;
    box-shadow: inset -5px -5px 7px #ffff,
      inset 5px 5px 7px rgba(94, 104, 121, 0.671);
  }
  & * {
    z-index: 1;
  }
`;

export default StyledContainer;
