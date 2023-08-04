import { useLocation, useNavigate } from "react-router-dom"
import { NavbarTutor } from "../../components/Navbar"
import { Header } from "../../components/header/Header"
import { CaretLeft } from "@phosphor-icons/react"


export default function SearchResult() {

    const location = useLocation()
    const { clinicName } = location.state
    const navigate = useNavigate()

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
                </main>
            </section>
        </main>
    )
}
