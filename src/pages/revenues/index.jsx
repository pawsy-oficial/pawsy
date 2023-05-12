import React from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import "./index.css"
import { CaretLeft } from "@phosphor-icons/react";
import CardReceitas from "../../components/Receitas/Receitas";

// a abordagem a seguir consiste em um early return reativo á uma query na url, ou seja,
//quando a url for /tutor o componente exibido deve ser <RevenuesList/>
// quando a url for /tutor?receita={id da receita} o componente exibido deve ser <RevenueDetails/>

const searchParams = window?.location?.search;

const query = new URLSearchParams(searchParams);

const revenueId = query.get("receita");

const RevenuesList = () => {
  return (
    <>
      <div id="header">
        <h1>Receitas médicas do</h1>
        <select id="dogs" required name="dogs">
          <option value="" disabled selected defaultValue="">Caramelo</option>
        </select>
      </div>

      <div id="revenues">
        <CardReceitas emissao={"01/04/2023"} validade={"02/04/2023"} dr={"Vanessa Santos"} />
        <CardReceitas emissao={"02/05/2023"} validade={"02/10/2023"} dr={"Vanessa Santos"} />
        <CardReceitas emissao={"10/07/2023"} validade={"02/10/2023"} dr={"Vanessa Santos"} />
        <CardReceitas emissao={"02/05/2023"} validade={"02/10/2023"} dr={"Vanessa Santos"} />
      </div>
    </>
  );
};

const RevenueDetails = (props) => {
  const { revenueId } = props;
  return (
    <div>
      <a href="/receitas" id="return"><CaretLeft color="#22B77E" />Voltar</a>
      <div id="prescription">
        <div id="information">
          <table>
            <tr>
              <th>Receituário comum</th>
              <th>Emitido em: 02/04/2023</th>
              <th>Valido até: 02/05/2023</th>
            </tr>
            <tr>
              <th>Unidade: ZN Vet</th>
              <th>Médico vet.: Vanessa Santos</th>
              <th>CRMV: 10.000</th>
            </tr>
            <tr>
              <th>Tutor: Hale Silva</th>
              <th>PET: Caramelo</th>
              <th>Idade: 5 anos</th>
              <th>Espécie: Canina</th>
              <th>Sexo: Macho</th>
            </tr>
          </table>
        </div>
        
        <div id="medicines">
          <div id="posology">
          </div>
        </div>

        <div id="medicines">
          <div id="posology">
          </div>
        </div>

        <div id="medicines">
          <div id="posology">
          </div>
        </div>

        <div id="signature">
        </div>

        <div id="logo">
          <img src="src/img/logo.png" alt="" id="logo-img" />
        </div>
      </div>
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