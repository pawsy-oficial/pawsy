import stars from "../../img/stars.svg"
import iconClinic from "../../img/iconClinic.svg"

export default function CardsVetCloser({nameClinic, clinicOpenOrClose, address, distanceFromTheClinic, assessment}) {
    return(
        <div className="w-64 h-[8.75rem] bg-white rounded-lg flex-col flex justify-around">
            <div className="pl-3 flex flex-row gap-3">
            <img src={iconClinic} /> 
                <div className="flex flex-col">
                    <h1 className="text-2xl">{nameClinic}</h1>
                    <p className="text-xs text-[#409E44]">{clinicOpenOrClose}</p>
                </div>
            </div>
            <p className="text-xs leading-3 pl-3 text-[#909090]">{address}</p>
            <div className="flex flex-row gap-16 pl-3">
                <p>{distanceFromTheClinic}</p>
                <div className="flex flex-row gap-4">
                    <p>{assessment}</p>
                    <div className="flex flex-row gap-1">
                        <img src={stars} /> 
                        <img src={stars} /> 
                        <img src={stars} /> 
                        <img src={stars} />
                        <img src={stars} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}