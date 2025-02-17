import { Link } from "react-router-dom";
import styled from "styled-components";
import imagenBanner from "../../assets/imagenBanner.jpg";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  text-align: center;
  background-image: url(${() => imagenBanner});
  background-size: cover;
  background-position:center;
  font-family: sans-serif;

`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  margin-top: 100px;
  color:  black;
  font-weight: bold;
  
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: black;
  font-weight: bold;
  

`;

const StartButton = styled(Link)`
  padding: 10px 20px;
  font-size: 1.2rem;
  background:rgba(146, 27, 27, 0.7);
  color: black;
  text-decoration: none;
  border-radius: 22px;
  
  &:hover {
    background:rgb(255, 0, 0);
  }
`;

const Welcome = () => {
  return (
    <WelcomeContainer>
      <Title>Benvingut/da!</Title>
      <Description>Aquesta web et permet calcular el pressupost per al teu projecte.</Description>
      <StartButton to="/calculator">Començar</StartButton>
    </WelcomeContainer>
  );
};

export default Welcome;
