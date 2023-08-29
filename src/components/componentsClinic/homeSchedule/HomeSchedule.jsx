import { ContainerSchedule } from "../containerSchedule/ContainerSchedule"
import dayjs from "dayjs"

const dataBaseJuny =
    [
        {
            startDate: "2023-06-01",
            endDate: "2023-06-05",
            info: [
                {
                    date: "2023-06-01",
                    appointments: [
                        {
                            tutorName: "Fernanda Almeida",
                            veterinaryName: "Vanessa Santos",
                            hours: "10:00:00",
                        },
                        {
                            tutorName: "Lucas Oliveira",
                            veterinaryName: "Leonardo Nabio",
                            hours: "11:30:00",
                        },
                        {
                            tutorName: "Carolina Souza",
                            veterinaryName: "Thereza Soares",
                            hours: "15:00:00",
                        }
                    ]
                },
                {
                    date: "2023-06-02",
                    appointments: [
                        {
                            tutorName: "Ana Silva",
                            veterinaryName: "Vanessa Santos",
                            hours: "14:30:00",
                        }
                    ]
                }
            ]
        },
        {
            startDate: "2023-06-15",
            endDate: "2023-06-25",
            info: [
                {
                    date: "2023-06-15",
                    appointments: [
                        {
                            tutorName: "Rafael Mendes",
                            veterinaryName: "Thereza Soares",
                            hours: "09:00:00",
                        },
                        {
                            tutorName: "Camila Santos",
                            veterinaryName: "Leonardo Nabio",
                            hours: "13:30:00",
                        },
                        {
                            tutorName: "Pedro Rocha",
                            veterinaryName: "Vanessa Santos",
                            hours: "16:00:00",
                        }
                    ]
                },
                {
                    date: "2023-06-20",
                    appointments: [
                        {
                            tutorName: "Julia Costa",
                            veterinaryName: "Vanessa Santos",
                            hours: "11:00:00",
                        }
                    ]
                },
                {
                    date: "2023-06-20",
                    appointments: [
                        {
                            tutorName: "Julia Costa",
                            veterinaryName: "Vanessa Santos",
                            hours: "11:00:00",
                        },
                        {
                            tutorName: "Julia Costa",
                            veterinaryName: "Vanessa Santos",
                            hours: "11:20:00",
                        },
                        {
                            tutorName: "Julia Costa",
                            veterinaryName: "Vanessa Santos",
                            hours: "11:30:00",
                        },
                        {
                            tutorName: "Julia Costa",
                            veterinaryName: "Vanessa Santos",
                            hours: "11:40:00",
                        },
                    ]
                }
            ]
        }
    ]


export default function HomeSchedule({alterPage}) {
    return (
        <>
            {
                dataBaseJuny.map((period, index) => {
                    return (
                        <section className="mb-6" key={index}>
                            <h2 className="font-bold text-[32px]">{dayjs(period.startDate).format("DD MMM")} - {period.endDate}</h2>
                            {
                                period.info.map(data => {
                                    return <ContainerSchedule date={data.date} appointments={data.appointments} alterPage={alterPage}/>
                                })
                            }
                        </section>
                    )
                })
            }
        </>
    )
}
