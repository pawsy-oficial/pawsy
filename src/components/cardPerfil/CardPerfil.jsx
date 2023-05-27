import './CardPerfil.css'
import { Dog, Cat, Star } from '@phosphor-icons/react'

export default function ClientsPerfil() {
    const clients = ['85','40'];
    return(
        <div className="w-64 bg-white border-l-4 border-[#1F9EAB] rounded-r-lg">
            <h4 className="p-3 text-lg font-medium">
                Clientes
            </h4>
            <div className="flex items-center">
                <Dog className="px-3" size={48} />
                <p className="text-base font-medium">{clients[0]}</p>
                <Cat className="px-3" size={48} />
                <p className="text-base font-medium">{clients[1]}</p>
            </div>
        </div>
    )
}

export function VaccinePets() {
    const clients = ['69','20'];
    return(
        <div className="w-64 bg-white border-l-4 border-[#1F9EAB] rounded-r-lg">
            <h4 className="p-3 text-lg font-medium">
                PetS Vacinados
            </h4>
            <div className="flex items-center">
                <Dog className="px-3" size={48} />
                <p className="text-base font-medium">{clients[0]}</p>
                <Cat className="px-3" size={48} />
                <p className="text-base font-medium">{clients[1]}</p>
            </div>
        </div>
    )
}

export function Avaliation() {
    
    return(
        <div className="w-64 bg-white border-l-4 border-[#1F9EAB] rounded-r-lg">
            <h4 className="p-3 text-lg font-medium">
                Avaliação
            </h4>
            <div className="flex items-center">
                <p className=" pl-3 text-2xl">5</p>
                <Star className="pl-3" size={34}/>
                <Star size={22}/>
                <Star size={22}/>
                <Star size={22}/>
                <Star size={22}/>
            </div>
        </div>
    )
}