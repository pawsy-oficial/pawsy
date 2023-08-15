import style from "./ModalVermifuge.module.css";
import { FloppyDisk } from "@phosphor-icons/react";

export function ModalVermifuge({ isOpenVermifuge, setOpenVermifuge }) {
  if (isOpenVermifuge) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <h2 className="text-2xl font-semibold">Nome do vermífugo</h2>
          <div className="flex pt-6 flex-col gap-1">
            <p className="text-xs">Proteção</p>
            <input
              type="text"
              className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary"
            />
          </div>
          <div className="flex flex-row place-content-end pt-6">
            <button
              onClick={() => setOpenVermifuge(!isOpenVermifuge)}
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
