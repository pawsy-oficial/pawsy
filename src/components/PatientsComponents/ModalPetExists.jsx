import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Camera } from "@phosphor-icons/react";

export function ModalPetExists(props) {
  const [petDetails, setPetDetails] = useState({
    id_pet: "",
    cpf_tutor: ""
  });
  
  const [errorMessage, setErrorMessage] = useState('');  // Para tratamento de erro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };
  
  const handleSubmit = async () => {
    try {
      const jwtTokenClinic = Cookies.get('jwtTokenClinic');
      const responseClinic = await axios.get(import.meta.env.VITE_URL + '/profileClinic', {
        headers: {
          'Authorization': 'Bearer ' + jwtTokenClinic
        }
      });
      
      const id_clinica = responseClinic.data.storedIdClinica;
      
      const response = await axios.post(import.meta.env.VITE_URL + '/integrar-paciente-clinica', {
        ...petDetails,
        id_clinica
      });
      
      if (response.data.message === "Pet-paciente integrado com sucesso!") {
        props.setOpen(false);
      } else {
        setErrorMessage(response.data.error);  // Atualiza a mensagem de erro
      }
    } catch (error) {
      setErrorMessage("Erro ao integrar o pet.");  // Mensagem genérica
      console.error("Error integrating pet:", error);
    }
  };

  if(props.isOpen) {
    return(
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
        <div className="flex  items-center fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white p-16 rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center justify-center w-40 h-40 border border-primary bg-primary/10 rounded-full">
              <label htmlFor="photo">
                <Camera size={42} color="#22B77E"/>
              </label>
            </div>
            <span className="text-center pt-3 text-lg">{}</span>
          </div>
          <input type="file" id="photo" className="invisible w-1 h-2"/>
          <div className="pl-6">
            <p className="pb-1 text-base font-normal">Número de identidade (pet):</p>
            <input 
              type="text" 
              name="id_pet" 
              className="border-b-2 w-64" 
              placeholder="ex.: #0000" 
              value={petDetails.id_pet}
              onChange={handleChange}
            />
            <p className="pt-4 pb-1 text-base font-normal">CPF tutor:</p>
            <input 
              type="text" 
              name="cpf_tutor" 
              className="border-b-2 w-64" 
              placeholder="ex.: 123.456.789-00" 
              value={petDetails.cpf_tutor}
              onChange={handleChange}
            />
            <div className="pt-8 w-full flex justify-end gap-6">
              <button onClick={handleSubmit} type="" className="px-3 bg-[#04AD34] rounded-lg p-1">
                <p className="text-sm">Adicionar</p>
              </button>
              <button onClick={() => props.setOpen(!props.isOpen)} type="" className="px-3 bg-[#DC3545] rounded-lg p-1">
                <p className="text-sm">Cancelar</p> 
              </button>
            </div>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}  {/* Mostra mensagem de erro se houver */}
          </div>
        </div>
      </div>
    )
  }
}
