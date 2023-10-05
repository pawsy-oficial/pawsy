// import FormNewPet from "../../components/FormNewPet";
import { useState, lazy, Suspense, useEffect } from "react";


import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
// import RadioGroupMyPets from "../../components/tutor/RadioGroupMyPets";
import { Alert } from "../../components/tutor/Alert";
import FormNewPet from "../../components/forms/FormNewPet";
import { PlusCircle, GenderMale, GenderFemale, CaretDown } from "@phosphor-icons/react";

import useTopToScreen from "../../hook/useTopToScreen";
import { LoadingPaw } from "../../components/loadings/Loading";

import dayjs from "dayjs"
import { useLocation } from "react-router-dom";
import useCheckedPet from "../../hook/useCheckedPet";
import InfoPets from "../../components/tutor/InfoPets";


const RadioGroupMyPets = lazy(() => import("../../components/tutor/RadioGroupMyPets"))


export default function Tutor() {

    const [showPet, setShowPet] = useState(0)
    const [addPet, setAddPet] = useState(true)
    const [firstAccess, setFirstAccess] = useState(false)

    const [stateEdit, setStateEdit] = useState(false)

    useTopToScreen()
    useCheckedPet()
    const { state } = useLocation()
    useEffect(()=>{
        if(state != null){
            if(state.addPet){
                setFirstAccess(true)
                setAddPet(!state.addPet)
            }
        }
    },[state])
    

    return (
        <main className="flex min-h-screen">

            <NavbarTutor page={0} isFirstAccess={firstAccess} />

            <section className="flex-1">
                <Header userType={"tutor"} />

                <main className={`lg:pl-10 lg:pr-16 px-6 py-8 flex flex-col-reverse lg:flex-row gap-5  ${!addPet && "justify-center"}`}>
                    {
                        addPet
                            ? (
                                <>
                                    <InfoPets showPet={showPet} stateEdit={stateEdit} setStateEdit={setStateEdit}/>
                                    <section className="lg:w-64 w-full bg-white px-4 py-2 lg:py-8 rounded-2xl flex flex-col gap-5 h-max">
                                        <SelectMyPet action={setShowPet} titleSelect="Meus pets" navigation={setAddPet}/>

                                        <h3 className="text-2xl font-semibold hidden lg:block">
                                            Meus pets
                                        </h3>

                                        <div className="lg:flex flex-col gap-3 hidden">
                                            <Suspense fallback={<LoadingPaw />}>
                                                <RadioGroupMyPets showPet={setShowPet} edit={stateEdit}/>
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
                            : <FormNewPet addPet={setAddPet} isFirstAccess={firstAccess}/>
                    }

                </main>
            </section>
        </main>
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