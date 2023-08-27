import { memo, useEffect, useState } from "react"

function CardNotificationRegisters() {

    const messages = [
        "Bem-vindo a Pawsy",
        "Pawsy, a plataforma ideal para o bem-estar dos seus pet",
        "Monitore saúde, agende consultas e garanta um atendimento eficaz, tudo em um ambiente integrado",
        "Acesso a históricos, emissão de receitas e informações essenciais, garantindo um atendimento de qualidade",
        "Pawsy é a solução completa!",
        "Pawsy: O ponto de encontro de quem AMA e quem CUIDA!",
        "Nossa plataforma é mais do que um sistema - é uma conexão entre corações, pets e profissionais dedicados",
        "Conheça a nossa equipe em: Sobre nós"
    ]

    const [ num, setNum ] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setNum(parseInt(Math.random()*messages.length))
        },10000)

        return () => clearInterval(interval)
    },[])

    return (
        <div
            className={`bg-secundary/50 wmd:max-w-[384px] md:w-fit w-full p-6 rounded-lg text-white absolute bottom-20 transition md:-translate-x-1/4 -translate-x-1/2 left-1/2`}

        >
            <span>
                {
                    messages[num]
                }
            </span>
        </div>
    )
}

const memoCardNotificationRegister = memo(CardNotificationRegisters)
export {memoCardNotificationRegister as CardNotificationRegisters}