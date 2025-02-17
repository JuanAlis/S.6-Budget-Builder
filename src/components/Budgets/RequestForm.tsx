import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
  font-family: sans-serif;
  

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
`;

const Title = styled.h2`
  margin-bottom: 15px;
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: 0.3s;
  

  &:hover {
    background: #45a049;
  }
`;

/*const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;*/



const RequestForm = ({ onSubmit, selectedServices }: { 
  onSubmit: (data: any) => void; 
  selectedServices: string[]; 
}) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("📌 Enviando formulario con servicios seleccionados:", selectedServices);
    
    const newFormData = {
      ...formData,
      services: selectedServices.length > 0 ? selectedServices : ["Cap servei seleccionat"],
    };

    onSubmit(newFormData);
  };

  return (
    <FormContainer>
      <Title>Demanar pressupost</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
        <Input type="tel" name="phone" placeholder="Telèfon" value={formData.phone} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <SubmitButton type="submit">Sol·licitar pressupost ➝</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default RequestForm;
