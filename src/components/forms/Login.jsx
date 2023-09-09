import React from 'react';
import LoginFormClinic from "./login/LoginClinic";
import LoginFormMedic from "./login/LoginMedic";
import LoginFormTutor from "./login/LoginTutor";

export default function LoginForm(props) {
    switch (props.userType) {
        case "tutor":
            return <LoginFormTutor/>
        case "veterinario": 
            return <LoginFormMedic/>
        case "clinica":
            return <LoginFormClinic/>
        default:
            return <p>Tipo de usuário não reconhecido</p>;
    }
}
