import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HeaderLogin } from "../../components/header/Header"
import GoBack from "../../components/buttons/GoBack"

export default function Login() {

    
    const location = useLocation()
    const { slug } = location.state
    
    
    
    useEffect(() => {
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

                    <GoBack/>
                    { slug }
                    <form
                        className="bg-white px-5 py-8 rounded-lg w-1/2 flex flex-col max-w-md"
                    >
                        <h2
                            className="font-sora font-bold text-[32px]"
                        >
                            Login
                        </h2>

                        <div className="flex flex-col gap-4 mt-8">
                            <input
                                type="text"
                                placeholder="Email"
                                className="border border-zinc-400 w-full rounded-lg py-2 px-6"
                            />
                            <div>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="border border-zinc-400 w-full rounded-lg py-2 px-6"
                                />
                                <a
                                    className="text-primary underline text-xs cursor-pointer font-semibold"
                                >
                                    Esqueci a senha
                                </a>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8"
                            >
                                ENTRAR
                            </button>
                            <a
                                href=""
                                className="flex justify-center w-full"
                            >
                                Criar uma nova conta
                            </a>
                        </div>

                    </form>
                </div>
            </main>
            <div className="h-screen w-1/2 bg-banner bg-cover absolute right-0 top-0 -z-10">
                <div className="bg-secundary/50 w-1/2 p-6 rounded-lg text-white absolute bottom-20 left-1/2 -translate-x-1/2">
                    <span>Pawsy, a plataforma ideal para o bem-estar dos seus pet</span>
                </div>
            </div>
        </>
    )
}