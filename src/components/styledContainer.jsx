import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  background: #f7f7f7;
  padding: 30px;
  border-radius: 5%;
  box-shadow: -5px -5px 7px #fff, 5px 5px 7px rgba(94, 104, 121, 0.712);
  position: relative;
  &:after {
    content: "";
    position: absolute;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    background-color: transparent;
    border-radius: 5%;
    box-shadow: inset -5px -5px 7px #ffff,
      inset 5px 5px 7px rgba(94, 104, 121, 0.671);
  }
  & * {
    z-index: 1;
  }
`;

export default StyledContainer;
