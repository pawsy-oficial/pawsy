import { useNavigate } from "react-router-dom"

export default function LoginForm({ userType }) {
    
    const navigate = useNavigate()
    
    return (
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
                    placeholder={userType == "clinica" ? "CNPJ" : "Email"}
                    className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                />
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
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
                    onClick={()=>navigate("/cadastro", { state: {slug: userType} })}
                    className="mx-auto"
                >
                    Criar uma nova conta
                </a>
            </div>

        </form>
    )
}