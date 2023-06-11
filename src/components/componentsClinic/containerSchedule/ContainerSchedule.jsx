import { Pencil, PlusCircle } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

export function ContainerSchedule({ date, appointments, alterPage }) {
    return (
        <div 
            className="flex flex-col gap-6 mt-6"
            onClick={()=>{alterPage(3)}}
        >
            <span className="text-2xl">{date}</span>
            <div className="flex gap-4 flex-col">
                {
                    appointments.map(appointment => {
                        return(
                            <div className={`bg-white w-full cursor-pointer hover:bg-secundary/10 transition-all duration-500 flex justify-between px-5 py-4 ${false && "line-through text-zinc-400"}`}>
                                <div className="flex gap-10">
                                    <p>{appointment.hours}</p>
                                    <p>{appointment.tutorName}</p>
                                </div>
                                <p>Dr. {appointment.veterinaryName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export function ContainerMonthSchedule({month}) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const date = new Date()
    const currentMonth = date.getMonth()
    const indexCurrentMonth = months.indexOf(month)

    const [activeContainer, setActiveContainer] = useState(false)
    const [activeEdit, setActiveEdit] = useState(false)

    useEffect(()=>{
        if(currentMonth == indexCurrentMonth){
            setActiveContainer(true)
        }
        if(indexCurrentMonth > currentMonth){
            setActiveEdit(true)
        }
    },[])

    return (
        <button 
            className={`relative p-6 rounded-lg border border-zinc-400 bg-white h-28 font-lato flex flex-col justify-between gap-2 cursor-pointer ${activeContainer ? "!border-primary border-2" : ""}`}
        >
            {
                activeContainer && (<Pencil color='#000' className='absolute right-6 top-6'/>)
            }

            <h3 className="text-2xl">{month}</h3>
            <div className="flex gap-4 items-center">
                {
                    activeEdit 
                    ? (
                        <div className='flex gap-2 items-center'>
                            <PlusCircle color='#22B77E' size={20} weight='bold'/>
                            <span className='text-primary'>Criar agenda</span>
                        </div>
                    ) 
                    : (
                        <>
                            <p className="font-bold text-base">
                                Período(s):
                            </p>
                            <div className="flex gap-2 font-medium text-sm text-zinc-500">
                                <span>
                                    16-24
                                </span>
                                <span>
                                    26-30
                                </span>
                            </div>
                        </>
                    )
                }
            </div>
        </button>
    )
}

export function TimeLineSchendule({year, index}) {
    const date = new Date()
    const indexCurrentYear = date.getFullYear()

    return (
        <>
            <input type="radio" name="yearTimeLine" id={`${index}-${year}`} className="radio hidden" defaultChecked={year == indexCurrentYear ? true : false} />
            <label htmlFor={`${index}-${year}`}>
                <span className="text-zinc-500 text-2xl">
                    {year}
                </span>
            </label>
        </>
    )
}