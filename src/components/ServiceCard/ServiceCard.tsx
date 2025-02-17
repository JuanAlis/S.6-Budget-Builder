import { useState, useEffect } from "react";
import styled from "styled-components";

// 🎨 ESTILOS DEL POPUP
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;

`;

const ModalContent = styled.div`
  font-family: sans-serif;
  font-size: 1.5rem;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 600px;
`;

const CloseButton = styled.button`
  margin-top: 15px;
  background: rgb(58, 115, 165);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    color: #0056b3;
  }
`;

// 🎨 ESTILOS ORIGINALES
const Card = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: auto;
  margin-bottom: 15px;
  border: ${({ selected }) => (selected ? "2px solid green" : "none")}
  font-family: sans-serif;
  
  ;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 10px;
  }
`;

const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
`;

const DiscountLabel = styled.span`
  display: flex;
  flex-direction: column;
  color: #ff5733;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 5px;
  align-items: center;
  font-family: sans-serif;

`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  font-family: sans-serif;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-family: sans-serif;
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  grid-column: 3 / 4;
  font-family: sans-serif;


  @media (max-width: 768px) {
    grid-column: unset;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  
`;

const Button = styled.button`
  background-color: white;
  border: solid 1px black;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 50%;
  

  &:hover {
    background-color: #ccc;
  }
`;



// 🎨 (Tus estilos se mantienen sin cambios)

interface ServiceCardProps {
  name: string;
  description: string;
  isAnnual: boolean;
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  onTotalChange: (price: number) => void;
  updateServiceDetails: (serviceName: string, pages?: number, languages?: number) => void;
}

type PopupType = "pages" | "languages" | null;

const ServiceCard = ({
  name,
  description,
  isAnnual,
  selectedServices,
  setSelectedServices,
  onTotalChange,
  updateServiceDetails
}: ServiceCardProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [numLanguages, setNumLanguages] = useState<number>(1);
  const [prevTotalPrice, setPrevTotalPrice] = useState<number>(0);

  // Estados para popups (sin cambios)
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<PopupType>(null);

  // Cálculos de precios
  const webBasePrice: number = 500;
  const extrasPrice: number = (numPages + numLanguages) * 30;
  const totalWebWithoutDiscount: number = webBasePrice + extrasPrice;
  const totalWebPrice: number = isAnnual ? totalWebWithoutDiscount * 0.8 : totalWebWithoutDiscount;

  const basePriceSeo: number = isAnnual ? 300 * 0.8 : 300;
  const basePriceAds: number = isAnnual ? 400 * 0.8 : 400;

  const totalPrice: number =
    name === "Web" ? totalWebPrice :
    name === "Seo" ? basePriceSeo :
    name === "Ads" ? basePriceAds : 0;

  // Precio que se muestra en la card
  const displayPrice: number = totalPrice;

  // Determinar si el servicio está seleccionado
  const selected: boolean = selectedServices.some((s) => s.includes(name));

  // Control del total: actualizar si el precio cambia
  useEffect(() => {
    if (selected && totalPrice !== prevTotalPrice) {
      onTotalChange(totalPrice - prevTotalPrice);
      setPrevTotalPrice(totalPrice);
    }
  }, [totalPrice, selected, onTotalChange, prevTotalPrice]);

  // Manejar selección/deselección
  const handleToggle = () => {
    if (selected) {
      setSelectedServices((prev) => prev.filter((s) => !s.includes(name)));
      onTotalChange(-prevTotalPrice); // Restar el precio previamente agregado
      setPrevTotalPrice(0);
    } else {
      const newValue = name === "Web" ? `Web (${numPages} pàgines, ${numLanguages} llenguatges)` : name;
      setSelectedServices((prev) => [...prev, newValue]);
      if (name === "Web") {
        updateServiceDetails(name, numPages, numLanguages); // Guardar detalles para Web
      }
      onTotalChange(totalPrice);
      setPrevTotalPrice(totalPrice);
    }
  };

  // ★ NUEVO: Actualizar el string del servicio Web cuando cambien los contadores
  useEffect(() => {
    if (name === "Web" && selected) {
      setSelectedServices((prev) =>
        prev.map(s => s.includes("Web") ? `Web (${numPages} pàgines, ${numLanguages} llenguatges)` : s)
      );
      updateServiceDetails(name, numPages, numLanguages);
    }
  }, [numPages, numLanguages, selected, name, setSelectedServices, updateServiceDetails]);

  // Manejo del popup (sin cambios)
  const openPopup = (type: PopupType) => {
    setPopupType(type);
    setShowPopup(true);
  };

  return (
    <>
      <Card selected={selected}>
        <ServiceInfo>
          <strong>{name}</strong>
          <span>{description}</span>
        </ServiceInfo>

        <div>
          {isAnnual && <DiscountLabel>Ahorra un 20%</DiscountLabel>}
          <Price>{displayPrice.toFixed(0)}€</Price>
        </div>

        <CheckboxContainer>
          <input type="checkbox" checked={selected} onChange={handleToggle} />
          <span>Afegir</span>
        </CheckboxContainer>

        {selected && name === "Web" && (
          <CounterContainer>
            <Counter>
              <InfoButton onClick={() => openPopup("pages")}>ℹ️</InfoButton>
              <span>Nombre de pàgines:</span>
              <Button onClick={() => setNumPages(Math.max(numPages - 1, 1))}>-</Button>
              <span>{numPages}</span>
              <Button onClick={() => setNumPages(numPages + 1)}>+</Button>
            </Counter>
            <Counter>
              <InfoButton onClick={() => openPopup("languages")}>ℹ️</InfoButton>
              <span>Nombre de llenguatges:</span>
              <Button onClick={() => setNumLanguages(Math.max(numLanguages - 1, 1))}>-</Button>
              <span>{numLanguages}</span>
              <Button onClick={() => setNumLanguages(numLanguages + 1)}>+</Button>
            </Counter>
          </CounterContainer>
        )}
      </Card>

      {showPopup && (
        <ModalOverlay onClick={() => setShowPopup(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{popupType === "pages" ? "Número de pàgines" : "Número de llenguatges"}</h2>
            <p>
              {popupType === "pages"
                ? "Afegeix les pàgines que tindrà el teu projecte. El cost de cada pàgina és de 30€."
                : "Afegeix els llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€."}
            </p>
            <CloseButton onClick={() => setShowPopup(false)}>Tancar</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ServiceCard;
