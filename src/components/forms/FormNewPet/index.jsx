import { useState } from "react"
import "./index.css"
import dog from "../../../img/dog.jpg"
import cat from "../../../img/cat.jpg"
import { Camera, GenderFemale, GenderMale } from "@phosphor-icons/react"


const FormNewPet = (props) => {
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

    const { isFirstAccess } = props
    const [animal, setAnimal] = useState(""); // estado inicial vazio

    const handleAnimalChange = (animalType) => {
        setAnimal(animalType);
    };

    const getBreeds = () => {
        if (animal === "dog") {
            return dogsRace;
        } else if (animal === "cat") {
            return catsRace; // retorna as raças de gato
        } else {
            return []; // retorna um array vazio se nenhum animal estiver selecionado
        }
    };

    // mock data, this should never go to production like this


    const coat = [
        "Curto",
        "Médio",
        "Grande",
    ];

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        // console.log(Object.fromEntries(data))
        // {
        //     name: "Luna",
        //     race: "Beagle",
        //     coat: "Curto",
        //     birthday: "2023-01-17"
        // }
    }


    return (
        <form onSubmit={handleSubmit} className="p-8 flex flex-col justify-center items-center gap-8 w-[30rem] mx-auto bg-white rounded-lg">
            <h1 className=" text-2xl pt-3 font-bold self-start">Novo Pet</h1>

            <section className="flex flex-col gap-6 w-full">
                <div className="w-32 mx-auto" style={{width: "164px"}}>
                    <input type="file" name="imagePet" id="imagePet" className="hidden" />
                    
                    <label htmlFor="imagePet" className="flex flex-col gap-2 items-center">
                        <div className="w-28 h-28 rounded-full bg-green-400 border-2 border-primary  flex justify-center items-center bg-primary/20">
                            <Camera size={40} color="#22B77E" weight="bold"/>
                        </div>

                        <small className="text-[8px] text-zinc-500 text-center">Formato 1:1, com tamanho máximo de 5MB e nos formatos .png e .jpg</small>
                    </label>

                </div>

                <div id="animals" className="my-5 mx-auto flex gap-16 justify-between">
                    
                    <input type="radio" name="pet" id="dog" className="hidden" checked={animal === "dog"} onChange={() => handleAnimalChange('dog')} radioGroup="animal" />
                    <div className="flex flex-col gap-4">
                        <label htmlFor="dog" className="flex flex-col items-center py-1 px-2 rounded-lg cursor-pointer border border-transparent">
                            <div className="w-16 h-16 rounded-full bg-primary overflow-hidden">
                                <img src={dog} alt="" className="w-full h-full object-cover" />
                            </div>
                            <p>Cachorro</p>
                        </label>

                        <div>
                            <input type="radio" name="gender" id="mal" className="hidden" />
                            <label className="rounded-lg cursor-pointer flex items-center justify-between gap-3 px-4 py-1 border-2 hover:bg-[#bcd2fc]" htmlFor="mal">Macho <GenderMale color="#8FB5FF" size="24px" /></label>
                        </div>

                    </div>
                    
                    <input type="radio" name="pet" id="cat" className="hidden" checked={animal === "cat"} onChange={() => handleAnimalChange('cat')} radioGroup="animal" />
                    <div className="flex flex-col gap-4">
                        <label htmlFor="cat" className="flex flex-col items-center py-1 px-2 rounded-lg cursor-pointer border border-transparent">
                            <div className="w-16 h-16 rounded-full bg-primary overflow-hidden">
                                <img src={cat} alt="" className="w-full h-full object-cover" />
                            </div>
                            <p>Gato</p>
                        </label>

                        <div>
                            <input type="radio" id="fem" name="gender" className="hidden" />
                            <label className="rounded-lg cursor-pointer flex items-center justify-between gap-3 px-4 py-1 border-2 hover:bg-[#fac0de]" htmlFor="fem">Fêmea <GenderFemale color="#FF8FCB" size="24px" /></label>
                        </div>
                    </div>
                </div>

                <input className="p-2 w-full rounded-lg border border-primary bg-[#F5FFFE] " name="name" type="text" placeholder="Nome*" />
                {/* <label htmlFor="race">Raça</label> */}

                <select className="p-2 rounded-lg border border-primary bg-[#F5FFFE]  w-full" name="race">
                    <option value="" disabled selected defaultValue="">Raça</option>
                    {getBreeds().map((breed, index) => (
                        <option key={index}>{breed}</option>
                    ))}
                </select>

                <select className="p-2 rounded-lg border border-primary bg-[#F5FFFE]  w-full" name="coat">
                    <option value="" disabled selected defaultValue="">Pelo</option>
                    {
                        coat.map(dog => (
                            <option key={dog}>{dog}</option>
                        ))
                    }
                </select>

                <input 
                    type="date"
                    className="p-2 w-full rounded-lg border border-primary bg-[#F5FFFE] " 
                    name="birthday" 
                    placeholder="Data"
                    max={"2023-08-03"}
                    required
                />

                <input type="number" className="p-2 w-full rounded-lg border border-primary bg-[#F5FFFE] " placeholder="Peso" />

                <textarea id="obs" className="p-4 justify-between rounded-lg border border-primary bg-[#F5FFFE] mt-4 w-full h-36 resize-none" placeholder="Observação" maxLength={200} />

            </section>

            <div className="w-full flex justify-around">
                {
                    !isFirstAccess && 
                        <button  
                            className="bg-red-500 text-white py-1 px-6 rounded-lg cursor-pointer hover:bg-red-600" 
                            onClick={() => { props.addPet(true) }}
                        >
                            Cancelar
                        </button>
                }
                <button 
                    className="bg-green-500 text-white py-1 px-6 rounded-lg cursor-pointer hover:bg-green-600" 
                    type="submit"
                >
                    Adicionar
                </button>
            </div>
        </form>
    )
}

export default FormNewPet