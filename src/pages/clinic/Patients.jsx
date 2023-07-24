import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { GenderFemale, GenderMale, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { PatientsCard } from "../../components/PatientsComponents/PatientsCard";
import { useState } from "react";
import { ModalPetQuestion } from "../../components/PatientsComponents/ModalPetQuestion";

export default function Patient(){
    const [open, setOpen] = useState(false)

    const donos = ["Davi Silva", "Rodrygo Goes", "Kevin Gomes", "Kauan Viera"]
    const idPatients = [222, 312, 664, 83]
    const NmPatients = ["Flor", "Rabico", "Waguinho", "Zezinho"]
    const qtdPatients = [4]

    return(
        <main className="flex min-h-screen">
            <NavbarClinic page={0}/>

            <section className="flex-1">
                <Header/>

               
            </section>
        </main>
    )
}