import { GenderFemale, GenderMale, X } from "@phosphor-icons/react"
import { useState } from "react";
import InputMask from 'react-input-mask';

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

  const catsRace = [
  "Persa",
  "Siamês",
  "Maine Coon",
  "Angorá",
  "Sphynx",
  "Ragdoll",
  "Ashera",
  "American Shorthair",
  "Exótico",
  "SRD",
];  

  const animal = [ 
    "Cachorro",
    "Gato",
  ];

  const [selectedGender, setSelectedGender] = useState(null);

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    }

  const [species, setSpecies] = useState(animal[0]);
    
    let races;
    if (species === "Cachorro") {
        races = dogsRace;
    } else if (species === "Gato") {
        races = catsRace;
    }

    const handleSpeciesChange = (e) => {
        setSpecies(e.target.value);
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;


    if(props.isNot){
    return(
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60">
          <div className="fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded-lg">
          <div className='flex justify-end pr-1 pt-1'><button onClick={() => props.setNot(!props.isNot)}><X size={24}/></button></div>
          <form className="flex">
            <div className="flex flex-col gap-2 p-4">
              <p className="pb-1 text-base font-normal">Nome do pet:</p>
              <input type="text" name="" id="nomePet" className="border-b-2 w-64 focus-within:border-primary" placeholder="ex.: Marinho"/>
                        <p className="pb-1 text-base font-normal">Espécie:</p>
                          <select className="border p-2 bg-[#F5FFFE] rounded-lg" id="" value={species} onChange={handleSpeciesChange}>
                              {animal.map((species, index) => (
                                  <option key={index} value={species}>
                                      {species}
                                  </option>
                              ))}
                          </select>
                        <p className="pb-1 text-base font-normal">Raça:</p>
                          <select className="border p-2 bg-[#F5FFFE] rounded-lg" id="">
                              {races.map((race, index) => (
                                  <option key={index} value={race}>
                                      {race}
                                  </option>
                              ))}
                          </select>
              <p className="pb-1 text-base font-normal">Pelagem:</p>
              <input type="text" name="" id="pelagem" className="border-b-2 w-64 focus-within:border-primary" placeholder="ex.: Curta"/>
              <p className="pb-1 text-base font-normal">Data de nascimento (aproximada):</p>
              <InputMask mask="99/99/9999" placeholder={`ex.: ${formattedDate}`}>
                {(inputProps) => <input {...inputProps} type="text" className="border-b-2 w-64 focus-within:border-primary" id="nascimentoPet" />}
              </InputMask>
              <div className="flex gap-3 mt-5">
                  <input type="radio" name="gender" id="malForm" className="hidden" onChange={() => handleGenderChange('male')} />
                  <label htmlFor="malForm" className={`rounded-lg cursor-pointer flex items-center justify-between gap-3 py-1 px-4 ${selectedGender === 'male' ? 'bg-[#bcd2fc]' : 'bg-[#F5FFFE]'} border-2 border-[#8FB5FF] hover:bg-[#bcd2fc]`}>Macho <GenderMale color="#8FB5FF" size="24px" /></label>

                  <input type="radio" name="gender" id="femForm" className="hidden" onChange={() => handleGenderChange('female')} />
                  <label htmlFor="femForm" className={`rounded-lg cursor-pointer flex items-center justify-between gap-3 py-1 px-4 ${selectedGender === 'female' ? 'bg-[#fac0de]' : 'bg-[#F5FFFE]'} border-2 border-[#FF8FCB] hover:bg-[#fac0de]`}>Fêmea <GenderFemale color="#FF8FCB" size="24px" /></label>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <p className="pb-1 text-base font-normal">Nome tutor:</p>
              <input type="text" name="" id="nomeTutor" className="border-b-2 w-64 focus-within:border-primary" placeholder="ex.: Marcelo"/>
              <p className="pb-1 text-base font-normal">Sobrenome:</p>
              <input type="text" name="" id="sobrenomeTutor" className="border-b-2 w-64 focus-within:border-primary" placeholder="ex.: Dantas"/>
              <p className="pb-1 text-base font-normal">CPF:</p>
              <InputMask mask="999.999.999-99" placeholder="000.000.000-00">
                {(inputProps) => <input {...inputProps} type="text" className="border-b-2 w-64 focus-within:border-primary" id="cpfTutor" />}
              </InputMask>
              <p className="pb-1 text-base font-normal">Data de nascimento:</p>
              <InputMask mask="99/99/9999" placeholder={`ex.: ${formattedDate}`}>
                {(inputProps) => <input {...inputProps} type="text" className="border-b-2 w-64 focus-within:border-primary" id="nascimentoTutor" />}
              </InputMask>

              <button className="bg-[#04AD34] rounded-lg text-white mt-32 p-1 ml-36">
                Adicionar
              </button>
            </div>
          </form>
          </div>
      </div>
    )
  }
}