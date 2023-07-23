import { X } from "@phosphor-icons/react"

export function ModalPetNotExists(props){
  const dogsRace = [
    "BullDog",
    "Pitbull",
    "Beagle",
    "Poodle",
    "Husky",
    "Dachshund",
    "Pug",
    "Shih Tzu",
    "Pastor Alemão",
    "Rottweiler",
    "Labrador",
    "Pinscher",
    "Golden Retriever",
    "Maltes",
    "Chihuahua",
    "SRD",
];


  if(props.isNot){
    return(
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
          <div className="fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-lg">
          <div className='flex justify-end pr-1 pt-1'><button onClick={() => props.setNot(!props.isNot)}><X size={24}/></button></div>
          <form className="flex">
            <div className="flex flex-col gap-2 p-4">
              <p className="pb-1 text-base font-normal">Nome do pet:</p>
              <input type="text" name="" id="" className="border-b-2 w-64 focus-within:border-primary" placeholder="ex.: Marinho"/>
              <p className="pb-1 text-base font-normal">Espécie:</p>
              <select>
                {dogsRace.map((race, index) => (
                    <option key={index} value={race}>
                        {race}
                    </option>
                ))}
            </select>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <p className="pb-1 text-base font-normal">Nome tutor:</p>
              <input type="text" name="" id="" className="border-b-2 w-64 focus-within:border-primary" placeholder="ex.: Marcelo Dantas"/>
            </div>
          </form>
          </div>
      </div>
    )
  }
}