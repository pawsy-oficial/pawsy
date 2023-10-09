import { useNavigate } from "react-router-dom"

export default function CardClinics(props){
    const navigate = useNavigate()
    const OpenClose = ["Aberto", "Fechado"]
    const informacoes = {
        img: props.img,
        nameClinic: props.nameClinic,
        OpenClose: props.openOrClose
    }

    return(
        <button 
            onClick={() => navigate("/pacientes-clinica", {state: { informacoes }})}
        >
            <div className="bg-white rounded-lg shadow-sm flex p-4 gap-4 w-60 mt-4">
                <div className="w-16">
                    <img src={`${import.meta.env.VITE_URL}/files/${props.img}`} alt="Clinica" className="rounded-full"/>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">{props.nameClinic}</h1>
                    <p className={`text-sm ${props.openOrClose ? "text-[#04AD34]" : "text-[#DC3545]"}`}>
                        {
                            props.openOrClose ? OpenClose[0] : OpenClose[1]
                        }
                    </p>
                </div>
            </div>
        </button>
    )
}