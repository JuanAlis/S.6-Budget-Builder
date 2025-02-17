import { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";
import PaymentToggle from "../sliderbutton/PaymentToggle";


const Main = styled.main`
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const SliderButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px;
`;

const Layout = ({ children,  isAnnual, setIsAnnual }: { 
  children: ReactNode; 
  logo: string; 
  isAnnual: boolean; 
  setIsAnnual: (value: boolean) => void; 
}) => {
  return (
    <>
      <Header/>
      <SliderButton>
        <PaymentToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      </SliderButton>
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
