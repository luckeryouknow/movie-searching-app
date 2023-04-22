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

const StyledNothingIsFound = styled.h1`
  position: absolute;
  text-align: center;
  right: 40%;
  left: 40%;

  @media(max-width: 600px) {
    right: 10%;
    left: 10%;
  };
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
  const [buttonState, setButtonState] = useState("not clicked");

  const apiUrl = `https://imdb8.p.rapidapi.com/auto-complete?q=${inputValue}`;
  let iterationCounter = -1;

  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const getApiResponse = async () => {
    const apiResponse = await fetch(apiUrl, options);
    const responseJSON = await apiResponse.json();

    setButtonState("clicked");
    setApiData(responseJSON.d);
  };

  const imageChecker = (iterationParametr) => {
    if (apiData[iterationParametr].hasOwnProperty("i") === true) {
      return apiData[iterationParametr].i.imageUrl;
    } else {
      return "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
    };
  };

  const contentHandler = () => {
    if (apiData.length !== 0 && buttonState === "clicked") {
      return (
        apiData.map(() => {
          iterationCounter += 1;

          return (
            <StyledCard key={iterationCounter}>
              <StyledImg src={imageChecker(iterationCounter)} alt="film poster"></StyledImg>
              <h2>{apiData[iterationCounter].l}</h2>
              <div>Year: {apiData[iterationCounter].y}</div>
              <div>Type: {apiData[iterationCounter].qid}</div>
              <div>In Main Roles: {apiData[iterationCounter].s}</div>
            </StyledCard>
          );
        })
      )
    } else if (apiData.length === 0 && buttonState === "clicked") {
      return (
        <StyledNothingIsFound>Nothing is found</StyledNothingIsFound>
      );
    }
  };

  return (
    <div className="App">
      <Input 
      inputOnChange={inputHandler}
      buttonOnCLick={getApiResponse}
      />
      <StyledCardWrap>
        {contentHandler()}
      </StyledCardWrap>
    </div>
  );
}

export default App;
