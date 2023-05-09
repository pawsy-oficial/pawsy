import { GenderFemale, GenderMale, PlusCircle, WarningCircle } from "@phosphor-icons/react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";

export default function Tutor() {

    const pets =
    [
        { name: "caramelo", image: "https://s2.glbimg.com/_jO2JQsq1bqQiXiz41sQ4M4_BUA=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/N/C/OyE6CpTeKr0eTjTxKBWA/c8df570c-b7b6-4d50-a045-b623a4feca57.jpg", status: false, id: "0001", birthday: "2022-05-05", breed: "Sem raça definida", gender: "mas", observations: "Meu Caramelo é territorial e protetor, mas carinhoso e brincalhão. Avista com latidos e rosnados, mas uma carícia ou brincadeira o acalma. Adora correr atrás de brinquedos e é muito inteligente. Cuido com amor e atenção, recebendo amor e alegria em troca."},
        { name: "oreo", image: "https://uploads-ssl.webflow.com/60cd7ae35efaf14623f555c5/6373ed8f20fe1152e7f3861e_husky-service-dog-everything-you-need-to-know.jpg", status: true, id: "0002", birthday: "2022-05-03", breed: "Husky siberiano", gender: "mas", observations: "Oreo é um verdadeiro artista do uivo! Seus vocais noturnos podem até incomodar os vizinhos, mas não há como negar que ele sabe como expressar sua paixão pela música... ops, quer dizer, pela vida selvagem!"},
        { name: "flor", image: "https://www.maria.pt/wp-content/uploads/2019/05/realgrumpycat_46527753_209715023270158_6705809054494225971_n.jpg", status: false, id: "0003", birthday: "2022-05-06", breed: "persa", gender: "fem", observations: "Não possui observações"},
        { name: "pantera", image: "https://www.petz.com.br/blog/wp-content/uploads/2020/07/gata-gravida-felino.jpg", status: false, id: "0004", birthday: "2022-05-06", breed: "mau egípcio", gender: "fem", observations: "Não possui observações" }
    ]

    const historys = 
    [
        {nameClinic: "PetVet", description: "Consulta Veterinária - Acompanhamento de rotina", date: "2023-06-15"},
        {nameClinic: "CliniCão", description: "Banho e Tosa - Serviço completo", date: "2023-06-20"},
        {nameClinic: "VetSaúde", description: "Cirurgia - Castração de gatos", date: "2023-07-01"},
        {nameClinic: "AnimalCare", description: "Consulta Veterinária - Atendimento emergencial", date: "2023-07-10"},
        {nameClinic: "PetHappy", description: "Tratamento Odontológico - Limpeza de tártaro", date: "2023-07-20"}
    ]
    historys.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <main className="flex min-h-screen">
            <NavbarTutor page={0} />
            <section className="flex-1">
                <Header />

                <main className="pl-10 pr-16 py-8 flex gap-5">
                    <section className="flex-1 bg-white px-6 py-8 rounded-2xl">
                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col gap-2 items-center">
                                <div className="w-40 h-40 rounded-full border-4 border-secundary overflow-hidden">
                                    <img src={pets[1].image} alt={pets[1].name} className="h-full w-full object-cover" />
                                </div>
                                <span
                                    className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                                >
                                    #{pets[1].id}
                                </span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[32px] font-bold uppercase flex gap-4 items-center">
                                    {pets[1].name} 
                                    {
                                        pets[1].gender == "mas" ? <GenderMale size={24} color="#8FB5FF" weight="bold"/> : <GenderFemale size={24} color="#FF8FCB" weight="bold"/>
                                    }
                                    {
                                        pets[1].status && <WarningCircle size={24} className="fill-red-error" weight="bold"/>
                                    }
                                </h3>
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <span className="font-bold text-lg">Idade: </span>
                                        <span>{pets[1].birthday}</span>
                                    </li>
                                    <li>
                                        <span className="font-bold text-lg">Raça: </span>
                                        <span>{pets[1].breed}</span>
                                    </li>
                                    <li>
                                        <span className="font-bold text-lg">Status: </span>
                                        <span>{pets[1].status ? "Não saudável" : "Saudável"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <section>
                                <h3 className="text-2xl font-semibold mb-3">Observações</h3>
                                <p className="text-zinc-800 leading-relaxed text-base">
                                    {pets[1].observations}
                                </p>
                            </section>
                            <section>
                                <h3 className="text-2xl font-semibold mb-3">Histórico</h3>
                                <div className="flex flex-col gap-4">
                                    {
                                        historys.map((history)=>{
                                            return(
                                                <div className="w-full bg-[#F5FFFE] rounded py-3 px-6 flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <strong className="font-bold text-base">{history.nameClinic}</strong>
                                                        <p className="text-xs mt-2">
                                                            {
                                                                history.description
                                                            }
                                                        </p>
                                                    </div>
                                                    <span>
                                                        {history.date}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                        </div>
                    </section>
                    <section className="w-64 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5 h-max">
                        <h3 className="text-2xl font-semibold">
                            Meus pets
                        </h3>

                        <div className="flex flex-col gap-3">
                            {
                                pets.map((pet) => {
                                    return (
                                        <div className="flex gap-2 items-center">
                                            <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                                                <img
                                                    src={pet.image}
                                                    alt={pet.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <span className="text-lg font-semibold capitalize">{pet.name}</span>
                                            {
                                                pet.status && <WarningCircle className="fill-red-error" size={16} weight="bold" />
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="flex gap-4 mx-auto mt-4 cursor-pointer">
                            <PlusCircle size={24} weight="bold" className="fill-primary" />
                            <span className="text-primary">Adicionar</span>
                        </div>
                    </section>
                </main>
            </section>
        </main>
    )
}