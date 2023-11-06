import { HeaderMedic } from "../../components/HeaderMedic";
import { useNavigate } from "react-router-dom";
import { CaretLeft, FloppyDisk } from "@phosphor-icons/react";
import { CreateNewRevenues } from "../../components/componentsMedic/CreateNewRevenues";
import { useState } from "react";
import { useEffect } from "react";

export default function NewRevenues() {
  const navigate = useNavigate();
  const [revenues, setRevenues] = useState([])
  return (
    <>
      <header>
        <HeaderMedic />
      </header>
      <div className="flex flex-col mx-auto mt-6">
        <a
          className="flex items-center pl-96 text-sm cursor-pointer"
          onClick={() => history.back()}
        >
          <CaretLeft color="#22B77E" />
          Voltar
        </a>
      </div>
      <div className="flex flex-col items-center max-h-full gap-2">
        <CreateNewRevenues revenues={revenues} setRevenues={setRevenues} />
        {revenues.map((e) => {
          return (e)
        })}
        <div className="flex h-12">
          <button className="flex items-center bg-[#22937E] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]">
            <FloppyDisk size={24} />
            SALVAR
          </button>
          <button className="flex items-center bg-[#22937E] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]">
            <FloppyDisk size={24} />
            ADD
          </button>
        </div>
      </div>
    </>
  );
}
