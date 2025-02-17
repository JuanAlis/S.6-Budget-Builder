import ServiceCard from "../ServiceCard/ServiceCard";

const services = [
  { name: "Seo", description: "Programació d'una web responsive completa", basePrice: 300 },
  { name: "Ads", description: "Programació d'una web responsive completa", basePrice: 400 },
  { name: "Web", description: "Programació d'una web responsive completa", basePrice: 500 },
];

const ServiceList = ({ isAnnual, onTotalChange, selectedServices, setSelectedServices, updateServiceDetails }: { 
  isAnnual: boolean; 
  onTotalChange: (total: number) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  updateServiceDetails: (name: string, pages: number, languages: number) => void; // Pasamos esta función
}) => {
  return (
    <div>
      {services.map((service) => (
        <ServiceCard
          key={service.name}
          name={service.name}
          description={service.description}
          basePrice={service.basePrice}
          isAnnual={isAnnual}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          onTotalChange={onTotalChange}
          updateServiceDetails={updateServiceDetails} // Añadimos la función updateServiceDetails
        />
      ))}
    </div>
  );
};

export default ServiceList;
