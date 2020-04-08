import React from 'react';
import styled from '@emotion/styled';
import StyledH1 from './styledH1';
import StyledButton from './styledButton';
import StyledInput from './styledInput';

function UserEntry(props) {
  // const [steamId, setSteamId] = useState('');
  const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    background: #f7f7f7;
    padding: 40px;
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
  `;
  return (
    <StyledForm>
      <StyledH1>MultiPlayDate</StyledH1>
      <div>
        <StyledInput
          placeholder="SteamID"
          type="number"
          maxLength="17"
          required
        />
        <StyledButton type="button">Play</StyledButton>
      </div>
    </StyledForm>
  );
}

export default UserEntry;
