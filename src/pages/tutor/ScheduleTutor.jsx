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
import { useNavigate } from 'react-router-dom';

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

    const [consultasMarks, setConsultasMarks] = useState([])

    useEffect(() => {
        const tokenTutor = Cookies.get('jwtTokenTutor');
        axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
          headers: {
              Authorization: `Bearer ${tokenTutor}`
          }
      }).then(res => {
          axios.get(`${import.meta.env.VITE_URL}/get-consultas-tutor/${res.data.storedIdTutor}`, {
              headers:{
                  Authorization: `Bearer ${tokenTutor}`
              }
          })
              .then(res => {
                setConsultasMarks(res.data);
              })
              .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
      }, []);

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
            {
                consultasMarks.map((e) => {
                    return <CardSchedule deleteButton={true} petName={e.nmPet} clinicName={e.nmClinic} scheduleDate={e.dtConsulta} scheduleHour={e.hrConsulta} vetName={e.nmMedico} scheduleType={e.nmEspecialidade} logoVet={e.urlImg} />
                })
            }
            </section>

        </>
    )
}

function AvailableClinics() {
    const [clinicas, setClinicas] = useState([]);
    const [pageControll, setPageControll] = useState({
        newSchedule: false,
        idClinic: null
    });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/list-clinics-consultations`)
            .then((res) => setClinicas(res.data))
            .catch((error) => console.error("Erro ao buscar clínicas:", error));
    }, []);

    const handleSelectClinic = (idClinic) => {
        setPageControll({
            newSchedule: true,
            idClinic: idClinic
        });
    };

    return (
        <>
            {!pageControll.newSchedule ? (
                <>
                    <strong className="text-2xl font-lato font-semibold">Clínicas disponíveis</strong>
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                        {clinicas.length === 0 ? (
                            <p className="text-zinc-500">Não há clínicas próximas a você</p>
                        ) : (
                            clinicas.map((clinica) => (
                                <CardClinics
                                    key={clinica.Id}
                                    clinica={clinica}
                                    onSelectClinic={handleSelectClinic}
                                />
                            ))
                        )}
                    </section>
                </>
            ) : (
                <ListSchedulesClinic pageControll={setPageControll} idClinic={pageControll.idClinic} />
            )}
        </>
    );
}

export function ListSchedulesClinic({ pageControll, idClinic }) {
    const [agendas, setAgendas] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_URL}/schedules-ativas/${idClinic}`)
        .then((res) => setAgendas(res.data))
        .catch((error) => console.error("Erro ao buscar agendas:", error));
    }, [idClinic]);
  
    const handleSelectAgenda = (idAgenda, idClinic) => {
        navigate(`/consultas-disponiveis`, {state: { idAgenda, idClinic} });
    };
  
    return (
      <div className="flex gap-6">
        {agendas.length === 0 ? (
          <p className="text-zinc-500">Não há agendas disponíveis para esta clínica.</p>
        ) : (
          agendas.map((agenda) => (
              <button onClick={() => handleSelectAgenda(agenda.idAgenda)}>
                <section className="relative p-6 rounded-lg border border-zinc-400 bg-white font-lato flex flex-col justify-between gap-2">
                <h1 className="font-bold text-zinc-500 text-2xl hover:text-primary">{agenda.nmAgenda}</h1>
                <div className="flex flex-col gap-3">
                    <p className="text-zinc-500">
                    {agenda.dtAbertura} até {agenda.dtFechamento}
                    </p>
                    <p className="text-zinc-500 text-sm">{agenda.obs}</p>
                </div>
                </section>
              </button>
          ))
        )}
      </div>
    );
  }