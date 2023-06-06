import { CaretLeft, PlusCircle, Trash } from "@phosphor-icons/react";
import Calendar from "../../components/componentsClinic/calendar/Calendar";
import ContainerSchedule from "../../components/componentsClinic/containerSchedule/ContainerSchedule";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { InputDropDown } from "../../components/componentsClinic/Input";

const veterinaryNameDataBase = ["Vanessa Santos", "Leonardo Nabio", "Thereza Soares"]


export default function Schedule() {
    const [pageContent, setPageContent] = useState(0)
    function PageSelect({ page }) {

        switch (pageContent) {
            case 0:
                return <HomeSchedule />
            case 1:
                return <FormNewSchedule alterPage={setPageContent}/>
        }
    }

    return (
        <main className="flex min-h-screen">
            <NavbarClinic page={0} />

            <section className="flex-1">
                <Header />
                <section className="p-8">
                    <div className="flex gap-5">
                        <section className="flex-1 max-w-5xl">
                            <PageSelect page={pageContent}/>
                        </section>
                        <article className="w-[348px] flex flex-col items-center gap-6">
                            <Calendar page={setPageContent} />

                            <button
                                className="bg-[#04AD34] w-full rounded-lg px-6 py-2 gap-4 flex items-center cursor-pointer disabled:cursor-default disabled:opacity-25"
                                onClick={() => {
                                    setPageContent(1)
                                }}
                                disabled={pageContent != 0 && true}
                            >
                                <PlusCircle color="#fff" size={24} weight="bold" />
                                <p className="text-white">Criar nova agenda</p>
                            </button>

                            <div className="text-base self-start" onClick={() => setPageContent(0)}>Ver todas agendas</div>
                        </article>
                    </div>
                </section>
            </section>
        </main>
    )
}

function HomeSchedule() {
    return (
        <>
            <h2 className="font-bold text-[32px]">1 - 10 de abril de 2023</h2>
            <ContainerSchedule date={"2023-04-01"} />
            <ContainerSchedule date={"2023-04-02"} />
            <ContainerSchedule date={"2023-04-05"} />
        </>
    )
}

function FormNewSchedule({alterPage}) {
    const [veterinaryName, setVeterinaryName] = useState([])
    useEffect(() => {
        setVeterinaryName(veterinaryNameDataBase)
    }, [])

    const [valueTextArea, setValueTextArea] = useState("")
    const [sectionAddVeterinary, setSectionAddVeterinary] = useState([""])

    function heandleAddSection(){
        setSectionAddVeterinary([...sectionAddVeterinary, ""])
    }

    function heandleRemoveSection(){
        const remove = [...sectionAddVeterinary]
        remove.pop()
        setSectionAddVeterinary(remove)
    }

    return (
        <div className="max-w-2xl">
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={()=>{alterPage(0)}}
            >
                <CaretLeft/>
                <span>Voltar</span>
            </div>
            <h1 className="font-sora font-bold text-[32px]">Nova agenda</h1>

            <TitleSectionForm title={"Período da agenda"} description={"Informe o período em que a agenda ficará disponível para agendamento."} />

            <section className="border border-zinc-500 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg p-3 flex flex-col gap-3 w-full">
                <div className="flex justify-center gap-6">
                    <div className="flex flex-col gap-1">
                        <strong className="text-base font-lato font-normal">Data de abertura</strong>
                        <input type="text" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" placeholder="__/__/____" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <strong className="text-base font-lato font-normal">Hora de abertura</strong>
                        <input type="text" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" placeholder="__:__" />
                    </div>
                </div>
                <div className="flex justify-center gap-6">
                    <div className="flex flex-col gap-1">
                        <strong className="text-base font-lato font-normal">Data de abertura</strong>
                        <input type="text" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" placeholder="__/__/____" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <strong className="text-base font-lato font-normal">Hora de abertura</strong>
                        <input type="text" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" placeholder="__:__" />
                    </div>
                </div>
            </section>

            <TitleSectionForm title={"Veterinário"} description={"Adicione o nome do veterinário, sua especialidade e os dias e horários disponíveis para atendimento."} />

            <div className="flex flex-col gap-6">
                {
                    sectionAddVeterinary.map(() => {
                        return <SectionAddVeterinary names={veterinaryName}/>
                    })
                }
                {
                    sectionAddVeterinary.length == 0 && <span className="text-zinc-400 text-center">Adicione um médico veterinário para sua nova consulta</span>
                }
                <div className="w-full flex justify-center gap-6 text-primary font-lato font-bold">
                    <span className="cursor-pointer" onClick={heandleAddSection}>adicionar mais</span>
                    <span className="cursor-pointer" onClick={heandleRemoveSection}>remover</span>
                </div>
            </div>

            <TitleSectionForm title={"Observação"} description=""/>

            <div className="w-full relative">
                <textarea 
                    name="" id="" cols="30" rows="5" 
                    className="resize-none w-full focus:border-primary focus:outline-primary p-2 rounded min-h-32" 
                    onInput={(e)=>{
                        const count = e.target.value.length
                        count <= 200 && setValueTextArea(e.target.value)
                    }}
                    value={valueTextArea}
                />
                <span className="absolute right-2 bottom-2 font-lato text-zinc-400">{valueTextArea.length}/200</span>
            </div>

            <div className="w-full flex justify-center mt-10">
                <button className="px-6 py-2 bg-primary rounded-lg text-white font-semibold">SALVAR</button>
            </div>
        </div>
    )
}

function TitleSectionForm({ title, description }) {
    return (
        <div className="flex flex-col mb-2 mt-8">
            <h3 className="font-lato font-semibold text-2xl">{title}</h3>
            <p>{description}</p>
        </div>
    )
}

function SectionAddVeterinary({names}) {
    const week = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "sábado"]

    return (
        <section className="border border-zinc-500 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg p-3 flex flex-col gap-3 w-full group">
            <div className="flex justify-center gap-6">
                <label className="flex flex-col gap-1">
                    <strong className="text-base font-lato font-normal">Veterinário</strong>
                    <select name="" id="" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px] focus:outline-primary">
                        {
                            names.map(e => {
                                return (
                                    <option value={e}>
                                        {e}
                                    </option>
                                )
                            })
                        }
                    </select>
                </label>
                <label className="flex flex-col gap-1">
                    <strong className="text-base font-lato font-normal">Especialidade</strong>
                    <input type="text" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" placeholder="__:__" />
                </label>
            </div>
            <div className="flex justify-center gap-6">
                <InputDropDown listData={week} />
                <label className="flex flex-col gap-1">
                    <strong className="text-base font-lato font-normal">Horario disponível</strong>
                    <input type="text" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" placeholder="__:__" />
                </label>
            </div>
        </section>
    )
}