import { useNavigate } from "react-router-dom"

export default function CardPatients({ petName, nameTutor, idPet, year, breed, imagePet, animalType, idClinic, weight, idMedic, idTutor, height, allergy, castrated, behavior, treatment, gender }) {
    const navigate = useNavigate()
    const pet = { petName, nameTutor, idPet, year, breed, animalType, idClinic, weight, imagePet, idTutor, height, allergy, castrated, behavior, treatment, gender }

    const medic = idMedic
    return (
        <button
            onClick={() => navigate("/paciente", { state: { pet, medic } })}
        >
            <div
                className="w-full bg-[#F5FFFE] items-center flex gap-4 p-3 hover:bg-[#c7dcda] rounded-lg"
            >
                <div
                    className="min-w-[2.5rem] w-10 h-10 rounded-full overflow-hidden border-2 border-primary"
                >
                    <img
                        src={`${import.meta.env.VITE_URL}/files/${imagePet}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div
                    className="flex gap-2 w-full justify-between"
                >
                    <strong
                        className="text-lg font-medium uppercase"
                    >
                        {
                            petName
                        }
                        {" "}
                        <span
                            className="text-sm font-lato font-normal text-zinc-600"
                        >
                            #
                            {
                                idPet.toString().padStart(4, "0")
                            }
                        </span>
                    </strong>
                    <strong
                        className="text-base font-normal font-lato capitalize text-zinc-600"
                    >
                        {
                            nameTutor
                        }
                    </strong>
                </div>
            </div>
        </button>
    )
}