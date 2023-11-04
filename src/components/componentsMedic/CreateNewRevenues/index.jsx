import LogoWaterMark from "../../../img/waterMark.svg";
import { CreateNewMedicines } from "../CreateNewMedicines";
import { PlusCircle, XCircle } from "@phosphor-icons/react";
import { useState } from "react";

export function CreateNewRevenues() {
  const [isComponentVisible, setComponentVisibility] = useState(false);

  const toggleComponent = () => {
    setComponentVisibility(!isComponentVisible);
  };

  return (
    <div className="w-[595px] h-[892px] my-8 mx-auto bg-white border border-primary relative">
      <img
        src={LogoWaterMark}
        alt="marca d'água PAWSY"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex py-6 px-8 w-[593px] h-[110px] bg-[#F5FFFE] text-xs font-bold flex-col justify-between">
        <div className="flex flex-row items-center gap-4">
          <p>Tipo da receita:</p>
          <select
            name=""
            id=""
            className="w-[153px] flex items-center rounded-lg py-1 text-xs font-bold h-[25px] bg-white focus:outline-none"
          >
            <option value="Simples">Simples</option>
            <option value="Controle especial">Controle especial</option>
            <option value="Azul">Azul</option>
            <option value="Amarela">Amarela</option>
            <option value="Branca de talidomida">Branca de talidomida</option>
            <option value="Branca para retinóides">
              Branca para retinóides
            </option>
          </select>
        </div>

        <div className="flex flex-row items-center gap-4 text-zinc-900">
          <p>Data de validade:</p> <input type="date" placeholder="" />
        </div>
      </div>

      <section className="flex flex-col gap-6 py-8 z-10">
        <CreateNewMedicines />
      </section>

      {/* <div className="flex justify-center flex-col items-center gap-6">
        {isComponentVisible && <CreateNewMedicines />}
        <button
          className="flex z-10 w-fit items-center justify-center text-lg font-semibold cursor-pointer text-primary gap-3"
          onClick={toggleComponent}
        >
          <PlusCircle size={20} />
          adicionar
        </button>
      </div> */}

      <div className="flex justify-center flex-col items-center gap-6">
        {isComponentVisible ? (
          <div className="flex justify-center flex-col items-center gap-6">
            <CreateNewMedicines />
            <button
              className="flex z-10 w-fit items-center justify-center text-lg font-semibold cursor-pointer text-red-500 gap-3"
              onClick={toggleComponent}
            >
              <XCircle size={20} />
              cancelar
            </button>
          </div>
        ) : (
          <button
            className="flex z-10 w-fit items-center justify-center text-lg font-semibold cursor-pointer text-primary gap-3"
            onClick={toggleComponent}
          >
            <PlusCircle size={20} />
            adicionar
          </button>
        )}
      </div>

      <div className="w-44 h-[1px] my-20 mx-auto bg-black">
        <div className="flex flex-col items-center">
          <p className="text-xs">Drª Vanessa Santos</p>
          <p className="text-[9px]">CRMV: 10.000</p>
        </div>
      </div>

      <div className="w-[595px] h-8 bg-primary flex justify-center items-center absolute bottom-0">
        <img src="src/img/logo.png" alt="" className="w-16" />
      </div>
    </div>
  );
}
