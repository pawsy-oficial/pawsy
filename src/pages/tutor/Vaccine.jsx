import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";
import "./vaccine.css";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import { WarningVaccine } from "../../components/tutor/Alert";
import { CardClinic } from "../../components/vaccine/cardS"

export default function VaccinePage() {
  const pets = ["Caramelo", "Oreo", "Flor", "Pantera"];
  const [namePet, setNamePet] = useState("Selecione o pet");
  const positioPet = pets.indexOf(namePet) == -1 ? 0 : pets.indexOf(namePet);
  console.log(positioPet);

  /*
  const vaccineName = ["Antirrábica","Viratec 10 CVL", "V8"]; //Viratec 10 CVL é obrigatória
  const dateVaccine = ["24/03/2020","24/03/2021","24/03/2022","24/03/2023", "30/05/2023"];
  const returnVaccine = ["24/03/2021", "24/03/2022", "24/03/2023", "24/03/2024", "30/05/2024"];
  const CRMV = ["000-00", "111-11"];
  const vetAplication = ["Vanessa Santos - "]
  */

  //Lista Vacinas
  const table = [
    [
      //Caramelo (pets[0])
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2021-03-24",
          returnVaccine: "2022-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2022-03-24",
          returnVaccine: "2023-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
    ],
    [
      //Oreo (pets[1])
      [
        {
          vaccineName: "V8",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
    ],
    [
      //Flor (pets[2])
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2021-03-24",
          returnVaccine: "2022-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2022-03-24",
          returnVaccine: "2023-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
    ],
    [
      //Pantera (pets[3])
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2021-03-24",
          returnVaccine: "2022-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2022-03-24",
          returnVaccine: "2023-03-24",
          CRMV: "000-00",
          vetAplication: "Vanessa Santos",
        },
      ],
    ],
  ];

  //Lista Vermes

  const tableVermifugo = [
    [
      //caramelo
      [
        {
          dateVermifugo: "2020-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2021-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2022-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2023-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
    ],
    [
      //Oreo
      [
        {
          dateVermifugo: "2020-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2021-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2021-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
    ],
    [
      //Flor
      [
        {
          dateVermifugo: "2020-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2021-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2022-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2023-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
    ],
    [
      //Pantera
      [
        {
          dateVermifugo: "2020-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2021-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2022-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
      [
        {
          dateVermifugo: "2023-02-12",
          nameVermifugo: "Vermikill",
        },
      ],
    ],
  ];

  return (
    <main className="flex min-h-screen">
      <NavbarTutor />
      <section className="flex-1">
        <Header />
        <main className="pl-10 pr-16 py-8 flex flex-col gap-5">
          <div className="flex gap-6 items-center">
            <Select.Root value={namePet} onValueChange={setNamePet}>
              <Select.Trigger
                className="w-fit inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                aria-label="Food"
              >
                <Select.Value className="font-sora" aria-label={namePet}>
                  {namePet}
                </Select.Value>
                <Select.Icon className="text-violet11">
                  {/* <ChevronDownIcon /> */}
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                  <Select.Viewport className="p-[5px]">
                    <Select.Group>
                      <Select.Label></Select.Label>
                      {pets.map((name, index) => {
                        return (
                          <Select.Item value={`${name}`}>
                            <Select.ItemText>{name}</Select.ItemText>
                          </Select.Item>
                        );
                      })}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          
            {
              positioPet == 1 && <WarningVaccine/>
            }

          </div>
          <section className="flex flex-1 bg-white px-6 py-8 rounded-2xl">
            <div className="w-full flex justify-between">
              <table className="block"> 
                <thead>
                  <tr className=" border-b border-black">
                    <th className=" bg-primary text-white text-sm w-40 p-2">
                      Vacina
                    </th>
                    <th className=" p-2 bg-primary text-white text-sm w-40">
                      Data de aplicação
                    </th>
                    <th className=" p-2 bg-primary text-white text-sm w-40">
                      Retorno
                    </th>
                    <th className=" p-2 bg-primary text-white text-sm w-40">
                      Veterinário
                    </th>
                    <th className=" p-2 bg-primary text-white text-sm w-40">
                      CRMV
                    </th>
                  </tr>
                </thead>
                <tbody className="second">
                  {table[positioPet].map((e) => {
                    return (
                      <tr className="border-b border-black">
                        {e.map((f) => {
                          console.log(f);
                          return (
                            <>
                              <td>{f.vaccineName}</td>
                              <td>{f.dateVaccine}</td>
                              <td>{f.returnVaccine}</td>
                              <td>{f.vetAplication}</td>
                              <td>{f.CRMV}</td>
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <table className="block">
                <thead>
                  <tr className=" border-b border-black">
                    <th className=" bg-primary text-white text-sm w-40 p-2">
                      Data
                    </th>
                    <th className=" bg-primary text-white text-sm w-40 p-2">
                      Nome
                    </th>
                  </tr>
                </thead>
                <tbody className="second">
                  {tableVermifugo[positioPet].map((e) => {
                    return (
                      <tr className="border-b border-black">
                        {e.map((f) => {
                          console.log(f);
                          return (
                            <>
                              <td>{f.dateVermifugo}</td>
                              <td>{f.nameVermifugo}</td>
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <p className="titulo-card pt-2">Campanhas de vacinação próximas de você</p>
          <section className="flex flex-1 rounded-2xl">
              <CardClinic/>
              <CardClinic/>
              <CardClinic/>
              <CardClinic/>
              <CardClinic/>
          </section>
        </main>
      </section>
    </main>
  );
}
