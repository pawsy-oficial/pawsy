import { useLocation, useNavigate } from "react-router-dom"
import { NavbarTutor } from "../../components/Navbar"
import { Header } from "../../components/header/Header"
import { CaretLeft } from "@phosphor-icons/react"
import CardsVetCloser from "../../components/cardsAndBoxes/cardClinicCloser"
import useCheckedPet from "../../hook/useCheckedPet"
import { useEffect, useState } from "react"
import axios from "axios"

export default function SearchResult() {
    const [ clinics, setClinics ] = useState([])
    useCheckedPet()
    const location = useLocation()
    const { clinicName } = location.state
    const navigate = useNavigate()

    function formatString(string){
        const lowerCase = string.toLowerCase()
        const stringJoin = lowerCase.replace(" ", "")

        return stringJoin
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}/pesquisa?clinicName=${clinicName}`)
        .then(res => {
            console.log(res);
            setClinics(res.data.result)
        })
        .catch(err => console.log(err))
    },[clinicName])

    return (
        <main className="flex min-h-screen">

            <NavbarTutor page={0} />

            <section className="flex-1">
                <Header userType={"tutor"} />

                <main className={`lg:pl-10 lg:pr-16 px-6 py-8 flex flex-col gap-5`}>
                    <a
                        className="flex items-center text-sm cursor-pointer group"
                        onClick={() => navigate(-1)}
                        title="Voltar"
                    >
                        <CaretLeft className="group-hover:text-primary" />
                        Voltar
                    </a>
                    <p className="font-lato text-lg">
                        Aqui estão os resultados para <span className="text-primary">{clinicName}</span>:
                    </p>
                    <section className="flex gap-5">
                        {
                            clinics.length == 0 
                                ? <p className="text-sm text-zinc-400">OPS! A clínica que você procura não esta cadastrada na Pawsy</p> 
                                : (
                                    clinics.map(clinic => {
                                        return(
                                            <CardsVetCloser 
                                                img={clinic.url_imagem}
                                                nameClinic={clinic.nm_clinica} 
                                                clinicOpenOrClose={clinic.status_loja} 
                                                address={`${clinic.nm_rua} ${clinic.num_residencia}`} 
                                                distanceFromTheClinic={"1.5 km"} 
                                                assessment={"4,0"} 
                                            />
                                        )
                                })
                            )
                        }
                    </section>
                </main>
            </section>
        </main>
    )
}
