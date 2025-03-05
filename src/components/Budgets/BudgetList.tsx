import { useState, useEffect } from "react";
import styled from "styled-components";

const BudgetContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
  font-family: sans-serif;
`;

const BudgetTitle = styled.h2`
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  padding: 8px;
  width: 100%;
  max-width: 250px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1rem;
  
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  background: white;
  border: 1px solid black;
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
  margin-left: 10px;

  &:hover {
    background: #ddd;
  }

  @media (max-width: 768px) {
    margin-top: 5px;
  }
`;

const BudgetItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  align-items: center;
  background: #eef5f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  margin: 0;
`;

const ContactInfo = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
`;

const Services = styled.div`
  text-align: left;
  font-size: 1rem;
`;

const TotalPrice = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
`;


const BudgetList = ({ budgets, servicesDetails }: { budgets: any[]; servicesDetails: { name: string, pages?: number, languages?: number }[] }) => {
  const [sortedBudgets, setSortedBudgets] = useState([...budgets]);
  const [sortType, setSortType] = useState<"name" | "date" | "default">("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSortedBudgets([...budgets]);
  }, [budgets]);

  const sortByName = () => {
    setSortType("name");
    const sorted = [...budgets].sort((a, b) => a.name.localeCompare(b.name));
    setSortedBudgets(sorted);
  };

  const sortByDate = () => {
    setSortType("date");
    const sorted = [...budgets].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setSortedBudgets(sorted);
  };

  const resetOrder = () => {
    setSortType("default");
    setSortedBudgets([...budgets]);
  };

  const filteredBudgets = sortedBudgets.filter((budget) =>
    budget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BudgetContainer>
      <BudgetTitle>Pressupostos en curs:</BudgetTitle>

      <ButtonsContainer>
        <SearchInput
          type="text"
          placeholder="Buscar pressupost..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <Button onClick={sortByName}>Ordenar per nom</Button>
          <Button onClick={sortByDate}>Ordenar per data</Button>
          <Button onClick={resetOrder}>Reiniciar ordre</Button>
        </div>
      </ButtonsContainer>

      {filteredBudgets.length === 0 ? (
        <p>No hi ha pressupostos disponibles</p>
      ) : (
        filteredBudgets.map((budget, index) => (
          <BudgetItem key={index}>
            <NameSection>
              <Name>{budget.name || "Nom desconegut"}</Name>
              <ContactInfo>{budget.email || "Sense email"}</ContactInfo>
              <ContactInfo>{budget.phone || "Sense telèfon"}</ContactInfo>
            </NameSection>

            <Services>
              <strong>Serveis contractats:</strong>
              <ul>
                {Array.isArray(budget.services) ? (
                  budget.services.map((service, idx) => {
                    if (service.includes("Web")) {
                      const details = servicesDetails.find(s => s.name === "Web");
                      if (details) {
                        return (
                          <li key={idx}>
                            Web ({details.pages} pàgines, {details.languages} llenguatges)
                          </li>
                        );
                      }
                      return <li key={idx}>{service}</li>;
                    }
                    return <li key={idx}>{service}</li>;
                  })
                ) : (
                  <p>No hi ha serveis seleccionats</p>
                )}
              </ul>
            </Services>

            <TotalPrice>
              Total:<br /> {budget.totalPrice !== undefined ? `${budget.totalPrice}€` : "0€"}
            </TotalPrice>
          </BudgetItem>
        ))
      )}
    </BudgetContainer>
  );
};

export default BudgetList;