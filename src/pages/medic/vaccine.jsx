import { useEffect, useState } from "react";
import { HeaderMedic } from "../../components/HeaderMedic";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { PlusCircle } from "@phosphor-icons/react";
import { ModalVermifuge } from "../../components/componentsMedic/ModalVermifuge";
import { ModalVaccine } from "../../components/componentsMedic/ModalVaccine";
import axios from "axios";
import Cookies from "js-cookie";

export default function Vaccine() {
  const pets = ["Caramelo", "Oreo", "Flor", "Pantera"];
  const [namePet, setNamePet] = useState("");
  const positioPet = pets.indexOf(namePet) == -1 ? 0 : pets.indexOf(namePet);

  const [openVermifuge, setOpenVermifuge] = useState(false);
  const [openVaccine, setOpenVaccine] = useState(false);
  const jwtTokenMedic = Cookies.get("jwtTokenMedic");
  const location = useLocation();
  const { idPet } = location.state.pet;

  const table = [
    [
      //Caramelo (pets[0])
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2021-03-24",
          returnVaccine: "2022-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2022-03-24",
          returnVaccine: "2023-03-24",
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
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Antirrábica",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
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
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2021-03-24",
          returnVaccine: "2022-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2022-03-24",
          returnVaccine: "2023-03-24",
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
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2020-03-24",
          returnVaccine: "2021-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2021-03-24",
          returnVaccine: "2022-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
      [
        {
          vaccineName: "Viratec 10 CVL",
          dateVaccine: "2022-03-24",
          returnVaccine: "2023-03-24",
          vetAplication: "Vanessa Santos",
        },
      ],
    ],
  ];

  //Lista Vermes

  const request = {
    method: "GET",
    url: `${import.meta.env.VITE_URL}/add-new-vermifuge`,
    headers: {
      Authorization: "Bearer " + jwtTokenMedic,
    },
  };

  const [tableVermifugo, setTableVermifugo] = useState([
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
  ]);

  useEffect(() => {
    axios(request)
      .then((e) => {
        // console.log(e);
        // console.log(e.data.results);
        setTableVermifugo(
          e.data.results.map((item) => {
            console.log(e);
            return {
              dateVermifugo: item.dt_aplicacao.slice(0, 10),
              nameVermifugo: item.nm_vermifugo,
            };
          })
        );
        // console.log(tableVermifugo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [openVermifuge]);

  const navigate = useNavigate();
  return (
    <div>
      <header>
        <HeaderMedic />
      </header>
      <main className="pl-10 pr-16 py-8 flex flex-col gap-5 w-[calc(100vw-256px-24px)] mx-auto">
        <div className="flex flex-col gap-7">
          <a
            className="flex items-center  text-sm cursor-pointer"
            onClick={() => history.back()}
          >
            <CaretLeft color="#22B77E" />
            Voltar
          </a>
        </div>
        <section className="flex flex-1 bg-white px-6 py-8 rounded-2xl ">
          <div className="w-full flex justify-between gap-10">
            <div className="flex-1">
              <h3 className="font-semibold text-2xl mb-3 text-center font-lato">
                Vacinas
              </h3>
              <table className="w-full cursor-default">
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
                  </tr>
                </thead>
                <tbody className="second">
                  {table[positioPet].map((e) => {
                    return (
                      <tr className="border-b border-black">
                        {e.map((f) => {
                          return (
                            <>
                              <td>{f.vaccineName}</td>
                              <td>{f.dateVaccine}</td>
                              <td>{f.returnVaccine}</td>
                              <td>{f.vetAplication}</td>
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-center">
                <button
                  onClick={() => setOpenVaccine(!openVaccine)}
                  className="flex flex-row pt-3 items-center text-primary text-lg font-semibold gap-4"
                >
                  <PlusCircle size={24} /> adicionar
                </button>
                <ModalVaccine
                  isOpenVaccine={openVaccine}
                  setOpenVaccine={setOpenVaccine}
                />
              </div>
            </div>
            <div className="hidden xl:block">
              <h3 className="font-semibold text-2xl mb-3 text-center font-lato">
                Vermífugos
              </h3>
              <table className="cursor-default">
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
                  {tableVermifugo.map((e, i) => {
                    return (
                      <tr key={i} className="border-b border-black">
                        <td>{e.dateVermifugo}</td>
                        <td>{e.nameVermifugo}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-center">
                <button
                  onClick={() => setOpenVermifuge(!openVermifuge)}
                  className="flex flex-row pt-3 items-center text-primary text-lg font-semibold gap-4"
                >
                  <PlusCircle size={24} /> adicionar
                </button>
                <ModalVermifuge
                  isOpenVermifuge={openVermifuge}
                  setOpenVermifuge={setOpenVermifuge}
                  id={idPet}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
