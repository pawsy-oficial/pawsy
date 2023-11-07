import { useLocation, useNavigate } from "react-router-dom";
import { ContainerSchedule } from "../../components/componentsClinic/containerSchedule/ContainerSchedule";
import React, { useEffect, useState } from "react";
import { NavbarClinic } from "../../components/Navbar";
import { Header } from "../../components/header/Header";
import { AddressBook, CaretLeft } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import axios from "axios";
import Calendar from "../../components/componentsClinic/calendar/Calendar";

export default function HomeSchedule({ alterPage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const idAgenda = location.state.idAgenda;
  const nome = location.state.nome;
  const abertura = location.state.abertura;
  const fechamento = location.state.fechamento;

  const [consultas, setConsultas] = useState([]);
  const [text, setText] = useState("");
  const [groupedConsultas, setGroupedConsultas] = useState([]);

  useEffect(() => {
    const responseConsults = async () => {
      const jwtTokenClinic = Cookies.get("jwtTokenClinic");
      const responseConsult = await axios.get(
        `${import.meta.env.VITE_URL}/get-consultas-agenda/${idAgenda}`,
        {
          headers: {
            Authorization: "Bearer " + jwtTokenClinic,
          },
        }
      );

      if (responseConsult.status === 400) {
        setText("A agenda não possui nenhuma consulta marcada.");
      } else {
        setConsultas(responseConsult.data);
      }
    };

    responseConsults();
  }, [idAgenda]);

  useEffect(() => {
    const grouped = consultas.reduce((acc, consulta) => {
      const dia = consulta.dataConsulta;
      console.log(dia)
      if (!acc[dia]) {
        acc[dia] = [];
      }

      acc[dia].push(consulta);
      return acc;
    }, {});

    setGroupedConsultas(grouped);
  }, [consultas]);

  return (
    <>
      <main className="flex min-h-screen">
        <NavbarClinic page={2} />
        <section className="flex-1">
          <Header userType={"clinica"} />
          <main className="pl-10 pr-16 py-8 flex gap-5 justify-between">
            <section className="mb-6">
              <button
                onClick={() => {
                  navigate("/agenda", { state: null });
                }}
                className="flex gap-2 items-center"
              >
                <CaretLeft size={16} weight="bold" />
                Voltar
              </button>
              <h1 className="font-bold text-[32px]">{nome}</h1>
              <h2 className="font-bold text-[24px]">
                {abertura} - {fechamento}
              </h2>
              {Object.keys(groupedConsultas).map((dia) => (
                <div key={dia}>
                  <ContainerSchedule
                    dia={dia}
                    consultas={groupedConsultas[dia]}
                    alterPage={alterPage}
                  />
                </div>
              ))}
              {consultas.length === 0 && (
                <p className="text-sm text-red-400">{text}</p>
              )}
            </section>
            <div className="flex flex-col gap-4 items-center">
              <Calendar />
              <button
                className="bg-[#22937E] w-60 rounded-lg px-6 py-2 gap-4 flex items-center cursor-pointer disabled:cursor-default disabled:opacity-25"
                onClick={() => {
                  navigate("/agenda", { state: null });
                }}
                disabled={alterPage === 0 ? true : false}
              >
                <AddressBook color="#fff" size={24} weight="bold" />
                <p className="text-white">Ver todas as agendas</p>
              </button>
            </div>
          </main>
        </section>
      </main>
    </>
  );
}