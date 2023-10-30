import { useEffect, useState } from "react";
import { HeaderMedic } from "../../components/HeaderMedic";
import { useLocation } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { PlusCircle } from "@phosphor-icons/react";
import { ModalVermifuge } from "../../components/componentsMedic/ModalVermifuge";
import { ModalVaccine } from "../../components/componentsMedic/ModalVaccine";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";

export default function Vaccine() {
  const [openVermifuge, setOpenVermifuge] = useState(false);
  const [openVaccine, setOpenVaccine] = useState(false);
  const [infoMedic, setInfoMedic] = useState([]);
  const [tableVaccine, setTableVaccine] = useState([]);
  const [tableVermifugo, setTableVermifugo] = useState([]);

  const jwtTokenMedic = Cookies.get("jwtTokenMedic");

  const tokenMedic = Cookies.get("jwtTokenMedic");

  const location = useLocation();
  const { idPet, idClinic } = location.state.pet;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/add-new-vermifuge`, {
        headers: {
          Authorization: "Bearer " + jwtTokenMedic,
        },
      })
      .then((e) => {
        setTableVermifugo(e.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${import.meta.env.VITE_URL}/get-vaccine`, {
        headers: {
          Authorization: "Bearer " + jwtTokenMedic,
        },
      })
      .then((e) => {
        setTableVaccine(e.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${import.meta.env.VITE_URL}/profileMedic`, {
        headers: {
          Authorization: `Bearer ${tokenMedic}`,
        },
      })
      .then((res) => {
        setInfoMedic(res.data);
      });
  }, [openVaccine, openVermifuge]);

  return (
    <div>
      <HeaderMedic />

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
                  {tableVaccine.map((e, i) => {
                    return (
                      <tr key={i} className="border-b border-black">
                        <td className="py-1">{e.nm_vacina}</td>
                        <td className="py-1">
                          {dayjs(e.dt_aplicacao).format("DD/MM/YYYY")}
                        </td>
                        <td className="py-1">
                          {dayjs(e.dt_retorno).format("DD/MM/YYYY")}
                        </td>
                        <td className="py-1">{infoMedic.storedNameMedic}</td>
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
                  idPet={idPet}
                  idClinic={idClinic}
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
                        <td>{dayjs(e.dt_aplicacao).format("DD/MM/YYYY")}</td>
                        <td>{e.nm_vermifugo}</td>
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
