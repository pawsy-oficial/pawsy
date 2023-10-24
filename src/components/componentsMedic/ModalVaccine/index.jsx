import style from "./ModalVaccine.module.css";
import { FloppyDisk } from "@phosphor-icons/react";
import { useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export function ModalVaccine({ isOpenVaccine, setOpenVaccine, id }) {
  const [vacina, setVacina] = useState("");
	const [retorno, setRetorno] = useState("")
  const jwtTokenMedic = Cookies.get("jwtTokenMedic");
  const data = {
    vacina: vacina,
    id_pet: id,
    id_medic: "1",
    dt_retorno: retorno
  };
  const handleSubmit = async () => {
    try {
      axios
        .post(`${import.meta.env.VITE_URL}/vermifuge`, data, {
          headers: {
            Authorization: "Bearer " + jwtTokenMedic,
          },
        })
        .then((e) => {
          console.log(e);
          setOpenVaccine(!isOpenVaccine)
          setVacina("");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("Erro ao integrar vermifugo: ");
    }
  };
  if (isOpenVaccine) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <h2 className="text-2xl font-semibold">Registrar nova dose</h2>
          <div className="flex pt-6 flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs">Proteção</p>
              <input
                autoFocus
                type="text"
                value={vacina}
                onChange={(e) => setVacina(e.target.value)}
                name="vacina"
                className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary"
              />
              {/* <select
                name=""
                id=""
                className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary focus-visible:outline-none hover:border-primary"
              >
                <option value="">Antirrábica</option>
                <option value="">Viratec 10 CVL</option>
                <option value="">Giárdia</option>
                <option value="">Leishmaniose</option>
                <option value="">Gripe canina</option>
                <option value="">Polivalente</option>
              </select> */}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Data de Retorno</p>
              <input
                value={retorno}
                onChange={e => setRetorno(e.target.value)}
                type="date"
                className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-row place-content-end pt-6">
            <button
              onClick={() => setOpenVaccine(!isOpenVaccine)}
              className="flex items-center bg-[#22937E] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
            >
              <FloppyDisk size={24} />
              SALVAR
            </button>
          </div>
        </div>
      </div>
    );
  }
}
