import { useLocation, useNavigate } from "react-router-dom"
import { HeaderMedic } from "../../components/HeaderMedic"
import { CaretLeft, GenderFemale, GenderMale } from "@phosphor-icons/react";
import CardPatients from "../../components/componentsMedic/CardPatients/CardPatients";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs"
import Cookies from "js-cookie";

export default function PatientsForMedic() {
    const navigate = useNavigate()
    const location = useLocation()
	const [ gender, setGender ] = useState("")
    const { informacoes } = location.state
    const [clinicsPet, setClinicsPet] = useState([]);

    useEffect(() => {
        const tokenMedic = Cookies.get("jwtTokenMedic")
        axios.get(`${import.meta.env.VITE_URL}/clinicsPet`, {
            headers: {
                Authorization: `Bearer ${tokenMedic}`
            }
        }).then(res => {
            console.log(res.data);
            setClinicsPet(res.data.results)
        })
    }, []);

    const imgClinic = informacoes.img;
    const nameClinic = informacoes.nameClinic;
    const filterPatientes = clinicsPet.filter(patient => (
		(
			gender.length === 0
				? patient.namePet.startsWith(namePatient.toLowerCase()) 
				: patient.nm_sexo == gender && patient.namePet.startsWith(namePatient.toLowerCase())
		) 
	) ?? [])

    return (
        <main className="min-h-screen">
            <HeaderMedic />
            <div className="max-w-3xl mx-auto my-4">
                <button 
                    onClick={() => navigate("/medico")} 
                    className="flex gap-2 items-center font-semibold"
                >
                    <CaretLeft color="#22B77E" />
                    Voltar
                </button>
            </div>

            <main
                className="max-w-3xl mx-auto bg-white rounded-lg p-6 mb-16"
            >
                <section>
                    <div className="flex justify-center">
                        <img
                            src={`${import.meta.env.VITE_URL}/files/${imgClinic}`}
                            className="w-44 h-44 rounded-full border-4 border-[#22B77E]"
                            alt={`Logo ${nameClinic}`}
                            draggable={false}
                        />
                    </div>
                    <h1
                        className="text-center text-2xl font-bold mt-4 uppercase"
                    >
                        {
                            nameClinic
                        }
                    </h1>
                </section>

                <section
                    className="flex flex-col gap-4 mt-6"
                >
                    <h3 
                        className="text-xl font-semibold"
                    >
                        Pacientes
                    </h3>
                    <div className="flex gap-3">
                        <input type="radio" name="gender" id="mal" className="hidden" />
                        <label id="male" htmlFor="mal" className="flex items-center gap-2 rounded-lg px-3 py-1">Macho <GenderMale color="#8FB5FF" size="24px" /></label>

                        <input type="radio" id="fem" name="gender" className="hidden" />
                        <label id="female" htmlFor="fem" className="flex items-center gap-2 rounded-lg px-3 py-1">Fêmea <GenderFemale color="#FF8FCB" size="24px" /></label>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            clinicsPet.map(patients => {
                                return (
                                    <CardPatients
                                        animalType={patients.AnimalType}
                                        breed={patients.BreedName}
                                        idPet={patients.PetID}
                                        imagePet={patients.PetImage}
                                        petName={patients.PetName}
                                        nameTutor={patients.TutorName}
                                        year={patients.BirthDate}

                                        weight={patients.weight}
                                        allergy={patients.allergy}
                                        behavior={patients.behavior}
                                        castrated={patients.castrated}
                                        height={patients.height}
                                        treatment={patients.treatment}
                                        gender={patients.Gender}

                                        idClinic={informacoes.idClinic}
                                        idMedic={informacoes.idMedic}
                                        idTutor={patients.TutorId}
                                    />
                                )
                            })
                        }
                    </div>
                </section>
            </main>
        </main>
    )
}