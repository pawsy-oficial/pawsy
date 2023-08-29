import iconClinic from "../../img/iconClinic.svg"
import { Star } from "@phosphor-icons/react"

export default function CardsVetCloser({ nameClinic, clinicOpenOrClose, address, distanceFromTheClinic, assessment }) {
    return (
        <div className="min-w-[256px] min-h-[128px] bg-white rounded-lg flex-col flex justify-around p-2 gap-2">
            <div className="flex flex-row gap-3">
                <img src={iconClinic} />
                <div className="flex flex-col">
                    <h1 className="text-2xl">{nameClinic}</h1>
                    <p className="text-xs text-[#409E44]">{clinicOpenOrClose}</p>
                </div>
            </div>
            <p className="text-xs leading-3 text-[#909090]">{address}</p>
            <div className="flex flex-row gap-16">
                <p className="flex-1">{distanceFromTheClinic}</p>
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