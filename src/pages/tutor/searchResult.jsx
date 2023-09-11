import { useLocation, useNavigate } from "react-router-dom"
import { NavbarTutor } from "../../components/Navbar"
import { Header } from "../../components/header/Header"
import { CaretLeft } from "@phosphor-icons/react"
import CardsVetCloser from "../../components/cardsAndBoxes/cardClinicCloser"
import useCheckedPet from "../../hook/useCheckedPet"


const CLINICS = [
    {
        clinicName: "ZNVet",
        addres: "xxxx",
    },
    {
        clinicName: "ZN Vet Santos",
        addres: "xxxx",
    },
    {
        clinicName: "Canarinho",
        addres: "xxxx",
    },
    {
        clinicName: "Beija-flor",
        addres: "xxxx",
    },
]

export default function SearchResult() {
    useCheckedPet()
    const location = useLocation()
    const { clinicName } = location.state
    const navigate = useNavigate()

    function formatString(string){
        const lowerCase = string.toLowerCase()
        const stringJoin = lowerCase.replace(" ", "")

        return stringJoin
    }

    function searchClinics(){
        const filter = CLINICS.filter(clinic => {
            const searchUser = formatString(clinicName)
            const clinicNameDataBase = formatString(clinic.clinicName)
            return clinicNameDataBase.includes(searchUser)
        })

        return filter.map(result => {
            return (
                <CardsVetCloser 
                    nameClinic={result.clinicName} 
                    clinicOpenOrClose={"Aberto"} 
                    address={"Av. Brg. Faria Lima, 320 - Radio Clube"} 
                    distanceFromTheClinic={"1.5 km"} 
                    assessment={"4,0"} 
                />
            )
        })
    }

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
                            searchClinics()
                        }
                    </section>
                </main>
            </section>
        </main>
    )
}
