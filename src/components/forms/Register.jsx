import { useLocation } from 'react-router-dom';
import RegisterFormClinic from "./RegisterClinic";
import RegisterFormTutor from "./RegisterTutor";
import RegisterFormVeterinary from "./RegisterVeterinary";

export default function RegisterForm({userType}){

    switch (userType) {
        case "tutor":
            return <RegisterFormTutor />;
        case "veterinario":
            return <RegisterFormVeterinary />;
        case "clinica":
            return <RegisterFormClinic />;
        default:
            return <p>Tipo de usuário não reconhecido</p>;
    }
}
