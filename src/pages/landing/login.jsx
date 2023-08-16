import { useNavigate } from "react-router-dom"
import logo from "../../img/logoPawsy.svg"

export default function Login() {
    const navigate = useNavigate()

    return (
        <main className="min-h-screen bg-primary flex justify-between">
            <header
                className="flex justify-between px-6 absolute top-0 w-full gap-16 "
            >
                <img src={logo} alt="Logo pawsy" />

                <nav>
                    <a href="#">página inicial</a>
                    <a href="#">sobre nós</a>
                    <a href="#">suporte</a>
                </nav>
            </header>
            
            <section>

            </section>
            <section className="h-screen w-1/2 bg-banner bg-cover">
    
            </section>
        
        </main>
    )
}