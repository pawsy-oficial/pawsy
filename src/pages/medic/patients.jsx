import { useLocation, useNavigate } from "react-router-dom"
import { HeaderMedic } from "../../components/HeaderMedic"
import { ArrowUUpLeft, GenderFemale, GenderMale } from "@phosphor-icons/react";
import CardPatients from "../../components/componentsMedic/CardPatients/CardPatients";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs"
import Cookies from "js-cookie";

export default function PatientsForMedic() {
    const navigate = useNavigate()
    const location = useLocation()
    const { informacoes } = location.state
    const [clinicsPet, setClinicsPet] = useState([]);

    useEffect(() => {
        const tokenMedic = Cookies.get("jwtTokenMedic")
        axios.get(`${import.meta.env.VITE_URL}/clinicsPet`, {
            headers: {
                Authorization: `Bearer ${tokenMedic}`
            }
        }).then(res => {
            console.log(res.data.results);
            setClinicsPet(res.data.results)
        })
    }, []);

    const imgClinic = informacoes.img;
    const nameClinic = informacoes.nameClinic;

    return (
        <>
            <header>
                <HeaderMedic />
            </header>
            <div className="flex">
                <button onClick={() => navigate("/medico")} className="px-96 flex items-center gap-2 -mb-10 mt-5"><ArrowUUpLeft color="#22B77E" />Voltar</button>
            </div>
            <section className="mt-16 flex justify-center items-center bg-[#F5F7FB]">
                <div className="p-6 bg-white rounded-lg flex flex-col">
                    <div className="flex justify-center">
                        <img
                            src={`${import.meta.env.VITE_URL}/files/${imgClinic}`}
                            className="w-44 h-44 rounded-full border-4 border-[#22B77E]"
                        />
                    </div>
                    <h1 className="text-center text-2xl font-semibold mt-4 uppercase">
                        {nameClinic}
                    </h1>
                    <h3 className="text-xl font-semibold mt-4">Pacientes</h3>
                    <div className="flex gap-3 mt-5">
                        <input type="radio" name="gender" id="mal" className="hidden" />
                        <label id="male" htmlFor="mal">Macho <GenderMale color="#8FB5FF" size="24px" /></label>

                        <input type="radio" id="fem" name="gender" className="hidden" />
                        <label id="female" htmlFor="fem">Fêmea <GenderFemale color="#FF8FCB" size="24px" /></label>
                    </div>
                    <div className="flex flex-col">
                        {
                            clinicsPet.map(patients => {
                                console.log(patients);
                                return (
                                    <CardPatients 
                                        animalType={patients.AnimalType}
                                        breed={patients.BreedName}
                                        idPet={patients.PetID}
                                        imagePet={patients.PetImage}
                                        petName={patients.PetName}
                                        nameTutor={patients.TutorName}
                                        year={patients.BirthDate}

                                        // img={patients.PetImage}
                                        // namePet={patients.PetName}
                                        // nameDono={patients.TutorName}
                                        // idPet={patients.PetID}
                                        // idade={dayjs(patients.BirthDate).format("DD/MM/YYYY")}
                                        // raca={patients.BreedName}
                                        // peso={patients.num_peso}
                                        idClinic={informacoes.idClinic}
                                        idMedic={informacoes.idMedic}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}