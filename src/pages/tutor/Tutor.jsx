// import FormNewPet from "../../components/FormNewPet";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import RadioGroupMyPets from "../../components/tutor/RadioGroupMyPets";
import { useState } from "react";
import { Alert } from "../../components/tutor/Alert";
import FormNewPet from "../../components/FormNewPet"; 
import { PlusCircle, GenderMale, GenderFemale } from "@phosphor-icons/react";

export default function Tutor() {

    const [showPet, setShowPet] = useState(0)
    const [addPet, setAddPet] = useState(true)

    return (
        <main className="flex min-h-screen">
            <NavbarTutor page={0} />
            <section className="flex-1">
                <Header />

                <main className={`pl-10 pr-16 py-8 flex gap-5 ${!addPet && "justify-center"}`}>
                    {
                        addPet 
                        ? (
                            <>
                                <ProfileTutor showPet={showPet}/>
                                <section className="w-64 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5 h-max">
                                    <h3 className="text-2xl font-semibold">
                                        Meus pets
                                    </h3>

                                    <div className="flex flex-col gap-3">
                                        <RadioGroupMyPets showPet={setShowPet} />
                                    </div>

                                    <div 
                                        className="flex gap-4 mx-auto mt-4 cursor-pointer"
                                        onClick={()=>{
                                            setAddPet(false)
                                        }}
                                    >
                                        <PlusCircle size={24} weight="bold" className="fill-primary" />
                                        <span className="text-primary">Adicionar</span>
                                    </div>
                                </section>
                            </>
                        ) 
                        : <FormNewPet addPet={setAddPet}/>
                    }

                </main>
            </section>
        </main>
    )
}

import caramelo from '../../img/caramelo.webp'
import oreo from '../../img/oreo.jpg'
import flor from '../../img/flor.jpg'
import pantera from '../../img/pantera.jpg'

function ProfileTutor({showPet}) {
    const pets =
        [
            { name: "caramelo", image: caramelo, status: false, id: "0001", birthday: "2022-05-05", breed: "Sem raça definida", gender: "mas", observations: "Meu Caramelo é territorial e protetor, mas carinhoso e brincalhão. Avista com latidos e rosnados, mas uma carícia ou brincadeira o acalma. Adora correr atrás de brinquedos e é muito inteligente. Cuido com amor e atenção, recebendo amor e alegria em troca." },
            { name: "oreo", image: oreo, status: true, id: "0002", birthday: "2022-05-03", breed: "Husky siberiano", gender: "mas", observations: "Oreo é um verdadeiro artista do uivo! Seus vocais noturnos podem até incomodar os vizinhos, mas não há como negar que ele sabe como expressar sua paixão pela música... ops, quer dizer, pela vida selvagem!" },
            { name: "flor", image: flor, status: false, id: "0003", birthday: "2022-05-06", breed: "persa", gender: "fem", observations: "Não possui observações" },
            { name: "pantera", image: pantera, status: false, id: "0004", birthday: "2022-05-06", breed: "mau egípcio", gender: "fem", observations: "Não possui observações" }
        ]

    const historys =
        [
            { nameClinic: "PetVet", description: "Consulta Veterinária - Acompanhamento de rotina", date: "2023-06-15" },
            { nameClinic: "CliniCão", description: "Banho e Tosa - Serviço completo", date: "2023-06-20" },
            { nameClinic: "VetSaúde", description: "Cirurgia - Castração de gatos", date: "2023-07-01" },
            { nameClinic: "AnimalCare", description: "Consulta Veterinária - Atendimento emergencial", date: "2023-07-10" },
            { nameClinic: "PetHappy", description: "Tratamento Odontológico - Limpeza de tártaro", date: "2023-07-20" }
        ]
    historys.sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <section className="flex-1 bg-white px-6 py-8 rounded-2xl">
            <div className="flex gap-6 mb-6">
                <div className="flex flex-col gap-2 items-center">
                    <div className="w-40 h-40 rounded-full border-4 border-secundary overflow-hidden bg-primary/20">
                        <img src={pets[showPet].image} alt={pets[showPet].name} className="h-full w-full object-cover" />
                    </div>
                    <span
                        className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                    >
                        #{pets[showPet].id}
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-[32px] font-bold uppercase flex gap-4 items-center">
                        {pets[showPet].name}
                        {
                            pets[showPet].gender == "mas" ? <GenderMale size={24} color="#8FB5FF" weight="bold" /> : <GenderFemale size={24} color="#FF8FCB" weight="bold" />
                        }
                        {
                            pets[showPet].status && <Alert />
                        }
                    </h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <span className="font-bold text-lg">Idade: </span>
                            <span>{pets[showPet].birthday}</span>
                        </li>
                        <li>
                            <span className="font-bold text-lg">Raça: </span>
                            <span>{pets[showPet].breed}</span>
                        </li>
                        <li>
                            <span className="font-bold text-lg">Status: </span>
                            <span>{pets[showPet].status ? "Não saudável" : "Saudável"}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <section>
                    <h3 className="text-2xl font-semibold mb-3">Observações</h3>
                    <p className="text-zinc-800 leading-relaxed text-base">
                        {pets[showPet].observations}
                    </p>
                </section>
                <section>
                    <h3 className="text-2xl font-semibold mb-3">Histórico</h3>
                    <div className="flex flex-col gap-4">
                        {
                            historys.map((history, index) => {
                                return (
                                    <div 
                                        className="w-full bg-[#F5FFFE] rounded py-3 px-6 flex justify-between items-center"
                                        key={index}
                                    >
                                        <div className="flex-1">
                                            <strong className="font-bold text-base">{history.nameClinic}</strong>
                                            <p className="text-xs mt-2">
                                                {
                                                    history.description
                                                }
                                            </p>
                                        </div>
                                        <span>
                                            {history.date}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </section>
    )
}