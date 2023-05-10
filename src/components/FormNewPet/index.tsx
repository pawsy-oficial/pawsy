import React, { FormEvent, useState } from "react"

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
        "Giraffe",
        "Husky",
        "Dachshund",
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
        <form className="flex-col flex  w-80" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input name="name" type="text" placeholder="Nome" required />
            <label htmlFor="race">Raça</label>
            <select required name="race">
                <option value="" >Selecione uma Opção</option>
                {
                    dogsRace.map(dog => (
                        <option key={dog}>{dog}</option>
                    ))
                }
            </select>
            <label htmlFor="coat">Pelagem</label>
            <select required name="coat">
                <option value="" >Selecione uma Opção</option>
                {
                    coat.map(dog => (
                        <option key={dog}>{dog}</option>
                    ))
                }
            </select>
            <label htmlFor="birthday">Data de nascimento</label>
            <input type="date" id="birthday" name="birthday" />
            <input placeholder="10.00kg" />

            {!isFirstAccess ? <button >Cancelar</button> : null}
            <button type="submit">Salvar</button>

        </form>
    )
}

export default FormNewPet