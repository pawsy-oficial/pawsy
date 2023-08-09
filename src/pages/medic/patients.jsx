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
        "Tom", "Thomas Shelby",
        514, 884, 654
    ]

    const health = [
    /*0 1 2*/    "3 anos", "4 anos", "5 anos",
    /*3 4 5*/     "Spitz Alemão", "Sem raça definida", "Dobberman",
    /*6 7 8*/     "Excelente", "Médio", "Ruim",
    /*9 10 11*/   4, 10, 20,
    /*12 13 14*/  0.4, 0.6, 0.8,
    /*15 16 18*/  "Não", "Não", "Não",
    /*19 20 21*/  "Sim", "Não", "Não",
    /*22 23 24*/  "Manso", "Manso", "Não-Manso",
    /*25 26 27*/  "Não", "Sim", "Sim"

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
                        <CardPatients img={gato} namePet={petsInfo[0]} nameDono={petsInfo[1]} idPet={petsInfo[6]} idade={health[0]} raca={health[3]} bemestar={health[6]} peso={health[9]} altura={health[12]} alergia={health[15]} castrado={health[19]} comportamento={health[22]} tratamento={health[25]} />
                        <CardPatients img={gato} namePet={petsInfo[2]} nameDono={petsInfo[3]} idPet={petsInfo[7]} idade={health[1]} raca={health[4]} bemestar={health[7]} peso={health[10]} altura={health[13]} alergia={health[16]} castrado={health[20]} comportamento={health[23]} tratamento={health[26]} />
                        <CardPatients img={gato} namePet={petsInfo[4]} nameDono={petsInfo[5]} idPet={petsInfo[8]} idade={health[2]} raca={health[5]} bemestar={health[8]} peso={health[11]} altura={health[14]} alergia={health[18]} castrado={health[21]} comportamento={health[24]} tratamento={health[27]} />
                    </div>
                </div>
            </section>
        </>
    )
}