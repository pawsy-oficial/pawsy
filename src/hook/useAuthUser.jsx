import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function useAuthUser(){
    const navigate = useNavigate()
    const token = Cookies.get()

    if(token){
        const tokenType = Object.keys(token)[0]
       
        switch (tokenType) {
            case "jwtTokenTutor":
                window.location.href = "/tutor"
                break
            case "jwtTokenClinic":
                window.location.href = "/minha-clinica"
                break
            case "jwtTokenMedic":
                window.location.href = "/medico"
                break
            default:
                break;
        }

    }
}