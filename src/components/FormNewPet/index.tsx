import React, { FormEvent, useState } from "react"
import "./index.css"
interface IFromNewPet {
    isFirstAccess: boolean
}

const FormNewPet = (props: IFromNewPet) => {
    const { isFirstAccess } = props
    // mock data, this should never go to production like this
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
        "SRD",
    ]

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

    ]

    const coat = [
        "Curto",
        "Médio",
        "Grande",
    ]

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
            
            <div>
                <button id="male" type="submit">Macho</button>
                <button id="female" type="submit">Fêmea</button>
            </div>

            <input id="inputs" name="name" type="text" placeholder="Nome*" required />
            {/* <label htmlFor="race">Raça</label> */}
            <select id="options" required name="race">
                <option value="">Selecione uma Opção</option>
                {
                    dogsRace.map(dog => (
                        <option key={dog}>{dog}</option>
                    ))
                }
            </select>
            {/* <label htmlFor="coat">Pelagem</label> */}
            <select id="coat" required name="coat">
                <option value="" >Selecione uma Opção</option>
                {
                    coat.map(dog => (
                        <option key={dog}>{dog}</option>
                    ))
                }
            </select>
            {/* <label htmlFor="birthday">Data de nascimento</label> */}
            <input type="date" id="inputs" name="birthday" />

            {/* <label htmlFor="weight">Peso</label> */}
            <input id="inputs" placeholder="Peso" />

            <input id="obs" placeholder="Observação"/>

            <div id="buttons">
                {!isFirstAccess ? <button id="cancelar">Cancelar</button> : null}
                <button id="adicionar" type="submit">Adicionar</button>
            </div>


        </form>
    )
}

export default FormNewPet