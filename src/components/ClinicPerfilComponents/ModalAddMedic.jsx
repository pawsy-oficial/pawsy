import { Camera } from "@phosphor-icons/react";

export function ModalAddMedic(props){
  const detailsMedic= ['Thereza Soares','Carlos Roberto']

  if(props.isOpen){
    return(
     <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
        <div className="flex  items-center fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white p-16 rounded-lg">
          <div className="flex flex-col">
            <div class="flex items-center justify-center w-40 h-40 border border-primary bg-primary/10 rounded-full">
              <label for="photo" class="">
                <Camera size={42} color="#22B77E"/>
              </label>
            </div>
              <span className="text-center pt-3 text-lg">{}</span>
          </div>
            <input type="file" name="" id="photo" className="invisible w-1 h-2"/>
          <div className="pl-6">
            <p className="pb-1 text-base font-normal">ID Pawsy:</p>
            <input type="text" name="" id="" className="border-b-2 w-64" placeholder="ex.: #0000"/>
            <p className="pt-4 pb-1 text-base font-normal">CRMV:</p>
            <input type="text" name="" id="" className="border-b-2 w-64" placeholder="ex.: 00000"/>
            <div className="pt-8 w-full flex justify-end gap-6">
              <button onClick={() => props.setOpen(!props.isOpen)} type="" className="px-3 bg-[#04AD34] rounded-lg p-1">
                <p className="text-sm">Adicionar</p>
              </button>
              <button onClick={() => props.setOpen(!props.isOpen)} type="" className="px-3 bg-[#DC3545] rounded-lg p-1">
                <p className="text-sm">Cancelar</p> 
              </button>
            </div>
          </div>
        </div>
      </div>
    )

  }
}