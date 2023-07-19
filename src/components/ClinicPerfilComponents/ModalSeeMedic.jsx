import { X } from '@phosphor-icons/react';
import pessoa from '../../img/person1.png';

export function ModalSeeMedic(props){
  const detailsMedic = ["Carlos Santana", {pessoa}, '07/01/2023', 'Cardiologista', 'SP 21909']

  if(props.isSee){
    return(
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
        <div className=" fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-lg">
          <div className='flex justify-end pr-1 pt-1'><button onClick={() => props.setSee(!props.isSee)}><X size={28}/></button></div>
          <div className='flex p-6 items-center'>
          <div>
              <img src={pessoa} alt={pessoa} className="flex items-center justify-center w-44 h-44 border border-primary rounded-full" />
          </div>
          <div className="flex flex-col pl-6 gap-4">
            <h1 className="text-xl font-bold pb-3">{detailsMedic[0]}</h1>
            <p className="text-normal"><span className='font-semibold'>Data de inscrição:</span> {detailsMedic[2]}</p>
            <p className="text-normal"><span className='font-semibold'>Especialidade:</span> {detailsMedic[3]}</p>
            <p className="text-normal"><span className='font-semibold'>CRMV:</span> {detailsMedic[4]}</p>
              <div className="flex justify-end pt-6">
                <button onClick={() => props.setSee(!props.isSee)} type="" className="px-3 bg-[#DC3545] rounded-lg p-1">
                      <p className="text-sm">Apagar</p> 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}