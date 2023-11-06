import { Eye, Pencil, PlusCircle } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { SwitchClinic } from '../../inputsComponents'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'

export function ContainerSchedule({ dia, consultas, alterPage }) {
  return (
    <div className="flex flex-col gap-6 mt-6 w-[864px]">
      <span className="text-2xl">{dia}</span>
      <div className="flex gap-4 flex-col">
        {consultas.map((consulta) => (
          <div
            key={consulta.id}
            className={`bg-white w-full cursor-pointer hover:bg-secundary/10 transition-all duration-500 flex justify-between px-5 py-4 ${false && "line-through text-zinc-400"}`}
          >
            <div className="flex gap-10">
              <p>{dia}</p>
              <p>{consulta.horaConsulta}</p>
              <p>{consulta.nomeTutor}</p>
            </div>
            <p>Dr. {consulta.nomeMedico}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export function ContainerMonthSchedule({ idAgenda, idClinica, abertura, fechamento, nome, obs }) {
    const [handleSwitch, setHandleSwitch] = useState(false);

    const navigate = useNavigate();

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
              <div className="pt-4">
              <button className="flex items-center gap-3 p-1 px-2 bg-primary text-base font-medium text-white rounded-md"
                    onClick={() => {
                        console.log("Dados enviados:", idAgenda, nome, abertura, fechamento);
                        navigate("/consultas-agenda", { state: { idAgenda, nome, abertura, fechamento } });
                    }}
                ><Eye /> Visualizar agenda</button>
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