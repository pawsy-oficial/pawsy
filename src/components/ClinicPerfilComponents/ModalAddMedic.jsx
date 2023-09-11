import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Camera } from "@phosphor-icons/react";

export function ModalAddMedic(props) {
  const [medicDetails, setMedicDetails] = useState({
    id: "",
    crmv: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicDetails(prevDetails => ({
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
      
      const cd_clinica = responseClinic.data.storedIdClinica;
      
      const response = await axios.post(import.meta.env.VITE_URL + '/integrar-medico-clinica', {
        ...medicDetails,
        cd_clinica
      });
      
      if (response.data.message === "Médico integrado com sucesso!") {
        props.setOpen(false);
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      setErrorMessage("Erro ao integrar médico: " + error.message);
    }
  };

  if(props.isOpen) {
    return(
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
        <div className="flex  items-center fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white p-16 rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center justify-center w-40 h-40 border border-primary bg-primary/10 rounded-full">
              <label htmlFor="photo" className="">
                <Camera size={42} color="#22B77E"/>
              </label>
            </div>
            <span className="text-center pt-3 text-lg">{errorMessage}</span>
          </div>
            <input type="file" name="" id="photo" className="invisible w-1 h-2"/>
          <div className="pl-6">
            <p className="pb-1 text-base font-normal">ID Pawsy:</p>
            <input 
              type="text" 
              name="id"
              className="border-b-2 w-64" 
              placeholder="ex.: #0000"
              value={medicDetails.id}
              onChange={handleChange}
            />
            <p className="pt-4 pb-1 text-base font-normal">CRMV:</p>
            <input 
              type="text" 
              name="crmv"
              className="border-b-2 w-64" 
              placeholder="ex.: 00000"
              value={medicDetails.crmv}
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
          </div>
        </div>
      </div>
    );
  }
}
