import { useState, useEffect } from "react";
import RegisterForm from "../../components/forms/Register";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderLogin } from "../../components/header/Header";
import GoBack from "../../components/buttons/GoBack";
import { CardNotificationRegisters } from "../../components/cardsAndBoxes/cardNotificationRegister";

export default function Register() {

    const [typeUser, setTypeUSer] = useState()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.state) {
            navigate("/acesso")
        }
        else {
            const { slug } = location.state
            setTypeUSer(slug)
        }

        document.body.classList.add("bg-primary")
        return () => { // função de limpeza, é executada quando o componente é desmontado
            document.body.classList.remove("bg-primary")
        }
    }, [])

    const style = {
        position: "relative"
    }

    return (
        <>
            <main className="h-screen">
                <HeaderLogin style={style} />
                <div
                    className="md:px-8 xl:px-0 max-w-7xl mx-auto flex flex-col justify-center "
                >
                    <GoBack />
                    <RegisterForm userType={typeUser} />
                </div>
            </main>
            <div className="h-screen w-full md:w-1/2 bg-banner bg-cover fixed right-0 top-0 -z-10">
                <CardNotificationRegisters/>
            </div>
        </>
        
    )
}
