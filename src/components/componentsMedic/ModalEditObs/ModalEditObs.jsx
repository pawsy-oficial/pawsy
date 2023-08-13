
export default function ModalEditObs(props){
    if(props.isOpen){
        return(
         <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
            <div className="flex  items-center fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white p-16 rounded-lg">
                <div className="flex flex-col gap-2">
                <h1 className="text-lg font-medium mb-3">
                    Editar    
                </h1> 
                    <div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2"><label>Alergia e medicamentos:</label></div>
                            <div className="flex items-center gap-2"><label>Castrado(a):</label></div>
                            <div className="flex items-center gap-2"><label>Comportamento:</label></div>
                            <div className="flex items-center gap-2"><label>Tratemento:</label></div>
                            <div className="flex gap-4 mt-4">
                                <button onClick={() => props.setOpen(!props.isOpen)} className="p-1 text-center bg-red-600 rounded-lg px-3">
                                    Cancelar
                                </button>
                                <button className="p-1 text-center bg-green-600 rounded-lg px-3">
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )
    
      }
}