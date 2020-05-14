import styled from '@emotion/styled';

const StyledButton = styled.button`
  height: 30px;
  font-family: "Fira Mono", monospace;
  background-color: #f5f5f5;
  padding: 0px 12px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  &:focus {
    text-decoration: underline;
    outline: none;
  }
  &:hover {
    cursor: pointer;
    color: #f5f5f5;
    background-color: #202020;
  }
  &:active {
    background-color: #112266;
  }
`;

export default StyledButton;
