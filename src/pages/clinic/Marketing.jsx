import React, { useState } from "react";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { CaretLeft } from "@phosphor-icons/react";
import { CardRevenues } from "../../components/componentsMedic/CardRevenues";
import { Revenues } from "../../components/componentsMedic/Revenues";
import { CreateNewRevenues } from "../../components/componentsMedic/CreateNewRevenues";

const RevenuesList = ({ state }) => {
  return (
    <>
      <div className="flex flex-col gap-7">
        <a className="flex items-center mt-10 text-sm">
          <CaretLeft color="#22B77E" />
          Voltar
        </a>
        <button className="rounded-lg bg-[#22937E] text-white w-52 h-8 mb-3">
          Prescrever nova receita
        </button>
      </div>

      <div className="">
        <CardRevenues
          emissao={"02/05/2023"}
          validade={"02/10/2023"}
          dr={"Vanessa Santos"}
          state={state}
        />
        <CardRevenues
          emissao={"10/07/2023"}
          validade={"02/10/2023"}
          dr={"Vanessa Santos"}
          state={state}
        />
        <CardRevenues
          emissao={"02/05/2023"}
          validade={"02/10/2023"}
          dr={"Vanessa Santos"}
          state={state}
        />
        <CardRevenues
          emissao={"01/04/2023"}
          validade={"02/04/2023"}
          dr={"Vanessa Santos"}
          state={state}
        />
      </div>
    </>
  );
};

const RevenueDetails = ({ revenueId }) => {
  return (
    <div>
      <a
        onClick={() => {
          revenueId(false);
        }}
        className="flex pl-28 items-center my-8 mx-auto text-sm"
      >
        <CaretLeft color="#22B77E" />
        Voltar
      </a>

      <Revenues />
    </div>
  );
};

export default function Marketing() {
  const [state, setState] = useState(false);
  return (
    <main className="flex min-h-screen">
      <NavbarClinic page={0} />

      <section className="flex-1">
        <Header />
        <main className="max-w-5xl mx-auto">
          {state ? (
            <RevenueDetails revenueId={setState} />
          ) : (
            <RevenuesList state={setState} />
          )}
          <CreateNewRevenues />
        </main>
      </section>
    </main>
  );
}
