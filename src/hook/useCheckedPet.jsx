import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useCheckedPet(){
    const navigate = useNavigate()

    useEffect(()=>{
        const tutorToken = Cookies.get('jwtTokenTutor');
        const url = `${import.meta.env.VITE_URL}/profileTutor`;

        const response = axios.get(url, {
            headers: {
                Authorization: `Bearer ${tutorToken}`
            }
        }).then(
            e => {
                const idTutor = e.data.storedIdTutor

                axios.get(`${import.meta.env.VITE_URL}/tutor/${idTutor}`,{
                    headers: {
                        Authorization: `Bearer ${tutorToken}`
                    }
                }).then(
                    response => {
                        !response.data.petRegister && navigate("/tutor", { state: { addPet: true } })
                    }
                ).catch(err => console.log(err))
            }
        ).catch(
            e => console.log(e)
        )
    },[])
}

export default useCheckedPet