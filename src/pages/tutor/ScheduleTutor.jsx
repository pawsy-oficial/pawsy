import useTopToScreen from "../../hook/useTopToScreen";
import { Switch } from "../../components/inputsComponents";
import { CaretLeft, DotsThreeVertical, PlusCircle } from "@phosphor-icons/react";
import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";
import { useState } from "react";
import ScheduleNotFound from "../../components/scheduleNotFound";

export default function ScheduleTutor() {
    useTopToScreen()
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

                <main className={`mx-6 lg:ml-10 px-3 py-5 md:p-10 rounded-lg bg-white mb-16 shadow-md lg:max-w-6xl ${!handlePage && "mt-10"}`}>

                    {
                        handlePage
                            ? <NewSchedule /> // true 
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

            <section className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 mt-4 mb-10">
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
                <CardSchedule deleteButton={true} clinicName={"fulano PET"} scheduleDate={"2023-07-28"} scheduleHour={"13:00"} vetName={"Yuri Bernadi"} scheduleType={"consulta"} logoVet={"https://placehold.co/600x400"} />
            </section>

            <button
                className="flex gap-3 items-center text-primary"
                onClick={() => { alterNewSchedulePage(true) }}
            >
                <PlusCircle size={24} weight="bold" className="fill-primary" />
                <span className="font-bold">agendar uma nova consulta</span>
            </button>
        </>
    )
}

const schedules =
    [
        {
            date: "2023-07-01",
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
                    type: "exame",
                    veterinaryName: "Aleh Silva 5",
                    hour: "00:00"
                }
            ]
        },
        {
            date: "2023-07-02",
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


function NewSchedule() {
    const date = new Date()
    const dayCurrent = date.getDate()
    const monthCurrent = (date.getMonth()+1).toString().padStart(2,0)
    const yearCurrent = date.getFullYear()

    const [handleSwitch, setHandleSwitch] = useState(false)
    const [dateCurrent, setDateCurrent] = useState(`${yearCurrent}-${monthCurrent}-${dayCurrent}`)
    const [typeSchedule, setTypeSchedule] = useState("consulta")


    function handleFilterSchedule() {
        const filterSchedule = schedules.filter(schedule => schedule.date == date)

        return filterSchedule.length < 1
            ? <ScheduleNotFound mesage={"Infelizmente, não há horários disponíveis para a data selecionada. Por favor, escolha outra data."}/>
            : filterSchedule.map((scheduleFilter) => {
                const filterTypeSchedule = scheduleFilter.schedules.filter(a => a.type == typeSchedule)
                return filterTypeSchedule.length < 1
                    ? <ScheduleNotFound mesage={"Infelizmente, não há agendas para esse tipo nessa data escolhida, escolha outra data."} />
                    : filterTypeSchedule.map(e => {
                        return (
                            <CardSchedule
                                clinicName={e.clinicName}
                                logoVet={e.clinicLogo}
                                scheduleDate={scheduleFilter.date}
                                scheduleHour={e.hour}
                                scheduleType={e.type}
                                vetName={e.veterinaryName}
                            />
                        )
                    })

            })

    }

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
                            disabled={handleSwitch}
                            onBlur={(e) => { setDateCurrent(e.target.value) }}
                            value={dateCurrent}
                            className="border-2 disabled:opacity-20 transition-all border-primary rounded px-1 bg-[#F5FFFE]"
                        />
                    </div>
                    <div className="flex justify-between gap-4 w-full md:w-auto">
                        <label className="text-base" htmlFor="selectTypeSchedule">Tipo do agendamento:</label>
                        <select
                            id="selectTypeSchedule"
                            className="md:w-40 px-2 md:px-6 border border-primary rounded bg-[#F5FFFE] focus:border-2 active:outline-none focus-visible:outline-none"
                            onChange={(e) => setTypeSchedule(e.target.value)}
                        >
                            <option value="consulta">Consulta</option>
                            <option value="exame">Exame</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between gap-4 w-full md:justify-start">
                    <label className="text-base" htmlFor="allDateSchedule">Mostrar todos os dias:</label>
                    <Switch state={setHandleSwitch} defaultState={true} />
                </div>
            </section>

            <section>
                <strong className="text-sm mt-6 block font-semibold font-lato">Disponíveis para essa data</strong>

                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 mt-4">
                    {
                        handleSwitch
                            ? (
                                schedules.map(schedule => {
                                    return (
                                        schedule.schedules.filter((schedule) => {
                                            return schedule.type == typeSchedule
                                        }).map(e => {
                                            return (
                                                <CardSchedule clinicName={e.clinicName} logoVet={e.clinicLogo} scheduleDate={schedule.date} scheduleHour={e.hour} scheduleType={e.type} vetName={e.veterinaryName} />
                                            )
                                        })
                                    )
                                })
                            )
                            : (
                                handleFilterSchedule()
                            )

                    }
                </div>
            </section>
        </>
    )
}

function CardSchedule({ deleteButton, logoVet, clinicName, scheduleDate, scheduleHour, scheduleType, vetName }) {
    return (
        <div className={`flex relative gap-2 shadow-md rounded-lg p-3 sm:w-full ${!deleteButton && "cursor-pointer"} bg-[#f8fffc]`}>
            {
                deleteButton && (
                    <button className="absolute right-2 top-2">
                        <DotsThreeVertical size={24} weight="bold" color="#000" />
                    </button>
                )
            }
            <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={logoVet} alt={`Logo ${clinicName}`} className="object-cover w-full h-full" />
            </div>

            <div className="flex flex-col gap-3">
                <strong className="text-base">{clinicName}</strong>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3 text-sm">
                        <span>{scheduleDate}</span>
                        <span className="font-bold">{scheduleHour}</span>
                    </div>
                    <span className="font-bold text-sm">{scheduleType}</span>

                    <p className="text-sm text-primary underline">{vetName}</p>
                </div>
            </div>
        </div>
    )
}