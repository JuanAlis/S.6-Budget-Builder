import styled from "styled-components";

interface SwitchProps {
  active: boolean; 
}

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const Switch = styled.div<SwitchProps>`
  position: relative;
  width: 50px;
  height: 25px;
  background: ${({ active }) => (active ? "#4CAF50" : "#ccc")};
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s;
`;

const SwitchBall = styled.div<SwitchProps>`
  position: absolute;
  top: 2px;
  left: ${({ active }) => (active ? "26px" : "3px")};
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: left 0.3s;
`;

const PaymentToggle = ({ isAnnual, setIsAnnual }: { isAnnual: boolean; setIsAnnual: (value: boolean) => void }) => {
  return (
    <ToggleContainer>
      <span>Pagament mensual</span>
      <Switch active={isAnnual} onClick={() => setIsAnnual(!isAnnual)}>
        <SwitchBall active={isAnnual} />
      </Switch>
      <span>Pagament anual</span>
    </ToggleContainer>
  );
};

export default PaymentToggle;
