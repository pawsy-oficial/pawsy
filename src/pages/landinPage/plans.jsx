import BoxPrice from "../../components/cardsAndBoxes/boxPrice";
import Footer from "../../components/footer";
import { HeaderLandingPage } from "../../components/header/Header";

const listBenefitsBasic = [
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
]
const listBenefitsMonth = [
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
]
const listBenefitsYear = [
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
    "Lorem Lorem Lorem Lorem Loremo ",
    "LoremLoremLoremLoremLorem",
    "LoremLoremLoremLoremLorem",
]

export default function Plans() {
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
                        month={true}
                    />
                    <BoxPrice
                        listBenefits={listBenefitsMonth}
                        price={99.99}
                        month={true}
                    />
                    <BoxPrice
                        listBenefits={listBenefitsYear}
                        price={998.99}
                        month={false}
                        recommended={true}
                    />
                </article>
            </main>

            <Footer/>
        </>
    )
}
