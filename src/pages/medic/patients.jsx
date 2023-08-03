import { useLocation } from "react-router-dom"
import { HeaderMedic } from "../../components/HeaderMedic"

export default function PatientsForMedic(){
    const location = useLocation()
    const { informacoes } = location.state

    return(
        <>
            <header>
                <HeaderMedic/>
            </header>
            <section className="mt-16 flex justify-center items-center bg-[#F5F7FB]">
                <div className="p-6 bg-white rounded-lg flex flex-col">
                    <img src={informacoes.img} className="w-44 rounded-full border border-[#22B77E]"/>
                </div>
            </section>
        </>
    )
}