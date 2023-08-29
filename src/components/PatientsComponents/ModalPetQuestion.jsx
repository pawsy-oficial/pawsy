import { X } from "@phosphor-icons/react"
import { useState } from "react"
import { ModalPetExists } from "./ModalPetExists"
import { ModalPetNotExists } from "./ModalPetNotExists"


export function ModalPetQuestion(props){
  const [not, setNot] = useState(false)
  const [yes, setYes] = useState(false)

  if(props.isOpen){
    return(
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
        <div className="fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-lg">
        <div className='flex justify-end pr-1 pt-1'><button onClick={() => props.setOpen(!props.isOpen)}><X size={24}/></button></div>
            <div className="p-4">
              <h1 className="text-lg">O pet já possui cadastro na Pawsy?</h1>
            </div>
            <div className="flex gap-5 justify-center mb-4">
              <ModalPetNotExists isNot={not} setNot={setNot}/>
              <button onClick={() => setNot(!not)} className="p-1 px-4 rounded-lg bg-[#DC3545]">
                <p className="text-base text-white font-normal">Não</p>
              </button>
              <ModalPetExists isYes={yes} setYes={setYes}/>
              <button onClick={() => setYes(!yes)} className="p-1 px-4 rounded-lg bg-[#04AD34]">
                <p className="text-base text-white font-normal">Sim</p>
              </button>
            </div>
        </div>
      </div>
  )
}
}