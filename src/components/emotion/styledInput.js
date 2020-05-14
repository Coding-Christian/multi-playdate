import styled from '@emotion/styled';

const StyledInput = styled.input`
  height: 30px;
  font-family: "Fira Mono", monospace;
  padding: 0px 10px;
  border: 3px double black;
  border-radius: 6px;
  background: #ffffff;
  margin: 10px;
  &:focus {
    border: 3px solid #112266;
    outline: none;
  }
`;

export default StyledInput;
