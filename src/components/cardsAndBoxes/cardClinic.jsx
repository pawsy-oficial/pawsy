import { memo } from "react";
import { useNavigate } from "react-router-dom";

function CardClinic({ title, image, nameClinic, description, idClinic }) {
    const navigate = useNavigate()

    return (
        <button 
            className="bg-white p-3 rounded-lg w-full max-w-sm lg:min-w-[256px] flex flex-col gap-4 hover:bg-emerald-100 transition-colors duration-300"
            title={`Conhecer mais sobre a ${nameClinic}`}
            onClick={()=>navigate("/clinica", { state: { id: idClinic } })}
        >
            <div className="flex gap-3 items-center flex-col md:flex-row">
                <img 
                    src={`${import.meta.env.VITE_URL}/files/${image}`} 
                    alt={nameClinic} 
                    className="rounded-full md:w-14 md:h-14 h-16 w-16" 
                />
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <h3 
                        className="font-bold text-2xl uppercase"
                    >
                        {nameClinic}
                    </h3>
                    {/* <span className="text-xs text-[#409E44]">Aberto</span> */}
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <p 
                    className="w-fit md:text-base text-xs font-semibold"
                >
                    {title}
                </p>
                <span 
                    className="text-sm text-limit text-start"
                >
                    {description}
                </span>
            </div>
        </button>
    );
}

const memoCardClinic = memo(CardClinic)
export { memoCardClinic as CardClinic }