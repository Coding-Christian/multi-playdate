import styled from '@emotion/styled';

const StyledButton = styled.button`
  height: 30px;
  font-family: "Fira Mono", monospace;
  background-color: #f5f5f5;
  padding: 0px 8px;
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
  &:disabled {
    cursor: not-allowed;
    color: #606060;
    background-color: #f5f5f5;
  }
  &:active {
    background-color: #112266;
  }
`;

export default StyledButton;
