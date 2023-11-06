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
            `${import.meta.env.VITE_URL}/get-all-pets/${res.data.storedIdTutor}`,
            {
              headers: {
                Authorization: `Bearer ${tokenTutor}`,
              },
            }
          )
          .then((res) => {
            setMyPets(res.data.myPets);
            if (res.data.myPets.length > 0) {
              setNamePet(res.data.myPets[0].nm_pet);
              getWellbeingLevel(res.data.myPets[0].id_pawsy);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [tokenTutor]);

  return (
    <main className="flex min-h-screen">
      <NavbarTutor />
      <section className="flex-1">
        <Header userType={"tutor"} />
        <main>
          <div className="w-[calc(100%-32px)] lg:max-w-5xl lg:w-full my-8 mx-auto bg-white rounded-lg shadow-md p-6">
            <SelectPets
              pets={myPets}
              setNamePet={setNamePet}
              name={namePet}
              getWellbeingLevel={getWellbeingLevel}
            />
            <div className="flex justify-center items-center pb-8">
              <div className="inline-block">
                <div className="pie-wrapper">
                  <div className="arc" style={{ rotate: `${statusValue.angle}deg` }}></div>
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

            <div className="flex justify-between md:justify-center gap-6 sm:gap-28">
              <div className="rounded py-1 px-2 border border-primary flex gap-4 items-center">
                <Scales size={32} weight="bold" />
                <span>20,3 kg</span>
              </div>
              <div className="rounded py-1 px-2 border border-primary flex gap-4 items-center">
                <Ruler size={32} weight="bold" />
                <span>0,40 m</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-5 my-8 mx-auto">
              <Container title={"Vacina"} last={"antirrábica - 12/12/2022"} next={"V10 - 06/2023"} alert={false} />
              <Container title={"Consulta"} last={"12/12/2022"} next={"não agendada"} alert={true} />
              <Container title={"Vermifugação"} last={"08/01/2023"} next={"Vermifugação em atraso"} alert={true} />
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

function SelectPets({ pets, setNamePet, name, getWellbeingLevel }) {
  return (
    <Select.Root 
      value={name}
      onValueChange={(newValue) => {
        setNamePet(newValue);
        const selectedPet = pets.find((pet) => pet.nm_pet === newValue);
        if (selectedPet) {
          getWellbeingLevel(selectedPet.id_pawsy);
        }
      }}
    >
      <Select.Trigger
        className="lg:min-w-[220px] w-80 flex items-center justify-between rounded px-6 py-2 text-2xl font-semibold leading-none h-8 gap-1 bg-white focus:outline-none"
        aria-label="pet"
      >
        <Select.Value 
          className="font-sora" 
          aria-label={name}
        >
          {name}
        </Select.Value>
        <CaretDown weight="fill" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden bg-white rounded-md">
          <Select.Viewport className="px-3 py-8">
            <Select.Group>
              <Select.Label className="text-xs text-gray-500 mb-6">
                Meus pets
              </Select.Label>
              {
                pets.map((pet, index) => {
                  return (
                    <Select.Item
                      value={pet.nm_pet}
                      className="text-gray-800 cursor-pointer hover:outline-none hover:text-gray-950 text-xl capitalize"
                    >
                      <Select.ItemText>
                        {pet.nm_pet}
                      </Select.ItemText>
                    </Select.Item>
                  );
                })
              }
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}