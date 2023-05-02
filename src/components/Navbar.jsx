import Logo from "../img/logo.png"

export function NavbarClient(){
    return(
        <section className="bg-[#22B77E] min-h-screen relative px-6 py-10 flex flex-col justify-between">
            <div className="w-52">
                <img src={Logo} alt="" />
            </div>
            <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
                <span className="px-6 py-4 bg-white rounded-tl-full rounded-bl-full">Inicío</span>
                <span className="px-6 py-4 bg-white rounded-tl-full rounded-bl-full">Carteira de vacinação</span>
                <span className="px-6 py-4 bg-white rounded-tl-full rounded-bl-full">Agendar consulta</span>
                <span className="px-6 py-4 bg-white rounded-tl-full rounded-bl-full">Vét. mais próximo</span>
                <span className="px-6 py-4 bg-white rounded-tl-full rounded-bl-full">Bem-estar</span>
                <span className="px-6 py-4 bg-white rounded-tl-full rounded-bl-full">Receitas</span>
            </nav>
            <div className="flex justify-between">
                <span>sair</span>
                <span>ajuda</span>
            </div>
        </section>
    )
}