import { memo } from "react"
import { Star } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { SectionScoreClinic } from "./cardClinicProfile"

function CardsVetCloser({ nameClinic, clinicOpenOrClose, address, id, img }) {
    const navigate = useNavigate()
    return (
        <button
            type="button"
            title={`conhecer o perfil da clínica ${nameClinic}`}
            onClick={()=>navigate("/clinica", {state: { id: id }})} 
            id={`clinic_pawsy_${id}`}
            className="min-w-[256px] w-[256px] min-h-[128px] group bg-white rounded-lg flex-col flex justify-around p-2 gap-2 overflow-hidden shadow-md"
        >
            <div className="flex flex-row gap-3">
                <div
                    className="min-w-[4rem] w-16 h-16 overflow-hidden rounded-full border border-primary"
                >
                    <img 
                        src={`${import.meta.env.VITE_URL}/files/${img}`} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-start text-start">
                    <h1 className="text-2xl">{nameClinic}</h1>
                    <p className="text-xs text-[#409E44]">{clinicOpenOrClose}</p>
                </div>
            </div>
            <a 
                className="text-xs leading-3 text-[#909090] text-limit hover:underline group-hover:text-primary"
                href="#"
            >
                {address}
            </a>
            <div className="flex flex-row justify-between gap-3">
                {/* <p className="flex">{distanceFromTheClinic}</p> */}
                <div className="flex flex-row gap-4">
                    <SectionScoreClinic 
                        idClinic={id}
                        section={false}
                    />
                </div>
            </div>
        </button>
    )
}

export default memo(CardsVetCloser)