import PostBox from "../../components/cardsAndBoxes/postBox";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { ModalSeeMedic } from "../../components/ClinicPerfilComponents/ModalSeeMedic";
import { CommentsForClinic } from "../../components/ClinicPerfilComponents/CommentsForClinic";
import { ModalAddMedic } from "../../components/ClinicPerfilComponents/ModalAddMedic";
import ClientsPerfil, { Avaliation, VaccinePets } from "../../components/cardsAndBoxes/cardClinicProfile";
import MedicForClinic from "../../components/ClinicPerfilComponents/MedicForClinic";
// import Post1 from "../../components/CardPosts/Posts";

import frajola from '../../img/frajola.jpg'
import dog from '../../img/post1.svg'
import gato from '../../img/gato.jpg'
import caramelo from '../../img/caramelo.jpg'

import { PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";


export default function Perfil() {
    const [open, setOpen] = useState(false)
    const [see, setSee] = useState(false)

    const clinica = [
        { nameClinic: "Petz", imageClinic: "https://pbs.twimg.com/profile_images/1489579803846090758/PI8ujLgX_400x400.jpg" }
    ]
    const infos = [
        { endereco: "Rua José Lobo Viana, 173", telefone: "(13)3203-3766", email: "petzco@petz.com", funcionamento: "Das 7:00 ás 21:00" }
    ]
    return (
        <main className="flex min-h-screen">
            <NavbarClinic page={3} />
            <section className="flex-1">
                <Header userType={"clinica"} />
                <main className="pl-10 pr-16 py-8 flex gap-5">
                    <div className="flex gap-5">
                        <ClientsPerfil />
                        <VaccinePets />
                        <Avaliation />
                    </div>
                </main>
                <main className="pl-10 pr-16 py-8 flex gap-5">
                    <section className="flex-1 flex flex-col bg-white px-6 py-8 rounded-2xl">
                        <section className="flex justify-between">
                            <div className="flex items-center">
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
                            </div>
                            <button
                                className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90"
                            >
                                Editar perfil
                            </button>
                        </section>
                        <div className="flex flex-col">
                            <h2 className="mt-4 font-bold text-lg pb-2">
                                Sobre nós
                            </h2>
                            <p className="text-sm font-normal ">
                                A nossa clínica veterinária está no mercado desde 1930, oferecendo atendimento de qualidade e carinho aos animais. Somos especializados em cuidar da saúde e bem-estar de cães, gatos e outros pets. Possuímos uma equipe de profissionais altamente qualificados, que trabalham com tecnologia de ponta para diagnósticos precisos e tratamentos eficazes. Nosso objetivo é proporcionar o melhor atendimento para o seu pet, desde consultas de rotina até cirurgias e internações. Além disso, contamos com serviços de banho e tosa, pet shop e venda de produtos de qualidade para a manutenção da saúde dos animais. Venha nos visitar e conheça a nossa história de amor e dedicação aos pets.
                            </p>
                        </div>
                        <div className="mnegative flex flex-col">
                            <h2 className="font-bold text-lg pb-2">
                                Anúncios
                            </h2>
                            <p className="text-sm font-normal pl-3">
                                Você não criou nenhum anúncio <a className="text-[#22937E] underline" href="">criar anúncio</a>
                            </p>
                        </div>

                        <section className="mt-4 flex flex-col">
                            <h2 className="font-bold text-lg mb-2">
                                Posts
                            </h2>
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                                    <PostBox img={frajola} name={"Frajola"} />
                                    <PostBox img={dog} name={"Tob"} />
                                    <PostBox img={caramelo} name={"Caramelo"} />
                                    <PostBox img={gato} name={"Gato"} />
                                </div>
                                <div className="justify-center flex w-full gap-2">
                                    <input type="radio" name="anchorPost" defaultChecked={true} className=" border-2 border-primary bg-primary w-6 h-6 rounded-full" />
                                    <input type="radio" name="anchorPost" className=" border-2 border-primary w-6 h-6 rounded-full" />
                                    <input type="radio" name="anchorPost" className="border-2 border-primary  w-6 h-6 rounded-full" />
                                </div>
                            </div>
                        </section>
                    </section>
                    <aside className="flex flex-col gap-10">
                        <section className="w-96 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5 h-max">
                            <h1 className="font-bold text-lg">Médicos veterinários</h1>
                            <div>
                                <button onClick={() => setSee(!see)} type="">
                                    <MedicForClinic />
                                </button>
                                <ModalSeeMedic isSee={see} setSee={setSee} />
                            </div>
                            <div className="flex w-full justify-center">
                                <button onClick={() => setOpen(!open)} type="" className="flex gap-2">
                                    <PlusCircle size={24} color="#22B77E" />
                                    <p className="text-primary font-bold">Adicionar</p>
                                </button>
                                <ModalAddMedic isOpen={open} setOpen={setOpen} />
                            </div>
                        </section>
                        <section className="w-96 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5 h-max">
                            <h1 className="font-bold text-lg">Comentários</h1>
                            <CommentsForClinic />
                            <CommentsForClinic />
                            <CommentsForClinic />
                        </section>
                    </aside>
                </main>
            </section>
        </main>
    )
}