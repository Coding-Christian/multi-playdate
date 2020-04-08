import styled from '@emotion/styled';

const StyledButton = styled.button`
  height: 30px;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  background-color: #fff;
  padding: 0px 15px;
  border: none;
  border-radius: 8px;
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

export default StyledButton;
