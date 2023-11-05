import { useNavigate } from "react-router-dom"

export default function CardPatients({petName, nameTutor, idPet, year, breed, imagePet, animalType, idClinic, weight, idMedic, idTutor, height, allergy, castrated, behavior, treatment, gender}){
    const navigate = useNavigate()
    const pet = { petName, nameTutor, idPet, year, breed, animalType, idClinic, weight, imagePet, idTutor, height, allergy, castrated, behavior, treatment, gender}
    
    const medic = idMedic
    return(
        <button 
            onClick={() => navigate("/paciente", {state: { pet, medic }})}
        >
            <div className="w-[752px] mt-4 bg-[#F5FFFE] items-center flex gap-4 p-3 hover:bg-[#c7dcda] rounded-lg">
                <img src={`${import.meta.env.VITE_URL}/files/${imagePet}`} className="w-10 h-10 rounded-full border-2 border-primary"/>
                <p className="text-base font-medium">
                   {petName}
                </p>
                <p className="text-base font-medium">
                   {nameTutor}
                </p>
                <p className="hidden">{idPet}</p>
            </div>
        </button>
    )
}