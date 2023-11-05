import { useNavigate } from "react-router-dom"

export default function CardClinics(props) {
    const navigate = useNavigate()
    const informacoes = {
        img: props.img,
        nameClinic: props.nameClinic,
        idClinic: props.idClinic,
        idMedic: props.idMedic
    }

    return (
        <button
            onClick={() => navigate("/pacientes-clinica", { state: { informacoes } })}
        >
            <div className="bg-white rounded-lg shadow-sm flex p-4 gap-4 max-w-xs w-full">
                <div 
                    className="w-16 h-16 overflow-hidden rounded-full border-2 border-secundary"
                >
                    <img 
                        src={`${import.meta.env.VITE_URL}/files/${props.img}`} 
                        alt="Clinica" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div 
                    className="flex flex-col gap-2"
                >
                    <strong 
                        className="text-2xl font-semibold uppercase"
                    >
                        {
                            props.nameClinic
                        }
                    </strong>
                    {/* <p className={`text-sm ${props.openOrClose ? "text-[#04AD34]" : "text-[#DC3545]"}`}>
                        {
                            props.openOrClose ? OpenClose[0] : OpenClose[1]
                        }
                    </p> */}
                </div>
            </div>
        </button>
    )
}