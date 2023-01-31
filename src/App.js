import { useState } from "react";
import styled from "styled-components";
import Input from "./components/Input";

const StyledCardWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;

  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCard = styled.div`
  width: 350px;
  margin: 30px auto;
  padding-bottom: 20px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  text-align: center;
`;

const StyledImg = styled.img`
  width: 350px;
  border-radius: 25px;
`;

function App() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cfa1361ae0msh20a5756cbf5c2ecp116cdajsn9c16cfc79ea3',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
      accept: "application/json"
    }
  }; 

  const [inputValue, setInputValue] = useState("");
  const [apiData, setApiData] = useState([]);

  const apiUrl = `https://imdb8.p.rapidapi.com/auto-complete?q=${inputValue}`;
  let iterationCounter = -1;

  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const getApiResponse = async () => {
    const apiResponse = await fetch(apiUrl, options);

    const responseJSON = await apiResponse.json();

    setApiData(responseJSON.d);
  };

  return (
    <div className="App">
      <Input 
      inputOnChange={inputHandler}
      buttonOnCLick={getApiResponse}
      />
      <StyledCardWrap>
        {apiData.map(() => {
          iterationCounter += 1;

          return (
            <StyledCard key={iterationCounter}>
              <StyledImg src={apiData[iterationCounter].i.imageUrl} alt="film poster"></StyledImg>
              <h2>{apiData[iterationCounter].l}</h2>
              <div>Year: {apiData[iterationCounter].y}</div>
              <div>Type: {apiData[iterationCounter].qid}</div>
              <div>In Main Roles: {apiData[iterationCounter].s}</div>
            </StyledCard>
          );
        })}
      </StyledCardWrap>
    </div>
  );
}

export default App;
