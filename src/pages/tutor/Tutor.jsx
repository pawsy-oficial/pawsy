// import FormNewPet from "../../components/FormNewPet";
import { useState, lazy, Suspense } from "react";


import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
// import RadioGroupMyPets from "../../components/tutor/RadioGroupMyPets";
import { Alert } from "../../components/tutor/Alert";
import FormNewPet from "../../components/FormNewPet";
import { PlusCircle, GenderMale, GenderFemale, CaretDown } from "@phosphor-icons/react";

import useTopToScreen from "../../hook/useTopToScreen";
import { LoadingPaw } from "../../components/loadings/Loading";

import dayjs from "dayjs"

const RadioGroupMyPets = lazy(() => import("../../components/tutor/RadioGroupMyPets"))


export default function Tutor() {

    const [showPet, setShowPet] = useState(0)
    const [addPet, setAddPet] = useState(true)

    useTopToScreen()

    return (
        <main className="flex min-h-screen">

            <NavbarTutor page={0} />

            <section className="flex-1">
                <Header userType={"tutor"} />

                <main className={`lg:pl-10 lg:pr-16 px-6 py-8 flex flex-col-reverse lg:flex-row gap-5  ${!addPet && "justify-center"}`}>
                    {
                        addPet
                            ? (
                                <>
                                    <ProfileTutor showPet={showPet} />
                                    <section className="lg:w-64 w-full bg-white px-4 py-2 lg:py-8 rounded-2xl flex flex-col gap-5 h-max">
                                        <SelectMyPet action={setShowPet} titleSelect="Meus pets" navigation={setAddPet}/>

                                        <h3 className="text-2xl font-semibold hidden lg:block">
                                            Meus pets
                                        </h3>

                                        <div className="lg:flex flex-col gap-3 hidden">
                                            <Suspense fallback={<LoadingPaw />}>
                                                <RadioGroupMyPets showPet={setShowPet} />
                                            </Suspense>
                                        </div>

                                        <div
                                            className="lg:flex hidden gap-4 mx-auto mt-4 cursor-pointer"
                                            onClick={() => {
                                                setAddPet(false)
                                            }}
                                        >
                                            <PlusCircle size={24} weight="bold" className="fill-primary" />
                                            <span className="text-primary">Adicionar</span>
                                        </div>
                                    </section>
                                </>
                            )
                            : <FormNewPet addPet={setAddPet} />
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



function ProfileTutor({ showPet }) {
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
            <div className="flex gap-6 mb-6 items-center">

                <div className="flex flex-col gap-2 items-center">
                    <div className="w-[90px] h-[90px]  sm:w-40 sm:h-40 rounded-full border-4 border-secundary overflow-hidden bg-primary/20">
                        <img 
                            src={pets[showPet].image}
                            alt={pets[showPet].name} 
                            className="h-full w-full object-cover" 
                            draggable={false}
                        />
                    </div>
                    <span
                        className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                    >
                        #{pets[showPet].id}
                    </span>
                </div>
                <div className="flex flex-col gap-4 self-start">
                    <div className="flex gap-x-4 items-center w-full flex-wrap">
                        <h3 className="lg:text-[32px] text-2xl font-bold uppercase">
                            {pets[showPet].name}
                        </h3>
                        {
                            pets[showPet].gender == "mas" ? <GenderMale size={24} color="#8FB5FF" weight="bold" /> : <GenderFemale size={24} color="#FF8FCB" weight="bold" />
                        }
                        {
                            pets[showPet].status && <Alert />
                        }
                    </div>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <span className="font-bold text-xs sm:text-lg">Idade: </span>
                            <span className="text-sm sm:text-base">{dayjs(pets[showPet].birthday).format("DD/MM/YYYY")}</span>
                        </li>
                        <li>
                            <span className="font-bold text-xs sm:text-lg">Raça: </span>
                            <span className="text-sm sm:text-base">{pets[showPet].breed}</span>
                        </li>
                        <li>
                            <span className="font-bold text-xs sm:text-lg">Status: </span>
                            <span className="text-sm sm:text-base">{pets[showPet].status ? "Não saudável" : "Saudável"}</span>
                        </li>
                    </ul>
                </div>
                
                <section className="max-w-[360px] ml-6 self-start hidden lg:inline-block">
                    <h3 className="text-2xl font-semibold mb-3">Descrição</h3>
                    <p className="text-zinc-800 leading-relaxed text-xs">
                        {pets[showPet].observations}
                    </p>
                </section>
            </div>
            <div className="flex flex-col gap-6">
                <section>
                    <h3 className="text-2xl font-semibold mb-3">Observações</h3>
                    <ul>
                        <li>
                            <span className="font-semibold mr-2">Alergia a medicamentos:</span>
                            <span>Não</span>
                        </li>
                        <li>
                            <span className="font-semibold mr-2">Castrado(a):</span>
                            <span>Não</span>
                        </li>
                        <li>
                            <span className="font-semibold mr-2">Comportamento:</span>
                            <span>Manso</span>
                        </li>
                        <li>
                            <span className="font-semibold mr-2">Tratamento:</span>
                            <span>Não</span>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3 className="text-2xl font-semibold mb-3">Histórico</h3>
                    <div className="flex flex-col gap-4">
                        {
                            historys.map((history, index) => {
                                return (
                                    <div
                                        className="w-full bg-[#F5FFFE] rounded py-3 px-6 flex gap-4 justify-between items-center"
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
                                            {dayjs(history.date).format("DD/MM/YYYY")}
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


function SelectMyPet({ action, titleSelect, navigation }) {
    const [active, setActive] = useState(false)

    return (
        <>
            <button
                className="flex lg:hidden justify-between items-center "
                onClick={() => setActive(true)}
            >
                <span className="text-2xl font-semibold">{titleSelect}</span>
                <CaretDown weight="bold" size={24} className={`${active && "rotate-180"} transition-all`} />
            </button>

            {
                active &&
                <section
                    onClick={(e) => {
                        (e.target.tagName === "SECTION" || e.target.type === "radio") && setActive(false)
                    }}
                    className="bg-primary/20 absolute inset-0 h-screen"
                >
                    <div className="mx-6 sticky top-32 p-2 rounded-lg bg-white">
                        <h3 className="text-2xl font-semibold mb-4">{titleSelect}</h3>

                        <div className="flex flex-col">
                            {/* only group input type radio */}
                            <RadioGroupMyPets showPet={action} />

                            <div
                                className="flex gap-4 mx-auto mt-4 cursor-pointer"
                                onClick={() => {
                                    navigation(false)
                                }}
                            >
                                <PlusCircle size={24} weight="bold" className="fill-primary" />
                                <span className="text-primary select-none">Adicionar</span>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}