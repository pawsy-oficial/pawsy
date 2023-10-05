import { WarningCircle } from "@phosphor-icons/react"
import axios from "axios";
import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";

function RadioGroupMyPets({ showPet, edit }) {
    const [ myPets, setMyPets ] = useState([])

    const tokenTutor = Cookies.get('jwtTokenTutor')
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
            headers: {
                Authorization: `Bearer ${tokenTutor}`
            }
        }).then(res => {
            axios.get(`${import.meta.env.VITE_URL}/get-all-pets/${res.data.storedIdTutor}`, {
                headers:{
                    Authorization: `Bearer ${tokenTutor}`
                }
            })
                .then(res => {
                    setMyPets(res.data.myPets);
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    },[edit])
    
    return (
        <>
            {
                myPets.map((pet, index) => {
                    return (
                        <label
                            className="label_select flex gap-2 items-center cursor-pointer hover:bg-primary/5 transition-all duration-700 p-1 rounded"
                            onClick={() => { showPet(index) }}
                            key={index}
                        >
                            <input type="radio" name="myPets" id="" className="radio hidden" />
                            <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_URL}/files/${pet.url_img}`}
                                    alt={pet.nm_pet}
                                    className="object-cover w-full h-full"
                                    draggable={false}
                                />
                            </div>
                            <span className="text-lg  capitalize">{pet.nm_pet}</span>
                            {
                                pet.status && <WarningCircle className="fill-red-error" size={16} weight="bold" />
                            }
                        </label>
                    )
                })
            }
        </>
    )
}

export default memo(RadioGroupMyPets)