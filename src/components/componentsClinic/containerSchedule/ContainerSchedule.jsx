import { Pencil, PlusCircle } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { SwitchClinic } from '../../inputsComponents'
import axios from 'axios'
import Cookies from 'js-cookie'

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

export function ContainerMonthSchedule({ idAgenda, idClinica, abertura, fechamento, nome, obs }) {
    const [handleSwitch, setHandleSwitch] = useState(false);

    useEffect(() => {
        const getStatus = async () => {
            const jwtTokenClinic = Cookies.get('jwtTokenClinic');
            try {
                axios.get(`${import.meta.env.VITE_URL}/status-schedule/${idAgenda}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtTokenClinic
                    }
                }).then((response) => {
                    const isAgendaAtiva = response.data;
                    if (isAgendaAtiva) {
                        setHandleSwitch(true);
                    }
                }).catch(err => console.log(err));
            } catch (error) {
                console.log(error);
            }
        };

        getStatus();
    }, []);

    const toggleSwitch = async () => {
        if (!handleSwitch) {
            setHandleSwitch(true);
            const jwtTokenClinic = Cookies.get('jwtTokenClinic');
            try {
                await axios.post(`${import.meta.env.VITE_URL}/gerar-consultas`, { idAgenda }, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtTokenClinic
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <section className="relative p-6 rounded-lg border border-zinc-400 bg-white font-lato flex flex-col justify-between gap-2">
             <h1 className="font-bold text-zinc-500 text-2xl hover:text-primary">{nome}</h1>
             <div className="flex gap-3">
                  <p className="text-zinc-500">{abertura}  até  {fechamento}</p>
              </div>
              <p className="text-zinc-500 text-sm">{obs}</p>
              <div className="flex justify-between gap-4 w-full md:justify-start items-center">
                <SwitchClinic state={handleSwitch} onChange={toggleSwitch} />
                <label className="text-sm font-semibold" htmlFor="allDateSchedule">GERAR CONSULTAS</label>
              </div>
        </section>
    );
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