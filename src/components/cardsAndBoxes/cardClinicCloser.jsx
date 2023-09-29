import { memo } from "react"
import { Star } from "@phosphor-icons/react"

function CardsVetCloser({ nameClinic, clinicOpenOrClose, address, distanceFromTheClinic, assessment, id, img }) {
    return (
        <div 
            id={`clinic_pawsy_${id}`}
            className="min-w-[256px] w-[256px] min-h-[128px] group bg-white rounded-lg flex-col flex justify-around p-2 gap-2 overflow-hidden shadow-md"
        >
            <div className="flex flex-row gap-3">
                <div
                    className="w-16 h-16 overflow-hidden rounded-full"
                >
                    <img 
                        src={`${import.meta.env.VITE_URL}/files/${img}`} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
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
                <p className="flex">{distanceFromTheClinic}</p>
                <div className="flex flex-row gap-4">
                    <p>{assessment}</p>
                    <div className="flex flex-row gap-1">
                        <Star weight="fill" color="#ffeb3b" />
                        <Star weight="fill" color="#ffeb3b" />
                        <Star weight="fill" color="#ffeb3b" />
                        <Star weight="fill" color="#ffeb3b" />
                        <Star color="#ffeb3b" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(CardsVetCloser)