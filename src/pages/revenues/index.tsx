import React from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";

// a abordagem a seguir consiste em um early return reativo á uma query na url, ou seja,
//quando a url for /tutor o componente exibido deve ser <RevenuesList/>
// quando a url for /tutor?receita={id da receita} o componente exibido deve ser <RevenueDetails/>

const searchParams = window?.location?.search;

const query = new URLSearchParams(searchParams);

const revenueId = query.get("receita");

const RevenuesList = () => {
  return (
    <div>
      <h1> Lista de receitas</h1>
      <a href="/receitas?receita=1">receita 1</a>
      <a href="/receitas?receita=2">receita 2</a>
      <a href="/receitas?receita=3">receita 3</a>
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
