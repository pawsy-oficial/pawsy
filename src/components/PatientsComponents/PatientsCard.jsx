import { useState } from 'react';
import gato from '../../img/gato.jpg';
import { ModalSeePatient } from './ModalSeePatient';

export function PatientsCard(props){
  const [see, setSee] = useState(false)

  return(
    <button onClick={() => setSee(!see)} className="" >
      <ModalSeePatient See={see} setSee={setSee} pet={props.pet} donos={props.donosP} id={props.id}/>
      <div className="flex w-full rounded-lg bg-[#F5FFFE] p-2 gap-6 items-center hover:bg-[#c7dcda]">
        <div className="w-10 h-10 flex rounded-full border-2 border-primary overflow-hidden">
            <img
                src={gato}
                alt={gato}
                className="object-cover w-full h-full"
            />
        </div>
        <p className="text-lg">
          {props.pet}
        </p>
        <p className="text-lg">
          {props.donosP}
        </p>
        <p className="text-lg">
          Id: {props.id}
        </p>
      </div>
    </button>
  )
}