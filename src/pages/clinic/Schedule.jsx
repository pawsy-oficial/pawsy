import { PlusCircle } from "@phosphor-icons/react";
import Calendar from "../../components/componentsClinic/calendar/Calendar";
import ContainerSchedule from "../../components/componentsClinic/containerSchedule/ContainerSchedule";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { useEffect, useState } from "react";

export default function Schedule() {
    const [pageContent, setPageContent] = useState(0)
    const content = [HomeSchedule, FormNewSchedule]
    
    function PageSelect({page}){
        
        switch (pageContent) {
            case 0:
                return <HomeSchedule/>
            case 1:
                return <FormNewSchedule/>
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
                            <Calendar page={setPageContent}/>

                            <div 
                                className="bg-[#04AD34] w-full rounded-lg px-6 py-2 gap-4 flex items-center cursor-pointer"
                                onClick={()=>setPageContent(1)}
                            >
                                <PlusCircle color="#fff" size={24} weight="bold" />
                                <p className="text-white">Criar nova agenda</p>
                            </div>

                            <div className="text-base self-start" onClick={()=>setPageContent(0)}>Ver todas agendas</div>
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

function FormNewSchedule(){
    return(
        <h1>FORM</h1>
    )
}