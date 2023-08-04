import { useNavigate } from "react-router-dom"

export default function CardPatients(props){
    const navigate = useNavigate()
    const pet = {img: props.img, namePet: props.namePet, nameDono: props.nameDono}

    return(
        <button onClick={() => navigate("/paciente", {state: { pet }})}>
            <div className="w-[752px] mt-4 bg-[#F5FFFE] items-center flex gap-4 p-3 hover:bg-[#c7dcda] rounded-lg">
                <img src={props.img} className="w-10 h-10 rounded-full border-2 border-primary"/>
                <p className="text-base font-medium">
                   {props.namePet}
                </p>
                <p className="text-base font-medium">
                   {props.nameDono}
                </p>
            </div>
        </button>
    )
}