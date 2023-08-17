import style from "./ModalDeletePost.module.css";

export default function ModalDeletePost({isOpen, setOpen}) {
    if (isOpen) {
        return (
          <div className={style.background}>
            <div className={style.modal}>
              <h2 className="text-2xl font-bold">AVISO</h2>
              <div className="flex pt-6 flex-col gap-1">
                <p className="text-sm">Antes de excluir o anúncio, certifique-se de que não precisa mais dele. Uma vez excluído, o item não poderá ser recuperado.</p>
              </div>
              <div className="flex flex-row justify-end pt-6 gap-6">
                <button
                  onClick={() => setOpen(!isOpen)}
                  className="flex items-center bg-[#04AD34] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
                >
                  confirmar
                </button>
                <button
                  className="flex items-center bg-[#DC3545] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
                >
                  cancelar
                </button>
              </div>
            </div>
          </div>
        );
      }
}