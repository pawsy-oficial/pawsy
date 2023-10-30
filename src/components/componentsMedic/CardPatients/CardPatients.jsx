import { useNavigate } from "react-router-dom"

export default function CardPatients(props){
    const navigate = useNavigate()
    const pet = {
        img: props.img, 
        namePet: props.namePet, 
        nameDono: props.nameDono, 
        idPet: props.idPet, 
        idade: props.idade, 
        raca: props.raca, 
        //bemestar: props.bemestar, 
        idClinic: props.idClinic,
        peso: props.peso, 
        //altura: props.altura, 
        //alergia: props.alergia, 
        //castrado: props.castrado, 
        //comportamento: props.comportamento, 
        //tratamento: props.tratamento
    }

    const medic = props.idMedic

    return(
        <button 
            onClick={() => navigate("/paciente", {state: { pet, medic }})}
        >
            <div className="w-[752px] mt-4 bg-[#F5FFFE] items-center flex gap-4 p-3 hover:bg-[#c7dcda] rounded-lg">
                <img src={`${import.meta.env.VITE_URL}/files/${props.img}`} className="w-10 h-10 rounded-full border-2 border-primary"/>
                <p className="text-base font-medium">
                   {props.namePet}
                </p>
                <p className="text-base font-medium">
                   {props.nameDono}
                </p>
                <p className="hidden">{props.idPet}</p>
            </div>
        </button>
    )
}