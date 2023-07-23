import { useState } from 'react';
import gato from '../../img/gato.jpg';
import { X } from '@phosphor-icons/react';

export function ModalSeePatient(props){
  if(props.See){
    return(
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
        <div className="fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-lg">
          <div className='flex justify-end pr-1 pt-1'><button onClick={() => props.setSee(!props.See)}><X size={28}/></button></div>
            <div className="p-4 flex">
              <div className="w-36 h-36 flex rounded-full border-2 border-primary overflow-hidden">
                <img
                    src={gato}
                    alt={gato}
                />
              </div>
              <div className="flex flex-col pl-6 gap-4">
              <h1 className="text-xl font-bold pb-3">{props.pet}</h1>
              <p className="text-normal"><span className='font-semibold'>Dono: </span>{props.donos}</p>
              <p className="text-normal"><span className='font-semibold'>Id: </span>{props.id}</p>
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