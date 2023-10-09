import { Dog, Cat, Star } from '@phosphor-icons/react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { memo, useEffect, useState } from 'react';

function ClientsPerfil({idClinc}) {
    const [clientClinic, setClientClinic] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}/countPatients/${idClinc}`, {
            headers:{
                Authorization: `Bearer ${Cookies.get("jwtTokenClinic")}`
            }
        }).then(e => setClientClinic(e.data.client)).catch(err => console.log(err))
    },[])
    
    return(
        <div className="w-64 bg-white border-l-4 border-[#1F9EAB] rounded-r-lg">
            <h4 className="p-3 text-lg font-medium">
                Clientes
            </h4>
            <div className="flex items-center">
                <Dog className="px-3" size={48} />
                <p className="text-base font-medium">{
                    clientClinic.length > 0 && clientClinic[0].quantidade
                }</p>
                <Cat className="px-3" size={48} />
                <p className="text-base font-medium">{
                    clientClinic.length > 0 && clientClinic[1].quantidade
                }</p>
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

export default memo(ClientsPerfil)