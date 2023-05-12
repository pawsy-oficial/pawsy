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
    <>
    <div id="header">
      <h1>Receitas médicas do</h1>
      <select id="dogs" required name="dogs">
        <option value="" disabled selected defaultValue="">Caramelo</option>
        </select>
        </div>

    <div id="revenues">
        <div id="revenue1">
          <a href="/receitas?receita=1">Emissão: 01/03/2023</a>
          <p>Validade: 02/04/2023</p>
          <p>Drª Vanessa Santos</p>
        </div>
        
        <div id="revenue2">
          <a href="/receitas?receita=2">Emissão: 02/03/2023</a>
          <p>Validade: 03/04/2023</p>
          <p>Drº Nelson Chagas</p>
          </div>

        <div id="revenue3">
          <a href="/receitas?receita=3">Emissão: 03/03/2023</a>
          <p>Validade: 04/04/2023</p>
          <p>Drª Vanessa Santos</p>
          </div>

        <div id="revenue4">
          <a href="/receitas?receita=4">Emissão: 04/03/2023</a>
          <p>Validade: 05/04/2023</p>
          <p>Drª Vanessa Santos</p>
          </div>
      </div>
  </>
  );
};

const RevenueDetails = (props: { revenueId: string }) => {
  const { revenueId } = props;
  return (
    <div>
      <a href="/receitas" id="return">Voltar</a>
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
        <img src="src/img/logo.png" alt="" id="logo-img"/>
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