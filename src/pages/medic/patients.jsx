import { useLocation } from "react-router-dom"
import { HeaderMedic } from "../../components/HeaderMedic"
import { GenderFemale, GenderMale } from "@phosphor-icons/react";
import CardPatients from "../../components/componentsMedic/CardPatients/CardPatients";
import gato from "../../img/gato.jpg"

export default function PatientsForMedic(){
    const location = useLocation()
    const { informacoes } = location.state

    const petsInfo = [
        "Julinho", "Rodrigo Goes",
        "Balestrin", "Renato Cariani",
        "Tom", "Thomas Shelby"
    ]

    return(
        <>
            <header>
                <HeaderMedic/>
            </header>
            <section className="mt-16 flex justify-center items-center bg-[#F5F7FB]">
                <div className="p-6 bg-white rounded-lg flex flex-col">
                    <div className="flex justify-center">
                        <img src={informacoes.img} className="w-44 rounded-full border-4 border-[#22B77E]"/>
                    </div>
                    <h1 className="text-center text-2xl font-semibold mt-4">
                        {informacoes.nameClinic}
                    </h1>
                    <h3 className="text-xl font-semibold mt-4">Pacientes</h3>
                    <div className="flex gap-3 mt-5">
                        <input type="radio" name="gender" id="mal" className="hidden" />
                        <label id="male" htmlFor="mal">Macho <GenderMale color="#8FB5FF" size="24px" /></label>

                        <input type="radio" id="fem" name="gender" className="hidden" />
                        <label id="female" htmlFor="fem">Fêmea <GenderFemale color="#FF8FCB" size="24px" /></label>
                    </div>
                    <div className="flex flex-col">
                        <CardPatients img={gato} namePet={petsInfo[0]} nameDono={petsInfo[1]}/>
                        <CardPatients img={gato} namePet={petsInfo[2]} nameDono={petsInfo[3]}/>
                        <CardPatients img={gato} namePet={petsInfo[4]} nameDono={petsInfo[5]}/>
                    </div>
                </div>
            </section>
        </>
    )
}