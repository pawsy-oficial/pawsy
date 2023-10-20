import useTopToScreen from "../../hook/useTopToScreen";
import { Switch } from "../../components/inputsComponents";
import { CaretLeft, PlusCircle } from "@phosphor-icons/react";
import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";
import { useEffect, useState } from "react";
import ScheduleNotFound from "../../components/scheduleNotFound";
import CardSchedule, { CardClinics } from "../../components/cardsAndBoxes/cardSchedule";
import useCheckedPet from "../../hook/useCheckedPet";
import axios from "axios";
import Cookies from "js-cookie";
import ReactDOM from 'react-dom';
import Pagination from "../../components/pagination";

const SCHEDULES =
    [
        {
            date: "2023-08-09",
            schedules: [
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva 1",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva 2",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva 3",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva 4",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "internação",
                    veterinaryName: "Aleh Silva 5",
                    hour: "00:00"
                }
            ]
        },
        {
            date: "2023-08-24",
            schedules: [
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva",
                    hour: "00:00"
                },
                {
                    clinicName: "ZNVet",
                    clinicLogo: "https://placehold.co/600x400",
                    type: "consulta",
                    veterinaryName: "Aleh Silva",
                    hour: "00:00"
                }
            ]
        }
    ]

export default function ScheduleTutor() {
    useTopToScreen()
    useCheckedPet()
    const [handlePage, setHandlePage] = useState(false)

    return (
        <main className="flex min-h-screen">
            <NavbarTutor page={2} />
            <section className="flex-1">
                <Header userType={"tutor"} />

                {
                    handlePage && (
                        <a
                            className="flex items-center ml-10 text-sm cursor-pointer my-5 group"
                            onClick={() => setHandlePage(false)}
                        >
                            <CaretLeft className="group-hover:text-primary" />
                            Voltar
                        </a>
                    )
                }

                <main className={`mx-6 lg:ml-10 px-3 py-5 md:p-10 rounded-lg bg-white mb-16 shadow-md lg:max-w-6xl xl:max-w-7xl ${!handlePage && "mt-10"}`}>

                    {
                        handlePage
                            ? <AvailableClinics /> // true 
                            : <MySchedules alterNewSchedulePage={setHandlePage} /> // false
                    }

                </main>
            </section>
        </main>
    )
}

function MySchedules({ alterNewSchedulePage }) {
    return (
        <>
            <strong className="text-2xl font-lato font-semibold">Minhas agendas</strong>

            <button
                className="flex gap-3 items-center text-primary hover:bg-primary/20 p-1 rounded-lg mt-2"
                onClick={() => { alterNewSchedulePage(true) }}
            >
                <PlusCircle size={24} weight="bold" className="fill-primary" />
                <span className="font-bold">agendar uma nova consulta</span>
            </button>

            <section className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 my-10">
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
            </section>

        </>
    )
}

function AvailableClinics() {
    const [pageControll, setPageControll] = useState({
        newSchedule: false,
        idClinic: 1
    })

    return (
        <>
            {
                !pageControll.newSchedule
                    ? (
                        <>
                            <strong className="text-2xl font-lato font-semibold">Clínicas disponíveis</strong>

                            <section className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 my-10">
                                <CardClinics pageControll={setPageControll} />
                            </section>
                        </>
                    )
                    : (
                        <NewSchedule pageControll={setPageControll} />
                    )
            }
        </>
    )
}

