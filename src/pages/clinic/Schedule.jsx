import { CaretLeft, PlusCircle, Trash } from "@phosphor-icons/react";
import Calendar from "../../components/componentsClinic/calendar/Calendar";
import { ContainerMonthSchedule, TimeLineSchendule } from "../../components/componentsClinic/containerSchedule/ContainerSchedule";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { InputDropDown } from "../../components/inputsComponents";
import HomeSchedule from "../../components/componentsClinic/homeSchedule/HomeSchedule";
import { PatientContainerSchedule } from "../../components/componentsClinic/patientContainer/PatientContainer";

const veterinaryNameDataBase = ["Vanessa Santos", "Leonardo Nabio", "Thereza Soares"]


export default function Schedule() {
    const [pageContent, setPageContent] = useState(0)
    const [allSchendule, setAllSchendule] = useState(false)

    function PageSelect({ page }) {

        switch (pageContent) {
            case 0:
                return <HomeSchedule alterPage={setPageContent}/>
            case 1:
                return <FormNewSchedule alterPage={setPageContent}/>
            case 2:
                return <AllSchenduleComponent alterPage={setPageContent} activeMenu={setAllSchendule}/>
            case 3:
                return <PatientContainerSchedule alterPage={setPageContent}/>
        }
    }

    return (
        <main className="flex min-h-screen">
            <NavbarClinic page={0} />

            <section className="flex-1">
                <Header />
                <section className="p-8">
                    <div className="flex gap-5">
                        <section className={`flex-1 ${allSchendule ? "" : "max-w-5xl"}`}>
                            <PageSelect page={pageContent}/>
                        </section>
                        {
                            !allSchendule && (
                                <article className="w-[348px] flex flex-col items-center gap-6 sticky top-6 h-max">
                                    <Calendar page={setPageContent} />

                                    <button
                                        className="bg-[#22937E] w-full rounded-lg px-6 py-2 gap-4 flex items-center cursor-pointer disabled:cursor-default disabled:opacity-25"
                                        onClick={() => {
                                            setPageContent(1)
                                        }}
                                        disabled={(pageContent == 0 || pageContent == 3) ? false : true}
                                    >
                                        <PlusCircle color="#fff" size={24} weight="bold" />
                                        <p className="text-white">Criar nova agenda</p>
                                    </button>

                                    <div 
                                        className="text-base self-start cursor-pointer" 
                                        onClick={() => {
                                            setAllSchendule(true)
                                            setPageContent(2)
                                        }}>
                                            Ver todas agendas
                                        </div>
                                </article>
                            )
                        }
                    </div>
                </section>
            </section>
        </main>
    )
}

function FormNewSchedule({alterPage}) {
    const [veterinaryName, setVeterinaryName] = useState([])
    const [addNewRestriction, setAddNewRestriction] = useState([])
    useEffect(() => {
        setVeterinaryName(veterinaryNameDataBase)
    }, [])

    const [valueTextArea, setValueTextArea] = useState("")
    const [sectionAddVeterinary, setSectionAddVeterinary] = useState([""])

    function heandleAddSection(){
        setSectionAddVeterinary([...sectionAddVeterinary, ""])
    }
    function heandleAddRestriction(){
        setAddNewRestriction([...addNewRestriction, ""])
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
                        <strong className="text-base font-lato font-normal">Data de fechamento</strong>
                        <input type="text" className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" placeholder="__:__" />
                    </div>
                </div>
                

                <div className="flex flex-col items-center justify-center gap-6">
                    <button onClick={heandleAddRestriction} className="text-zinc-800 underline cursor-pointer" >Possui alguma restrição de horário ou data?</button>
                    {
                        addNewRestriction.map((a,i)=>{
                            // console.log(addNewRestriction, "ok");
                            return( <AddNewRestriction restrictionControl={setAddNewRestriction} restrictions={addNewRestriction} index={i} value={a}/>)
                        })
                    }
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
                    sectionAddVeterinary.length == 0 && <span className="text-zinc-400 text-center">Adicione um médico veterinário para sua nova agenda</span>
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


function AddNewRestriction({restrictionControl, index, restrictions, value}){
    const [inputValue, setInputValue] = useState(value)
    
    useEffect(()=>{
        setInputValue(value)
    },[value])


    function heandleRemoveRestriction(i){
        const restriction = [...restrictions]
        restriction.splice(i, 1)
        restrictionControl(restriction)
    }
    function handleInputRestriction(){
        let allArr = []
        allArr.push(...restrictions)
        allArr.push(inputValue)
        allArr.splice(index, 1)
        restrictionControl(allArr)
    }

    return(
        <div className="flex justify-center gap-6">
            <div className="flex flex-col gap-1">
                <strong className="text-base font-lato font-normal">Data da restrição</strong>
                <div className="flex">
                    <input 
                        type="text" 
                        className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]" 
                        placeholder="__/__/____" 
                        onChange={(e)=>setInputValue(e.target.value)}
                        onBlur={handleInputRestriction}
                        value={inputValue}
                    />
                    <button
                        onClick={()=>heandleRemoveRestriction(index)}
                        className="cursor-pointer flex items-center justify-center bg-primary text-white rounded-tr-lg rounded-br-lg px-4 -translate-x-1"
                    >
                        <Trash weight={"bold"} size={20}/>
                    </button>
                </div>
            </div>
        </div>
    )
}


function AllSchenduleComponent({alterPage, activeMenu}){
    const years = [2020, 2021, 2022, 2023]

    return(
        <section className="w-full flex flex-col gap-10 items-start">
            <button 
                onClick={()=>{
                    alterPage(0)
                    activeMenu(false)
                }}
                className="flex gap-2 items-center"
            >
                <CaretLeft size={16} weight="bold"/>
                Voltar
            </button>

            <div className="flex gap-4">
                {
                    years.map((year, index) => {
                        return(
                            <div key={index}>
                                <TimeLineSchendule year={year} index={index}/>
                            </div>
                        )
                    })
                }
            </div>

            <div className="grid grid-cols-3 gap-6 w-full">
                <ContainerMonthSchedule month={"Janeiro"}/>       
                <ContainerMonthSchedule month={"Fevereiro"}/>       
                <ContainerMonthSchedule month={"Abril"}/>       
                <ContainerMonthSchedule month={"Junho"}/>       
                <ContainerMonthSchedule month={"Julho"}/>       
            </div>
        </section>
    )
}