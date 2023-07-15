import { useNavigate } from "react-router-dom"
import Logo from "../img/logoPawsy.svg"

export default function Home() {
    const navigate = useNavigate()
  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center items-center gap-16">
        <img src={Logo} alt="" className="w-96"/>

        <div className="w-full flex items-center flex-col gap-5">
            <span className="text-lg text-white">Escolha a sua área</span>
            <div className="flex gap-9 justify-center">
                <button 
                    className="border border-white rounded-lg px-6 py-1 text-white text-xl hover:bg-secundary/30"
                    // onClick={()=>navigate("/clinica")}
                >
                    Clínica
                </button>
                <button 
                    className="border border-white rounded-lg px-6 py-1 text-white text-xl hover:bg-secundary/30"
                    onClick={()=>navigate("/tutor")}
                >
                    Tutor
                </button>
            </div>
        </div>
    </main>
  )
}
