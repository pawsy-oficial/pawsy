import Logo from "../img/logo.png"

export function NavbarClient(props){
    const pages = [
        "Inicío",
        "Carteira de vacinação",
        "Agendar consulta",
        "Vét. mais próximo",
        "Bem-estar",
        "Receitas"
    ]


    return(
        <section className="bg-[#22B77E] min-h-screen relative px-6 py-10 flex flex-col justify-between">
            <div className="w-52">
                <img src={Logo} />
            </div>
            <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
                {
                    pages.map((page, index) => {
                        return(
                            <span 
                                className={`px-6 py-4 text-white rounded-tl-full rounded-bl-full hover:bg-white transition-colors hover:text-black cursor-pointer f ${index == props.page && "bg-white !text-black"}`}
                            >
                                {page}
                            </span>
                        )
                    })
                }
            </nav>
            <div className="flex justify-between text-white">
                <span>sair</span>
                <span>ajuda</span>
            </div>
        </section>
    )
}