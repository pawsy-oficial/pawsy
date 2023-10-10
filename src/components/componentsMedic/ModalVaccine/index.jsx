import style from "./ModalVaccine.module.css";
import { FloppyDisk } from "@phosphor-icons/react";

export function ModalVaccine({ isOpenVaccine, setOpenVaccine }) {
  if (isOpenVaccine) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <h2 className="text-2xl font-semibold">Registrar nova dose</h2>
          <div className="flex pt-6 flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs">Proteção</p>
              <select
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
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Data de Retorno</p>
              <input
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
