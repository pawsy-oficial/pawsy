import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HeaderLogin } from "../../components/header/Header"
import GoBack from "../../components/buttons/GoBack"
import { useState } from "react"
import LoginForm from "../../components/forms/Login"
import { CardNotificationRegisters } from "../../components/cardsAndBoxes/cardNotificationRegister"

export default function Login() {

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
        position: "absolute"
    }

    return (
        <>
            <main className="h-screen">
                <HeaderLogin style={style} />
                <div
                    className="max-w-7xl mx-auto h-full flex flex-col justify-center"
                >

                    <GoBack />
                    <LoginForm  userType={typeUser} />
                </div>
            </main>
            <div className="h-screen w-1/2 bg-banner bg-cover absolute right-0 top-0 -z-10">
                <CardNotificationRegisters/>
            </div>
        </>
    )
}