import ClientsPerfil, { Avaliation, VaccinePets } from "../../components/cardPerfil/CardPerfil";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";

export default function Perfil() {
    const clinica = [
        {nameClinic: "Petz", imageClinic: "https://pbs.twimg.com/profile_images/1489579803846090758/PI8ujLgX_400x400.jpg"}
    ]
    const infos = [
        {endereco: "Rua José Lobo Viana, 173", telefone: "(13)3203-3766", email: "petzco@petz.com", funcionamento: "Das 7:00 ás 21:00"}
    ]


    return (
        <main className="flex min-h-screen">
            <NavbarClinic page={3} />
            <section className="flex-1">
                <Header />
                <main className="pl-10 pr-16 py-8 flex gap-5">
                   <div className="flex gap-5">
                        <ClientsPerfil/>
                        <VaccinePets/>
                        <Avaliation/>
                    </div>
                </main>
                <main className="pl-10 pr-16 py-8 flex gap-5">
                    <section className="flex-1 flex flex-col bg-white px-6 py-8 rounded-2xl">
                        <section className="flex">
                            <div className="w-48 h-48 rounded-lg overflow-hidden">
                                <img src={clinica[0].imageClinic} alt={clinica[0].nameClinic} className="h-full w-full object-cover" />                             
                            </div>
                            <div className="flex flex-col p-4 gap-2  text-left">
                                <h3 className="text-[32px] font-bold uppercase flex gap-4 items-center">
                                    {clinica[0].nameClinic}
                                </h3>
                                <p>
                                {infos[0].endereco}
                                </p>
                                <p>
                                    {infos[0].telefone}
                                </p>
                                <p>
                                    {infos[0].email}
                                </p>
                                <p>
                                    {infos[0].funcionamento}
                                </p>
                            </div>
                        </section>
                            <div className="flex flex-col">
                                <h2 className="mt-4 font-bold text-lg pl-3 pb-2">
                                    Sobre nós
                                </h2>
                                <p className="text-sm font-normal pl-3 ">
                                A nossa clínica veterinária está no mercado desde 1930, oferecendo atendimento de qualidade e carinho aos animais. Somos especializados em cuidar da saúde e bem-estar de cães, gatos e outros pets. Possuímos uma equipe de profissionais altamente qualificados, que trabalham com tecnologia de ponta para diagnósticos precisos e tratamentos eficazes. Nosso objetivo é proporcionar o melhor atendimento para o seu pet, desde consultas de rotina até cirurgias e internações. Além disso, contamos com serviços de banho e tosa, pet shop e venda de produtos de qualidade para a manutenção da saúde dos animais. Venha nos visitar e conheça a nossa história de amor e dedicação aos pets.
                                </p>
                            </div>
                            <div className="mnegative flex flex-col">
                                <h2 className="font-bold text-lg pl-3 pb-2">
                                    Anúncios
                                </h2>
                                <p className="text-sm font-normal pl-3">
                                    Você não criou nenhum anúncio <a className="text-[#22937E] underline" href="">criar anúncio</a>
                                </p>
                            </div>
                            <section className="mnegative flex flex-col">
                                <h2 className="font-bold text-lg pl-3 pb-2">
                                    Posts
                                </h2>
                            </section>
                    </section>
                    <section className="w-96 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5 h-max">
                    </section>  
                </main>
            </section>
        </main>
    )
}