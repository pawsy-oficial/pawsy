import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import "../../style/wellbeing.css";
import { Info, Ruler, Scales } from "@phosphor-icons/react";
import useCheckedPet from "../../hook/useCheckedPet";
import * as Select from "@radix-ui/react-select";
import { CaretDown } from "@phosphor-icons/react";
import axios from "axios";
import Cookies from "js-cookie";

export default function WellBeing() {
  const [statusValue, setStatusValue] = useState({
    angle: 0,
    valueStatus: "Ruim",
  });

  useCheckedPet();
  const tokenTutor = Cookies.get("jwtTokenTutor");
  const [namePet, setNamePet] = useState("");
  const [myPets, setMyPets] = useState([]);
  const [idPet, setIdPet] = useState(null);
  const [infoBem, setInfoBem] = useState({
    peso: "S/D",
    altura: "S/D",
    passeio: "S/D",
    vacina: "S/D",
    dataAplicacaoVacina: "S/D",
    ultimaConsultaFeita: "S/D",
    consulta: "S/D",
    dataAplicacaoVerificador: "S/D",
  });

  const getWellbeingLevel = (petId) => {
    axios
      .get(`${import.meta.env.VITE_URL}/bem-estar/${petId}`, {
        headers: {
          Authorization: `Bearer ${tokenTutor}`,
        },
      })
      .then((res) => {
        const wellbeingLevel = res.data.nivelBemEstar;
        updateWellbeingStatus(wellbeingLevel);
      })
      .catch((err) => console.log(err));
  };

  const updateWellbeingStatus = (wellbeingLevel) => {
    switch (wellbeingLevel) {
      case 1:
        setStatusValue({
          angle: 0,
          valueStatus: "Ruim",
        });
        break;
      case 2:
        setStatusValue({
          angle: 45,
          valueStatus: "Ruim",
        });
        break;
      case 3:
        setStatusValue({
          angle: 90,
          valueStatus: "Médio",
        });
        break;
      case 4:
        setStatusValue({
          angle: 135,
          valueStatus: "Bom",
        });
        break;
      case 5:
        setStatusValue({
          angle: 180,
          valueStatus: "Excelente",
        });
        break;
      default:
        setStatusValue({
          angle: 0,
          valueStatus: "Desconhecido",
        });
    }
  };

  const getPetWellbeingInfo = (petId) => {
    axios
      .get(`${import.meta.env.VITE_URL}/get-bem-estar/${petId}`, {
        headers: {
          Authorization: `Bearer ${tokenTutor}`,
        },
      })
      .then((res) => {
        setInfoBem(res.data);
      })
      .catch((err) => console.error('Erro ao buscar informações de bem-estar do pet:', err));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/profileTutor`, {
        headers: {
          Authorization: `Bearer ${tokenTutor}`,
        },
      })
      .then((res) => {
        axios
          .get(
            `${import.meta.env.VITE_URL}/get-pets-tutor/${res.data.storedIdTutor}`,
            {
              headers: {
                Authorization: `Bearer ${tokenTutor}`,
              },
            }
          )
          .then((res) => {
            setMyPets(res.data);
            if (res.data.length > 0) {
              setNamePet(res.data[0].nmPet);
              setIdPet(res.data[0].idPet);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [tokenTutor]);

  useEffect(() => {
    if (idPet) {
      getWellbeingLevel(idPet);
      getPetWellbeingInfo(idPet);
    }
  }, [idPet, tokenTutor]);

  const PasseioSucess = async (idPet) => {
    await axios.post(`${import.meta.env.VITE_URL}/passeio/${idPet}`, {
      headers: {
        Authorization: `Bearer ${tokenTutor}`,
      },
    }).then(
        window.location.reload()
    )
  }

  return (
    <main className="flex min-h-screen">
      <NavbarTutor />
      <section className="flex-1">
        <Header userType={"tutor"} />
        <main>
          <div className="w-[calc(100%-32px)] lg:max-w-5xl lg:w-full my-8 mx-auto bg-white rounded-lg shadow-md p-6">
            <SelectPets
              pets={myPets}
              idPets={idPet}
              setNamePet={setNamePet}
              name={namePet}
              getWellbeingLevel={getWellbeingLevel}
            />
            <div className="flex justify-center items-center pb-8">
              <div className="inline-block">
                <div className="pie-wrapper">
                  <div
                    className="arc"
                    style={{ rotate: `${statusValue.angle}deg` }}
                  ></div>
                  <span
                    className={`score text-zinc-800 font-bold text-4xl ${
                      statusValue.angle < 90 && "!text-red-500"
                    }`}
                  >
                    {statusValue.valueStatus}
                  </span>
                </div>
                <div className="scale-status">
                  <strong className="-ml-2  text-zinc-500 font-normal">Ruim</strong>
                  <strong className="-mr-6 text-zinc-500 font-normal">Excelente</strong>
                </div>
              </div>
            </div>

          <div className="flex justify-between items-center md:justify-center gap-6 sm:gap-28">
            <div className="rounded py-1 px-2 border border-primary flex gap-4 items-center">
              <Scales size={32} weight="bold" />
              <span>{infoBem && infoBem[0] && infoBem[0].peso || "S/D"} kg</span>
            </div>
            <div className="rounded py-1 px-2 border border-primary flex gap-4 items-center">
              <Ruler size={32} weight="bold" />
              <span>{infoBem && infoBem[0] && infoBem[0].altura || "S/D"} m</span>
            </div>
            <div className="flex gap-2 items-center">
              <button
                type="submit"
                onClick={() => PasseioSucess(idPet)}
                className="font-bold text-white bg-primary rounded py-1 px-2 border-2 border-secundary flex gap-4 items-center"
              >PASSEIO</button>
              <span className="text-xs font-semibold">Último passeio: {infoBem && infoBem[0] && infoBem[0].passeio || "S/D"}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-5 my-8 mx-auto">
            <ContainerVacinas
              title={"Vacina"}
              last={`${infoBem && infoBem[0] && infoBem[0].vacina || "S/D"} - ${infoBem && infoBem[0] && infoBem[0].dataAplicacaoVacina || "S/D"}`}
              next={"S/D"}
              alert={false}
            />
            <Container 
              title={"Consulta"} 
              last={infoBem && infoBem[0] && infoBem[0].ultimaConsultaFeita || "S/D"}
              next={infoBem && infoBem[0] && infoBem[0].consulta || "S/D"}
              alert={false} 
            />
            <ContainerVermes
              title={"Vermifugação"} 
              last={infoBem && infoBem[0] && infoBem[0].dataAplicacaoVerificador || "S/D"} 
              next={"Vermifugação em atraso"} 
              alert={true} 
            />
          </div>

          </div>
        </main>
      </section>
    </main>
  );
}

function Container({ title, last, next, alert }) {
  return (
    <div className="flex p-6 bg-white border border-primary rounded-lg relative min-w-[256px] flex-col gap-6">
      <strong className="bg-white px-3 py-1 absolute -top-4">{title}</strong>

      <div className="flex flex-col gap-1">
        <span className="text-sm">Última: </span>
        <span className="font-bold">{last}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Próximo: </span>
        <span className={`font-bold flex items-center gap-2 ${alert && "text-red-600"}`}>
          {next}
          {alert && <Info weight="bold" size={16} />}
        </span>
      </div>
    </div>
  );
}
function ContainerVacinas({ title, last, next, alert }) {
  return (
    <div className="flex p-6 bg-white border border-primary rounded-lg relative min-w-[256px] flex-col gap-6">
      <strong className="bg-white px-3 py-1 absolute -top-4">{title}</strong>
      <div className="flex flex-col justify-center">
        <span className="text-sm">Última: </span>
        <span className="font-bold">{last}</span>
      </div>
    </div>
  );
}
function ContainerVermes({ title, last, next, alert }) {
  return (
    <div className="flex p-6 bg-white border border-primary rounded-lg relative min-w-[256px] flex-col gap-6">
      <strong className="bg-white px-3 py-1 absolute -top-4">{title}</strong>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Última: </span>
        <span className="font-bold">{last}</span>
      </div>
    </div>
  );
}

function SelectPets({ idPets, pets, setNamePet, name, getWellbeingLevel }) {
  return (
    <Select.Root
      value={name}
      onValueChange={(newValue) => {
        setNamePet(newValue);
        const selectedPet = pets.find((pet) => pet.nmPet === newValue);
        if (selectedPet) {
          setIdPet(selectedPet.idPet);
          getWellbeingLevel(selectedPet.idPet);
        }
      }}
    >
      <Select.Trigger
        className="lg:min-w-[220px] w-80 flex items-center justify-between rounded px-6 py-2 text-2xl font-semibold leading-none h-8 gap-1 bg-white focus:outline-none"
        aria-label="pet"
      >
        <Select.Value className="font-sora" aria-label={name}>
          {name}
        </Select.Value>
        <CaretDown weight="fill" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden bg-white rounded-md">
          <Select.Viewport className="px-3 py-8">
            <Select.Group>
              <Select.Label className="text-xs text-gray-500 mb-6">Meus pets</Select.Label>
              {pets.map((pet) => (
                <Select.Item
                  value={pet.nmPet}
                  className="text-gray-800 cursor-pointer hover:outline-none hover:text-gray-950 text-xl capitalize"
                  key={pet.idPet}
                >
                  <Select.ItemText>{pet.nmPet}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}