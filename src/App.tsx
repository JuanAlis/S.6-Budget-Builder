import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ServiceList from "./components/ServiceList/ServiceList";
import TotalPrice from "./components/Total/TotalPrice";
import RequestForm from "./components/Budgets/RequestForm";
import BudgetList from "./components/Budgets/BudgetList";
import Welcome from "./components/pages/Welcome";
import styled from "styled-components";

// Estilos del botón de compartir (sin cambios)
const ShareButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  font-family: sans-serif;


  &:hover {
    background: #0056b3;
  }
`;

// Función para obtener budgets desde la URL
const getBudgetsFromURL = (): any[] => {
  const params = new URLSearchParams(window.location.search);
  const stored = params.get("budgets");
  if (stored) {
    try {
      return JSON.parse(decodeURIComponent(stored));
    } catch (err) {
      console.error("Error al parsear budgets:", err);
      return [];
    }
  }
  return [];
};

const CalculatorPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Inicializamos budgets una sola vez al montar el componente
  const [budgets, setBudgets] = useState<any[]>(getBudgetsFromURL());
  const [total, setTotal] = useState(Number(searchParams.get("total")) || 0);
  const [isAnnual, setIsAnnual] = useState(searchParams.get("isAnnual") === "true");
  const [selectedServices, setSelectedServices] = useState<string[]>(
    searchParams.get("services")?.split(",") || []
  );
  const [servicesDetails, setServicesDetails] = useState<{ name: string, pages?: number, languages?: number }[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Determinar si estamos en modo "shared"
  const isShared = searchParams.get("shared") === "true";

  // ★ Efecto de rehidratación de budgets: se ejecuta solo una vez (array vacío de dependencias)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = params.get("budgets");
    if (stored) {
      try {
        const parsed = JSON.parse(decodeURIComponent(stored));
        setBudgets(parsed);
      } catch (err) {
        console.error("Error al actualizar budgets desde la URL:", err);
      }
    }
  }, []);

  // Recalcular el total según los servicios seleccionados
  useEffect(() => {
    let calculatedTotal = 0;
    selectedServices.forEach(service => {
      if (service.includes("Web")) {
        const match = service.match(/\d+/g);
        const numPages = match ? parseInt(match[0]) : 1;
        const numLanguages = match ? parseInt(match[1]) : 1;
        const webBasePrice = 500;
        const extrasPrice = (numPages + numLanguages) * 30;
        const totalWebWithoutDiscount = webBasePrice + extrasPrice;
        const totalWebPrice = isAnnual ? totalWebWithoutDiscount * 0.8 : totalWebWithoutDiscount;
        calculatedTotal += totalWebPrice;
      } else if (service === "Seo") {
        const basePriceSeo = isAnnual ? 300 * 0.8 : 300;
        calculatedTotal += basePriceSeo;
      } else if (service === "Ads") {
        const basePriceAds = isAnnual ? 400 * 0.8 : 400;
        calculatedTotal += basePriceAds;
      }
    });
    setTotal(calculatedTotal);
  }, [selectedServices, isAnnual]);

  // Sincronizar la URL con el estado actual, sin incluir searchParams en las dependencias
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedServices.length > 0) params.set("services", selectedServices.join(","));
    params.set("total", total.toString());
    params.set("isAnnual", isAnnual.toString());
    if (isShared) {
      params.set("shared", "true");
    }
    if (budgets.length > 0) {
      params.set("budgets", encodeURIComponent(JSON.stringify(budgets)));
    }
    setSearchParams(params);
  }, [selectedServices, total, isAnnual, budgets, isShared, setSearchParams]);

  const handleTotalChange = (amount: number) => {
    setTotal(prev => prev + amount);
  };

  const handleNewBudget = (formData: any) => {
    const newBudget = {
      name: formData.name || "Nom desconegut",
      email: formData.email || "Sense email",
      phone: formData.phone || "Sense telèfon",
      services: selectedServices.length > 0 ? selectedServices : ["Cap servei seleccionat"],
      totalPrice: total !== undefined ? total : 0,
    };

    setBudgets([...budgets, newBudget]);
  };

  // Función para copiar la URL compartida (forzando shared=true)
  const copyToClipboard = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("shared", "true");
    const url = window.location.origin + window.location.pathname + "?" + params.toString();
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      setSearchParams(params);
    });
  };

  // Si estamos en modo compartido, renderizamos solo los presupuestos
  if (isShared) {
    return (
      <Layout isAnnual={isAnnual} setIsAnnual={setIsAnnual}>
        <BudgetList budgets={budgets} servicesDetails={servicesDetails} />
      </Layout>
    );
  }

  // Renderización normal (calculadora completa)
  return (
    <Layout isAnnual={isAnnual} setIsAnnual={setIsAnnual}>
      <ServiceList 
        isAnnual={isAnnual} 
        onTotalChange={handleTotalChange} 
        selectedServices={selectedServices} 
        setSelectedServices={setSelectedServices} 
        updateServiceDetails={(name, pages, languages) => {
          setServicesDetails(prev => {
            const existing = prev.find(s => s.name === name);
            if (existing) {
              return prev.map(s =>
                s.name === name ? { ...s, pages, languages } : s
              );
            } else {
              return [...prev, { name, pages, languages }];
            }
          });
        }} 
      />
      <TotalPrice total={total} />
      <RequestForm onSubmit={handleNewBudget} selectedServices={selectedServices} />
      <BudgetList budgets={budgets} servicesDetails={servicesDetails} />

      <div style={{ textAlign: "center", marginTop: "20px", fontFamily: "sans-serif" }}>
        <ShareButton onClick={copyToClipboard}>Copiar Presupuesto</ShareButton>
        {copySuccess && <p style={{ color: "green" }}>¡Enlace copiado!</p>}
      </div>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
