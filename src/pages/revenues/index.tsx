import React from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import "./index.css"

// a abordagem a seguir consiste em um early return reativo á uma query na url, ou seja,
//quando a url for /tutor o componente exibido deve ser <RevenuesList/>
// quando a url for /tutor?receita={id da receita} o componente exibido deve ser <RevenueDetails/>

const searchParams = window?.location?.search;

const query = new URLSearchParams(searchParams);

const revenueId = query.get("receita");

const RevenuesList = () => {
  return (
    <div>
      <a href="/receitas?receita=1">Emissão: 01/03/2023</a>
      <a href="/receitas?receita=2">Emissão: 02/03/2023</a>
      <a href="/receitas?receita=3">Emissão: 03/03/2023</a>
      <a href="/receitas?receita=3">Emissão: 04/03/2023</a>
    </div>
  );
};

const RevenueDetails = (props: { revenueId: string }) => {
  const { revenueId } = props;
  return (
    <div>
      <h1>Detalhes da receita</h1>
      <p>{revenueId}</p>
    </div>
  );
};

export default function Revenues() {
  return (
    <main className="flex min-h-screen">
      <NavbarTutor />
      <section className="flex-1">
        <Header />
        <main>
          <h1>Receitas médicas do</h1>
          {revenueId ? (
            <RevenueDetails revenueId={revenueId} />
          ) : (
            <RevenuesList />
          )}
        </main>
      </section>
    </main>
  );
}
