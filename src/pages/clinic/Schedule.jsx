import { CaretLeft, PlusCircle, Trash } from "@phosphor-icons/react";
import Calendar from "../../components/componentsClinic/calendar/Calendar";
import { ContainerMonthSchedule, TimeLineSchendule } from "../../components/componentsClinic/containerSchedule/ContainerSchedule";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { InputDropDown } from "../../components/inputsComponents";
import HomeSchedule from "../../components/componentsClinic/homeSchedule/HomeSchedule";
import { PatientContainerSchedule } from "../../components/componentsClinic/patientContainer/PatientContainer";
import FormNewSchedule from "../../components/forms/FormNewSchedule";
import Cookies from "js-cookie";
import axios from "axios";




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
                <Header userType={"clinica"} />
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



function AllSchenduleComponent({alterPage, activeMenu}) {
    const years = [2023];

    const [allSchendules, setAllSchendules] = useState([]);

    useEffect(() => {
        const getId = async () => {
            const jwtTokenClinic = Cookies.get('jwtTokenClinic');
            try {
                const responseClinic = await axios.get(import.meta.env.VITE_URL + '/profileClinic', {
                    headers: {
                        'Authorization': 'Bearer ' + jwtTokenClinic
                    }
                });

                const cd_clinica = responseClinic.data.storedIdClinica;

                axios.get(`${import.meta.env.VITE_URL}/list-schedules/${cd_clinica}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtTokenClinic
                    }
                }).then(e => setAllSchendules(e.data)).catch(err => console.log(err));
            } catch (error) {
                console.log(error);
            }
        };

        getId();
    }, []);

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
                {
                    allSchendules.length == 0 
                    ? <p className="text-zinc-500">A clínica não possui agendas cadastrados</p>
                    : allSchendules.map(ag => {
                        return <ContainerMonthSchedule 
                        idAgenda={ag.idAgenda} 
                        idClinica={ag.idClinica} 
                        abertura={ag.dtAbertura} 
                        fechamento={ag.dtFechamento} 
                        nome={ag.nmAgenda} 
                        obs={ag.obs}/>   
                    })
                }
            </div>
        </section>
    )
}