function NewSchedule({ pageControll }) {
    const date = new Date()
    const dayCurrent = date.getDate().toString().padStart(2, 0)
    const monthCurrent = (date.getMonth() + 1).toString().padStart(2, 0)
    const yearCurrent = date.getFullYear()

    const [typesConsultation, setTypesConsultation] = useState([])
    const [handleSwitch, setHandleSwitch] = useState(false)
    const [dateCurrent, setDateCurrent] = useState(`${yearCurrent}-${monthCurrent}-${dayCurrent}`)
    const [typeSchedule, setTypeSchedule] = useState("consulta")
    const [medicsInfo, setMedicInfo] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/get-all-consultation`)
            .then(res => setTypesConsultation(res.data.response))
            .catch(err => console.log(err))

        axios.get(`${import.meta.env.VITE_URL}/get-medicosIntegrados-schedule?idClinica=1`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtTokenTutor")}`
            }
        })
            .then(res => setMedicInfo(res.data))
            .catch(err => console.log(err))
    }, [])

    // function handleFilterSchedule() {
    //     const filterSchedule = SCHEDULES.filter(schedule => schedule.date == dateCurrent)

    //     return filterSchedule.length < 1
    //         ? <ScheduleNotFound mesage={"Infelizmente, não há horários disponíveis para a data selecionada. Por favor, escolha outra data."} />
    //         : filterSchedule.map((scheduleFilter) => {
    //             const filterTypeSchedule = scheduleFilter.schedules.filter(a => a.type == typeSchedule)
    //             return filterTypeSchedule.length < 1
    //                 ? <ScheduleNotFound mesage={"Infelizmente, não há agendas para esse tipo nessa data escolhida, escolha outra data."} />
    //                 : filterTypeSchedule.map(e => {
    //                     return (
    //                         <CreateNewScheduleModal
    //                             clinicName={e.clinicName}
    //                             logoVet={e.clinicLogo}
    //                             scheduleDate={scheduleFilter.date}
    //                             scheduleHour={e.hour}
    //                             scheduleType={e.type}
    //                             vetName={e.veterinaryName}
    //                         />
    //                     )
    //                 })

    //         })

    // }

    return (
        <>
            <strong className="text-2xl font-lato font-semibold">Nova agenda</strong>

            <section className="flex flex-col gap-2 md:gap-6 mt-4 pb-3 border-b border-zinc-400">
                <div className="flex flex-col md:flex-row md:items-center items-start gap-2 md:gap-10">
                    <div className="flex justify-between gap-4 w-full md:w-auto">
                        <label className="text-base" htmlFor="dateSchedule">Data:</label>
                        <input
                            type="date"
                            id="dateSchedule"
                            min={`${yearCurrent}-${monthCurrent}-${dayCurrent}`}
                            disabled={handleSwitch}
                            onChange={(e) => { setDateCurrent(e.target.value) }}
                            value={dateCurrent}
                            className="border-2 disabled:opacity-20 transition-all border-primary rounded px-1 bg-[#F5FFFE]"
                        />
                    </div>
                    <div className="flex justify-between gap-4 w-full md:w-auto flex-1">
                        <div
                            className="flex gap-2 items-center"
                        >
                            <label className="text-base" htmlFor="selectTypeConsultation">Tipo do agendamento:</label>
                            <select
                                id="selectTypeConsultation"
                                className="px-2 md:px-6 border border-primary rounded bg-[#F5FFFE] focus:border-2 active:outline-none focus-visible:outline-none capitalize"
                                onChange={(e) => setTypeSchedule(e.target.value)}
                            >
                                {
                                    typesConsultation.map(typeConsultation => {
                                        return (
                                            <option value={typeConsultation.id_tipo}>
                                                {
                                                    typeConsultation.nm_tipo
                                                }
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div
                            className="flex gap-2 items-center"
                        >
                            <label className="text-base" htmlFor="selectMedic">Médico veterinário:</label>
                            <select
                                id="selectMedic"
                                className="px-2 md:px-6 border border-primary rounded bg-[#F5FFFE] focus:border-2 active:outline-none focus-visible:outline-none capitalize"
                                onChange={(e) => setTypeSchedule(e.target.value)}
                            >
                                <option
                                    value="0"
                                    defaultChecked
                                    defaultValue={"0"}
                                >
                                    Todos
                                </option>
                                {
                                    medicsInfo.map(medic => {
                                        return (
                                            <option value={medic.codIntegracao}>
                                                {
                                                    medic.medicoIntegrado
                                                }
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-4 w-full md:justify-start">
                    <label className="text-base" htmlFor="allDateSchedule">Mostrar todos os dias:</label>
                    <Switch state={setHandleSwitch} defaultState={true} />
                </div>
            </section>

            <section>
                <strong className="text-sm mt-6 block font-semibold font-lato">Disponíveis para essa data</strong>
                <Pagination />
                <div className="flex flex-col w-full gap-6 mt-4">
                    {/* <ScheduleNotFound mesage={"Infelizmente, não há horários disponíveis para a data selecionada. Por favor, escolha outra data."} /> */}
                    <table
                        className="w-full cursor-default border-0"
                    >
                        <thead>
                            <tr className="border-none selection:bg-secundary">
                                <th className="py-1 border-none bg-primary text-white text-sm w-40 rounded-l-full">
                                    Médico
                                </th>
                                <th className=" py-1 border-none bg-primary text-white text-sm w-40">
                                    Data da consulta
                                </th>
                                <th className=" py-1 border-none bg-primary text-white text-sm w-40">
                                    Horário
                                </th>
                                <th className=" py-1 border-none bg-primary text-white text-sm w-40 rounded-r-full">
                                    Tipo
                                </th>
                            </tr>
                        </thead>
                        <tbody className="second line-colors border-0">
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                            <CreateNewScheduleModal />
                        </tbody>
                    </table>
                    {/* {
                        handleSwitch
                            ? (
                                SCHEDULES.map(schedule => {
                                    return (
                                        schedule.schedules.filter((schedule) => {
                                            return schedule.type == typeSchedule
                                        }).map(e => {
                                            return (
                                                <>
                                                    <CreateNewScheduleModal
                                                        clinicName={e.clinicName}
                                                        logoVet={e.clinicLogo}
                                                        scheduleDate={schedule.date}
                                                        scheduleHour={e.hour}
                                                        scheduleType={e.type}
                                                        vetName={e.veterinaryName}
                                                    />
                                                </>
                                            )
                                        })
                                    )
                                })
                            )
                            : (
                                handleFilterSchedule()
                            )
                    } */}


                </div>
            </section>
        </>
    )
}

function CreateNewScheduleModal({ clinicName, logoVet, scheduleDate, scheduleHour, scheduleType, vetName }) {

    const [showModalSchedule, setShowModalSchedule] = useState(false)

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden")
    }, [showModalSchedule])

    return (
        <>
            <tr
                className="border-none"
                role="button"
                onClick={() => setShowModalSchedule(!showModalSchedule)}
            >
                <td className="border-none rounded-l-full py-2">as</td>
                <td className="border-none py-2">222</td>
                <td className="border-none py-2">asd</td>
                <td className="border-none py-2 rounded-r-full">asd</td>
            </tr>
            {
                showModalSchedule && (
                    ReactDOM.createPortal(
                        <section
                            onClick={e => e.target.tagName == "SECTION" && setShowModalSchedule(false)}
                            className="fixed inset-0 bg-primary/40 z-[80] flex flex-col gap-6 justify-center"
                        >
                            <div
                                className="max-w-xl w-full self-center flex flex-col gap-6"
                            >
                                <article
                                    className="bg-white p-4 rounded-2xl flex flex-col max-w-xl"
                                >
                                    <div
                                        className="flex justify-between items-center gap-6"
                                    >
                                        <div
                                            className="flex items-center gap-2 pb-4"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary"
                                            >
                                                <img
                                                    src="https://placehold.co/600x400"
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                    draggable={false}
                                                />
                                            </div>

                                            <div
                                                className="flex flex-col"
                                            >
                                                <h3
                                                    className="text-lg font-lato font-bold"
                                                >
                                                    ZN Vet
                                                </h3>
                                                <span
                                                    className="text-zinc-500 font-lato text-sm"
                                                >
                                                    R. Sla das quantas, 855 - santos
                                                </span>
                                                <strong
                                                    className="text-emerald-500 font-lato text-sm underline"
                                                >
                                                    Mauricio Melo
                                                </strong>
                                            </div>
                                        </div>

                                        <div
                                            className="flex flex-col text-zinc-700 font-bold font-lato"
                                        >
                                            <span>
                                                07/11/2023
                                            </span>
                                            <span>
                                                07:00
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className="py-6 border-t border-zinc-200 flex flex-col items-center gap-2"
                                    >
                                        <span
                                            className="self-start text-zinc-600 text-base"
                                        >
                                            Agendar para:
                                        </span>
                                        <div
                                            className="w-40 h-40 rounded-full overflow-hidden border-2 border-secundary"
                                        >
                                            <img
                                                src="https://placehold.co/600x400"
                                                alt=""
                                                className="h-full w-full object-cover"
                                                draggable={false}
                                            />
                                        </div>
                                        <select
                                            className="px-2 md:px-6 border border-primary rounded bg-[#F5FFFE] focus:border-2 active:outline-none focus-visible:outline-none capitalize"
                                        >
                                            <option value="">d</option>
                                        </select>
                                    </div>


                                    <div
                                        className="flex justify-end gap-6 mt-6"
                                    >
                                        <button
                                            className="hover:bg-red-error w-full hover:text-white transition-all rounded py-1 px-4 text-red-error border border-red-error "
                                            onClick={()=>setShowModalSchedule(false)}
                                            title="cancelar agendamento"
                                            >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-green-600 rounded py-1 px-4 w-full text-white"
                                            onClick={()=>setShowModalSchedule(false)}
                                            title="aceitar o agendamento"
                                        >
                                            Agendar
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </section>,
                        document.body
                    )
                )
            }
        </>
    )
}