import styled from "styled-components";


const ContainerPrice = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr auto;  
    text-align: center;
`

const TotalContainer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
  padding:  10px 20px;
  display: grid;
  grid-column: 2 / 3;
  font-family: sans-serif;

`;

const TotalPrice = ({ total }: { total: number }) => {
    return (
    <ContainerPrice>
    <TotalContainer>Preu pressupostat: {total}€</TotalContainer>
    </ContainerPrice>
    );
};

export default TotalPrice;
