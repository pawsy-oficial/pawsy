import { Question, SignOut } from "@phosphor-icons/react"
import Logo from "../img/logo.png"

export function NavbarTutor(props){
    const pages = [
        "Início",
        "Carteira de vacinação",
        "Agendar consulta",
        "Vét. mais próximo",
        "Bem-estar",
        "Receitas",
    ]

    return(
        <section className="bg-primary h-full min-h-screen sticky top-0 px-6 py-10 flex flex-col gap-16 justify-between">
            <div className="w-52">
                <img src={Logo} alt="Logotipo PAWSY"/>
            </div>
            
            <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
                <ul>
                    {
                        pages.map((page, index) => {
                            return(
                                <li
                                    key={index}
                                    className={`nav-link ${index == props.page && "bg-[#F5F7FB] !text-black f after:block before:block"}`}
                                >
                                    <a href="#" >
                                        {page}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <div className="flex justify-between text-white">
                <span>
                    <SignOut size={24} color="#fff"/>
                </span>
                <span>
                    <Question size={24} color="#fff"/>
                </span>
            </div>
        </section>
    )
}

export function NavbarClinic(props){
    const pages = [
        "Inicío",
        "Agenda",
        "Marketing",
        "Pacientes",
        "Perfil",
    ]


    return(
        <section className="bg-primary h-full min-h-screen sticky top-0 px-6 py-10 flex flex-col gap-16 justify-between">
            <div className="w-52">
                <img src={Logo} />
            </div>
            <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
                {
                    pages.map((page, index) => {
                        return(
                            <li 
                                className={`nav-link ${index == props.page && "bg-[#F5F7FB] !text-black f after:block before:block"}`}
                            >
                                {page}
                            </li>
                        )
                    })
                }
            </nav>
            <div className="flex justify-between text-white">
                <span>
                    <SignOut size={24} color="#fff"/>
                </span>
                <span>
                    <Question size={24} color="#fff"/>
                </span>
            </div>
        </section>
    )
}