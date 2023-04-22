import styled from "styled-components";

const StyledInputWrap = styled.div`
  display: flex;
  width: 500px;
  height: 50px;
  margin: 25px auto;
  border: 2px solid #cbcbce;
  border-radius: 50px;

  @media (max-width: 550px) {
    width: 90%;
  }
`;

const StyledInput = styled.input`
  width: 64%;
  height: 40px;
  margin: auto;
  padding-left: 20px;
  border: none;
  outline: none;
  border-radius: 50px;
`;

const StyledButton = styled.button`
  width: 36%;
  height: 40px;
  margin: auto 5px auto auto;
  border: none;
  border-radius: 50px;
  background-color: #6fc754;
  color: white;
  cursor: pointer;
`; 

export default function Input ({inputOnChange, buttonOnCLick}) {
  return (
    <StyledInputWrap>
      <StyledInput onChange={inputOnChange}></StyledInput>
      <StyledButton onClick={buttonOnCLick}>Search</StyledButton>
    </StyledInputWrap>
  );
}