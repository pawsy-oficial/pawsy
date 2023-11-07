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
import { useLocation, useNavigate } from 'react-router-dom';

export default function NewSchedule() {
  const date = new Date();
  const dayCurrent = date.getDate().toString().padStart(2, '0');
  const monthCurrent = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearCurrent = date.getFullYear();

  const [handleSwitch, setHandleSwitch] = useState(false);
  const [dateCurrent, setDateCurrent] = useState(`${yearCurrent}-${monthCurrent}-${dayCurrent}`);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  

  const location = useLocation();
  const idAgenda = location.state.idAgenda;
  const idClinic = location.state.idClinic;
  
  const navigate = useNavigate();
  
  const [consultations, setConsultations] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    const getId = async () => {
      const jwtTokenTutor = Cookies.get('jwtTokenTutor');
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/list-free-consultations/${idAgenda}`, {
          headers: {
            Authorization: 'Bearer ' + jwtTokenTutor,
          },
        });
        setConsultations(response.data);
        
        if (initialLoad) {
          setSelectedType('');
          setInitialLoad(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    getId();
  }, [idAgenda, initialLoad]);
  
  const [typesConsultation, setTypesConsultation] = useState([]);
  
  useEffect(() => {
    const responseTypes = async () => {
      const jwtTokenTutor = Cookies.get('jwtTokenTutor');
      const responseType = await axios.get(`${import.meta.env.VITE_URL}/get-tipos-consultas-schedule/${idAgenda}`, {
        headers: {
          Authorization: 'Bearer ' + jwtTokenTutor,
        },
      });
      setTypesConsultation(responseType.data);
    };
    
    responseTypes();
  }, [idAgenda]);
  
  const [typeSchedule, setTypeSchedule] = useState('consulta');
  const [medicsInfo, setMedicInfo] = useState([]);
  const [selectedMedic, setSelectedMedic] = useState('');

  useEffect(() => {
    const getMedics = async () => {
      const jwtTokenTutor = Cookies.get('jwtTokenTutor');
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/get-medicos-schedule/${idAgenda}`, {
          headers: {
            Authorization: 'Bearer ' + jwtTokenTutor,
          },
        });
  
        console.log('Dados dos médicos:', response.data);
  
        setMedicInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMedics();
  }, [idAgenda]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <main className="flex min-h-screen">
      <NavbarTutor page={2} />
      <section className="flex-1">
        <Header userType={"tutor"} />
        <a
          className="flex items-center ml-10 text-sm cursor-pointer my-5 group"
          onClick={() => navigate(`/consulta`, { state: null })}
          >
          <CaretLeft className="group-hover:text-primary" />
          Voltar
        </a>
        <div className="mx-6 lg:ml-10 px-3 py-5 md:p-10 rounded-lg bg-white mb-16 mt-10 shadow-md lg:max-w-6xl xl:max-w-7xl">
          <strong className="text-2xl font-lato font-semibold">Novo agendamento</strong>

          <section className="flex flex-col gap-2 md:gap-6 mt-4 pb-3 border-b border-zinc-400">
            <div className="flex flex-col md:flex-row md:items-center items-start gap-2 md:gap-10">
              <div className="flex justify-between gap-4 w-full md:w-auto">
                <label className="text-base" htmlFor="dateSchedule">
                  Data:
                </label>
                <input
                  type="date"
                  id="dateSchedule"
                  min={formatDate(new Date())}
                  disabled={handleSwitch}
                  onChange={(e) => {
                    setDateCurrent(e.target.value);
                  }}
                  value={dateCurrent}
                  className="border-2 disabled:opacity-20 transition-all border-primary rounded px-1 bg-[#F5FFFE]"
                />
              </div>
              <div className="flex justify-between gap-4 w-full md:w-auto flex-1">
              <div className="flex gap-2 items-center">
                <label className="text-base" htmlFor="selectTypeConsultation">
                  Tipo do agendamento:
                </label>
                <select
                  id="selectTypeConsultation"
                  className="px-2 md:px-6 border border-primary rounded bg-[#F5FFFE] focus:border-2 active:outline-none focus-visible:outline-none capitalize"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Todos</option>
                  {typesConsultation.map((typeConsultation) => (
                    <option key={typeConsultation.nm_tipo} value={typeConsultation.nm_tipo}>
                      {typeConsultation.nm_tipo}
                    </option>
                  ))}
                </select>

              </div>

                <div className="flex gap-2 items-center">
                  <label className="text-base" htmlFor="selectMedic">
                    Médico veterinário:
                  </label>
                  <select
                    id="selectMedic"
                    className="px-2 md:px-6 border border-primary rounded bg-[#F5FFFE] focus:border-2 active:outline-none focus-visible:outline-none capitalize"
                    onChange={(e) => setSelectedMedic(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {medicsInfo.map((medic) => (
                      <option key={medic.id} value={medic.medico}>
                        {medic.medico}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4 w-full md:justify-start">
              <label className="text-base" htmlFor="allDateSchedule">
                Mostrar todos os dias:
              </label>
              <Switch state={setHandleSwitch} defaultState={true} />
            </div>
          </section>

          <section>
        <strong className="text-sm mt-6 block font-semibold font-lato">Disponíveis para essa data</strong>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(consultations.length / itemsPerPage)}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex flex-col w-full gap-6 mt-4">
          <table className="w-full cursor-default border-0">
            <thead>
              <tr className="border-none selection:bg-secundary">
                <th className="py-1 border-none bg-primary text-white text-sm w-40 rounded-l-full">
                  Médico
                </th>
                <th className="py-1 border-none bg-primary text-white text-sm w-40">
                  Data da consulta
                </th>
                <th className="py-1 border-none bg-primary text-white text-sm w-40">
                  Horário
                </th>
                <th className="py-1 border-none bg-primary text-white text-sm w-40 rounded-r-full">
                  Tipo
                </th>
              </tr>
            </thead>
            <tbody className="second line-colors border-0">
            {consultations
              .filter((item) => {
                const consultationDate = new Date(item.dtConsulta);
                const selectedDate = new Date(dateCurrent);

                if (!handleSwitch && consultationDate.toDateString() !== selectedDate.toDateString()) {
                  return false;
                }

                if (selectedType !== '' && item.tpConsulta !== selectedType) {
                  return false;
                }

                if (selectedMedic !== '' && item.nmMedico !== selectedMedic) {
                  return false;
                }

                return true;
              })
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((item) => {
                return (
                  <CreateNewScheduleModal
                    clinicId={item.idClinic}
                    scheduleDate={item.dtConsulta}
                    scheduleHour={item.hrConsulta}
                    scheduleType={item.tpConsulta}
                    vetName={item.nmMedico}
                    idConsulta={item.idConsulta}
                    idMedic={item.idMedico}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
        </div>
      </section>
    </main>
  );
}

function CreateNewScheduleModal({ clinicId, scheduleDate, scheduleHour, scheduleType, vetName, idConsulta, idMedic}) {

  const [showModalSchedule, setShowModalSchedule] = useState(false)

  useEffect(() => {
      document.body.classList.toggle("overflow-hidden")
  }, [showModalSchedule])

  const [infoClinic, setInfoClinic] = useState([]);

  useEffect(() => {
    const response = async () => {
      const jwtTokenTutor = Cookies.get('jwtTokenTutor');
      const responseInfo = await axios.get(`${import.meta.env.VITE_URL}/get-info-clinic/${clinicId}`, {
        headers: {
          Authorization: 'Bearer ' + jwtTokenTutor,
        },
      });
      setInfoClinic(responseInfo.data);
    };
    
    response();
  }, [clinicId]);

  const [pets, setMyPets] = useState([]);

  useEffect(() => {
    const tokenTutor = Cookies.get('jwtTokenTutor');
    axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
      headers: {
          Authorization: `Bearer ${tokenTutor}`
      }
  }).then(res => {
      axios.get(`${import.meta.env.VITE_URL}/get-all-pets/${res.data.storedIdTutor}`, {
          headers:{
              Authorization: `Bearer ${tokenTutor}`
          }
      })
          .then(res => {
              setMyPets(res.data.myPets);
          })
          .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    const response = async () => {
      const jwtTokenTutor = Cookies.get('jwtTokenTutor');
      
      const responseInfo = await axios.get(`${import.meta.env.VITE_URL}/get-info-clinic/${clinicId}`, {
        headers: {
          Authorization: 'Bearer ' + jwtTokenTutor,
        },
      });
      setInfoClinic(responseInfo.data);
    };
    
    response();
  }, [clinicId]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedPet, setSelectedPet] = useState(null);

  const handleAgendamento = async (petId) => {
    console.log('idConsulta:', idConsulta);
    console.log('idPet:', petId);
  
    const jwtTokenTutor = Cookies.get('jwtTokenTutor');
    const response = await axios.post(
      `${import.meta.env.VITE_URL}/marcar-consulta`,
      { idConsulta: idConsulta, idPet: petId },
      {
        headers: {
          Authorization: 'Bearer ' + jwtTokenTutor,
        },
      }
    );
  
    if (response.status === 200) {
      setSuccessMessage('Consulta agendada com sucesso.');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setErrorMessage('Erro ao agendar a consulta.');
    }
  };
  

  return (
      <>
          <tr
              className="border-none"
              role="button"
              onClick={() => setShowModalSchedule(!showModalSchedule)}
          >
              <td className="border-none rounded-l-full py-2">{vetName}</td>
              <td className="border-none py-2">{scheduleDate}</td>
              <td className="border-none py-2">{scheduleHour}</td>
              <td className="border-none py-2 rounded-r-full">{scheduleType}</td>
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
                                                  src={`${import.meta.env.VITE_URL}/files/${infoClinic.Imagem}`}
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
                                                  {infoClinic.Nome}
                                              </h3>
                                              <span
                                                  className="text-zinc-500 font-lato text-sm"
                                              >
                                                  {infoClinic.Endereco}
                                              </span>
                                              <strong
                                                  className="text-emerald-500 font-lato text-sm underline"
                                              >
                                                  {vetName}
                                              </strong>
                                          </div>
                                      </div>

                                      <div
                                          className="flex flex-col text-zinc-700 font-bold font-lato"
                                      >
                                          <span>
                                              {scheduleDate}
                                          </span>
                                          <span>
                                              {scheduleHour}
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
                                      {
                                      pets.map((petItem) => (
                                        <div key={petItem.id_pawsy} className="flex flex-col items-center">
                                          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-secundary">
                                            <img
                                              src={`${import.meta.env.VITE_URL}/files/${petItem.url_img}`}
                                              alt=""
                                              className="h-full w-full object-cover"
                                              draggable={false}
                                            />
                                          </div>
                                          <select
                                      className="px-2 mt-2 md:px-6 border border-primary rounded bg-[#F5FFFE] focus:border-2 active:outline-none focus-visible:outline-none capitalize"
                                      onChange={(e) => {
                                        console.log('Selected Pet ID:', e.target.value);
                                        setSelectedPet(e.target.value);
                                      }}
                                    >
                                            <option value=""></option>
                                            <option value={petItem.id_pawsy}>{petItem.nm_pet}</option>
                                          </select>
                                        </div>
                                      ))
                                    }                                      
                                  </div>

                                  {successMessage && <div className="text-green-500">{successMessage}</div>}
                                  {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
                                        onClick={() => {
                                            handleAgendamento(selectedPet);
                                        }}
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