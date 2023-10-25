import style from "./ModalVaccine.module.css";
import { FloppyDisk, X } from "@phosphor-icons/react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function ModalVaccine({ isOpenVaccine, setOpenVaccine, id }) {
  const [vacina, setVacina] = useState("");
  const [retorno, setRetorno] = useState("");
  const jwtTokenMedic = Cookies.get("jwtTokenMedic");
  const data = {
    vacina: vacina,
    id_pet: id,
    id_medic: "1",
    id_clinic: "1",
    dt_retorno: retorno,
  };
  const handleSubmit = async () => {
    console.log(vacina);
    try {
      axios
        .post(`${import.meta.env.VITE_URL}/vaccine`, data, {
          headers: {
            Authorization: "Bearer " + jwtTokenMedic,
          },
        })
        .then((e) => {
          console.log(e);
          setOpenVaccine(!isOpenVaccine);
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
          <button
            onClick={() => setOpenVaccine(false)}
            className="absolute left-80"
          >
            <X size={24} color="#22937E" />
          </button>
          <h2 className="text-2xl font-semibold">Registrar nova dose</h2>
          <div className="flex pt-6 flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs">Proteção</p>
              <select
                value={vacina}
                onChange={(e) => setVacina(e.target.value)}
                className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary focus-visible:outline-none hover:border-primary"
              >
                <option value="Antirrábica">Antirrábica</option>
                <option value="Viratec 10 CVL">Viratec 10 CVL</option>
                <option value="Giárdia">Giárdia</option>
                <option value="Leishmaniose">Leishmaniose</option>
                <option value="Gripe canina">Gripe canina</option>
                <option value="Polivalente">Polivalente</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Data de Retorno</p>
              <input
                value={retorno}
                onChange={(e) => {
                  console.log(e.target.value);
                  setRetorno(e.target.value);
                }}
                type="date"
                className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-row place-content-end pt-6">
            <button
              onClick={handleSubmit}
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
