import style from "./ModalVaccine.module.css";
import { FloppyDisk } from "@phosphor-icons/react";

export function ModalVaccine({ isOpen, setOpen }) {
  if (isOpen) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <h2 className="text-2xl font-semibold">Registrar nova dose</h2>
          <div className="flex pt-6 flex-col gap-1">
            <p className="text-xs">Proteção</p>
            <select
              name=""
              id=""
              className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border hover:border-primary"
            >
              <option value="">Antirrábica</option>
              <option value="">Viratec 10 CVL</option>
            </select>
          </div>
          <div className="flex flex-row place-content-end pt-6">
            <button
              onClick={() => setOpen(!isOpen)}
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
