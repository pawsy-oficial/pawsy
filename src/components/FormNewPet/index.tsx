import React, { FormEvent, useState } from "react"
import "./index.css"
import dog from "../../img/dog.jpg"
import cat from "../../img/cat.jpg"
import { GenderFemale, GenderMale } from "@phosphor-icons/react"
interface IFromNewPet {
    isFirstAccess: boolean
}

const FormNewPet = (props: IFromNewPet) => {
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

    const handleAnimalChange = (animalType: "dog" | "cat") => {
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

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data = new FormData(e.target);
        console.log(Object.fromEntries(data))
        // {
        //     name: "Luna",
        //     race: "Beagle",
        //     coat: "Curto",
        //     birthday: "2023-01-17"
        // }
    }
            return (
        <form onSubmit={handleSubmit}>
            {/* <label htmlFor="name">Nome</label> */}
            <h1 id="new-pet">Novo Pet</h1>
            
            <div id="animals">
                <input type="radio" name="pet" id="dog" checked={animal === "dog"} onChange={() => handleAnimalChange('dog')} radioGroup="animal" />
                <label htmlFor="dog" className="pets">
                    <img src={dog} alt="" />
                    <p>Cachorro</p>
                </label>
                <input type="radio" name="pet" id="cat" checked={animal === "cat"} onChange={() => handleAnimalChange('cat')} radioGroup="animal" />
                <label htmlFor="cat" className="pets">
                    <img  src={cat} alt="" />
                    <p>Gato</p>
                </label>
            </div>
            
            <div className="flex justify-center w-full" style={{gap: "50px"}}>
                <button id="male" type="submit">Macho <GenderMale color= "#8FB5FF" size="24px"/></button>
                <button id="female" type="submit">Fêmea <GenderFemale color= "#FF8FCB" size="24px"/></button>
            </div>

            <input id="inputs" name="name" type="text" placeholder="Nome*" required />
            {/* <label htmlFor="race">Raça</label> */}
            <select id="races" required name="race">
                <option value="" disabled selected defaultValue="">Raça</option>
                {getBreeds().map((breed, index) => (
                    <option key={index}>{breed}</option>
                ))}
            </select>
            {/* <label htmlFor="coat">Pelagem</label> */}
            <select id="coat" required name="coat">
                <option value="" disabled selected defaultValue="">Pelo</option>
                {
                    coat.map(dog => (
                        <option key={dog}>{dog}</option>
                    ))
                }
            </select>
            {/* <label htmlFor="birthday">Data de nascimento</label> */}
            <input type="date" id="inputs" name="birthday" placeholder="Data"/>

            {/* <label htmlFor="weight">Peso</label> */}
            <input type="number" id="weight" placeholder="Peso" required/>

            <textarea id="obs" placeholder="Observação" maxLength={200}/>

            <div id="buttons">
                {!isFirstAccess ? <button id="cancelar">Cancelar</button> : null}
                <button id="adicionar" type="submit">Adicionar</button>
            </div>


        </form>
    )
}

export default FormNewPet