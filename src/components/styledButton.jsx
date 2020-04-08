import styled from '@emotion/styled';

const StyledButton = styled.button`
  height: 30px;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  background-color: #f5f5f5;
  padding: 0px 12px;
  border: none;
  border-radius: 8px;
  box-shadow: 5px 5px 7px #d9d9d9, -5px -5px 7px #ffff;
  margin: 10px;
  &:focus {
    text-decoration: underline;
    outline: none;
  }
  &:hover {
    cursor: pointer;
    background: linear-gradient(145deg, #e6e6e6, #fff);
    box-shadow: 5px 5px 12px #d9d9d9, -5px -5px 12px #fff;
  }
  &:active {
    box-shadow: inset 5px 5px 10px #e0e0e0, inset -5px -5px 10px #fff;
  }
`;

export default StyledButton;
