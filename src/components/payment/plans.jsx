import BoxPrice from "../cardsAndBoxes/boxPrice"
import { HeaderLandingPage } from "../header/Header"
import Footer from "../footer"

const listBenefitsBasic = [
    "Acesso à plataforma",
    "Limite de médicos integrados (máximo 1)",
    "Informações dos pacientes",
]
const listBenefitsMonth = [
    "Suporte 24h",
    "Criar agendas de consultas (1 por mês)",
    "Criar anúncios",
    "Acesso à plataforma",
    "Informações dos pacientes",
    "Limite de médicos integrados (máximo 3)",
]
const listBenefitsYear = [
    "Ter maior destaque nas consultas dos tutores",
    "Suporte 24h",
    "Criar agendas de consultas (ilimitado)",
    "Criar anúncios",
    "Acesso à plataforma",
    "Informações dos pacientes",
    "Limite de médicos integrados (máximo 10)",
]

export default function Plans({ planScreen, isPlan }) {
    const style = {
        position: "relative"    
    }
    return (
        <>
            <HeaderLandingPage style={style} />
            
            <main
                className="my-10 max-w-5xl mx-auto flex flex-col gap-8"
            >
                <div
                    className="max-w-4xl flex flex-col gap-2 px-6"
                >
                    <strong
                        className="font-baloo2 text-base text-primary"
                    >
                        Planos Pawsy para Clínicas Veterinárias:
                    </strong>
                    <h2
                        className="font-sora text-[2rem] text-zinc-900 font-bold"
                    >
                        Escolha um plano para a sua clínica e potencialize seu atendimento!
                    </h2>
                    <p
                        className="text-zinc-600 text-sm leading-relaxed"
                    >
                        Descubra os planos Pawsy especialmente elaborados para clínicas veterinárias. Otimize seus serviços, promova sua marca e aprimore a gestão de atendimentos. Escolha a solução perfeita para impulsionar o cuidado com os pets e fortalecer a presença da sua clínica. Junte-se à Pawsy e faça parte da revolução na saúde animal!
                    </p>
                </div>

                <article
                    className="flex flex-col md:flex-row items-center md:items-stretch md:flex-wrap lg:flex-nowrap justify-center gap-5 px-6"
                >
                    <BoxPrice
                        listBenefits={listBenefitsBasic}
                        price={0}
                        idPlain={0}
                        
                        planScreen={planScreen}
                        isPlan={isPlan}
                    />
                    <BoxPrice
                        listBenefits={listBenefitsMonth}
                        price={109.90}
                        idPlain={1}
                        grossPrice={1399.90}
                        
                        planScreen={planScreen}
                        isPlan={isPlan}
                    />
                    <BoxPrice
                        listBenefits={listBenefitsYear}
                        price={158.90}
                        recommended={true}
                        idPlain={2}
                        grossPrice={1999.90}
                        
                        planScreen={planScreen}
                        isPlan={isPlan}
                    />
                </article>
            </main>
            
            <Footer />
        </>
    )
}