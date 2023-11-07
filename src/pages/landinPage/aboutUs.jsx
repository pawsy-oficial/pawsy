import { HeaderLandingPage } from "../../components/header/Header";
import pet from "../../img/pet.png"
import space from "../../img/element_space.svg"
import Footer from "../../components/footer";
import useTopToScreen from "../../hook/useTopToScreen";
import romullo from "../../img/romullo.jpg"
import pedro from "../../img/pedro.jpg"
import nicole from "../../img/nicole.jpg"
import luana from "../../img/luana.jpg"
import fernando from "../../img/fernando.jpg"
import BoxAbout from "../../components/cardsAndBoxes/boxAbout";

const infoTeam = [
    {
        name: "Fernando Fernandes",
        role: "Desenvolvedor",
        img: fernando,
        network: [
            {
                instagram: "https://instagram.com/romu_013",
                linkedin: "hhttps://www.linkedin.com/in/fernando-fernandes-moraes-da-silva/",
                github: "https://github.com/Fernando-Fernandes05"
            }
        ]
    },
    {
        name: "Luana Alcantara",
        role: "Documentação",
        img: luana,
        network: [
            {
                instagram: "https://instagram.com/romu_013",
                linkedin: "https://linkedin.com/in/romullomelo",
            }
        ]
    },
    {
        name: "Nicole Nunes",
        role: "Documentação",
        img: nicole,
        network: [
            {
                instagram: "https://instagram.com/romu_013",
                linkedin: "https://linkedin.com/in/romullomelo",
            }
        ]
    },
    {
        name: "Pedro Daniel",
        role: "Desenvolvedor & banco de dados",
        img: pedro,
        network: [
            {
                instagram: "https://www.instagram.com/pedrodanielbrunetto/",
                linkedin: "https://www.linkedin.com/in/pedrodanielbrunetto/",
                github: "https://github.com/pedroDanielBrunetto"
            }
        ]
    },
    {
        name: "Rômullo Melo",
        role: "Desenvolvedor & designer",
        img: romullo,
        network: [
            {
                instagram: "https://instagram.com/romu_013",
                linkedin: "https://linkedin.com/in/romullomelo",
                github: "https://github.com/rom013"
            }
        ]
    },
]

export default function AboutUs() {
    useTopToScreen()
    return (
        <>
            <HeaderLandingPage type="light" />

            <div
                className="bg-primary h-[27.75rem] relative bg-paws bg-animate bg-no-repeat bg-fixed flex items-center"
            >
                <img
                    src={pet}
                    className="absolute bottom-0 translate-y-9 left-8 drop-shadow-md"
                    draggable="false"
                />
                <div
                    className="max-w-xl mx-auto w-full"
                >
                    <h1
                        className="text-6xl text-white font-baloo2 font-bold"
                    >
                        Sobre nós
                    </h1>
                </div>
            </div>

            <main
                className="my-10 max-w-5xl mx-auto"
            >
                <article
                    className="max-w-4xl flex flex-col gap-6 items-start"
                >
                    <img src={space} className="h-5"/>

                    <div
                        className="flex flex-col gap-4"
                    >
                        <p
                            className="leading-relaxed font-lato text-base text-zinc-800"
                        >
                            A Pawsy teve seu início no início de 2023, nascendo de um projeto de conclusão de curso na Etec Doutora Ruth Cardoso, na área de Desenvolvimento de Sistemas. Nossa paixão por animais nos inspirou a criar uma plataforma que conecta clínicas veterinárias e tutores de pets, facilitando o cuidado com seus amiguinhos peludos.
                        </p>
                        <p
                            className="leading-relaxed font-lato text-base text-zinc-800"
                        >
                            Ainda estamos na fase de produção, trabalhando arduamente para tornar a Pawsy uma realidade. Fazemos parte desse projeto com dedicação, comprometidos em proporcionar uma experiência única para tutores e clínicas veterinárias. A jornada está apenas começando, e estamos animados para compartilhar cada passo do nosso progresso com vocês. Junte-se a nós nesta emocionante aventura em prol do bem-estar dos animais de estimação.
                        </p>
                    </div>
                </article>

                <article
                    className="mt-10"
                >
                    <div
                        className="max-w-xl mx-auto flex flex-col items-center"
                    >
                        <h2
                            className="font-baloo2 font-bold text-3xl"
                        >
                            Nosso time
                        </h2>
                        <img src={space} className="h-5"/>
                        <p
                            className="text-center"
                        >
                            Conheça as pessoas que trabalham incansavelmente para tornar a Pawsy a plataforma definitiva para cuidar dos nossos pets.
                        </p>
                    </div>

                    <section
                        className="flex gap-16 max-w justify-center flex-wrap mt-6"
                    >
                        {
                            infoTeam.map((i, index) => {
                                return (
                                    <BoxAbout
                                        key={index}
                                        name={i.name}
                                        image={i.img}
                                        network={i.network}
                                        role={i.role}
                                    />
                                )
                            })
                        }
                    </section>
                </article>
            </main>

            <Footer/>
        </>
    )
}
