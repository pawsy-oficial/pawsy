import React from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
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
      <div className="flex my-8 mx-auto pl-72 text-lg items-center">
        <h1>Receitas médicas do</h1>
        <select className="bg-[#F5FFFE] ml-3 w-44 font-bold h-8 border border-primary rounded-lg" required name="dogs">
          <option value="" disabled selected defaultValue="">Caramelo</option>
        </select>
      </div>

      <div className="m-8">
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
      <a href="/receitas" className="flex pl-28 items-center my-8 mx-auto text-sm"><CaretLeft color="#22B77E" />Voltar</a>
      <div className="w-[595px] h-[892px] my-8 mx-auto bg-white border border-primary">
        <div className="flex py-4 px-3 w-[593px] h-[132px] bg-[#F5FFFE] text-xs font-bold">
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
        
        <div className="flex flex-col my-8 mx-auto py-8 px-6 gap-3 w-[531px] h-[156px] left-8 top-36 border border-[#1BA8C4] rounded-lg">
          <div className="flex flex-col my-16 mx-auto py-5 px-4 gap-2 w-[485px] h-14 bg-[#F5FFFE] border border-primary rounded">
          </div>
        </div>

        <div className="flex flex-col my-8 mx-auto py-8 px-6 gap-3 w-[531px] h-[156px] left-8 top-36 border border-[#1BA8C4] rounded-lg">
          <div className="flex flex-col my-16 mx-auto py-5 px-4 gap-2 w-[485px] h-14 bg-[#F5FFFE] border border-primary rounded">
          </div>
        </div>

        <div className="flex flex-col my-8 mx-auto py-8 px-6 gap-3 w-[531px] h-[156px] left-8 top-36 border border-[#1BA8C4] rounded-lg">
          <div className="flex flex-col my-16 mx-auto py-5 px-4 gap-2 w-[485px] h-14 bg-[#F5FFFE] border border-primary rounded">
          </div>
        </div>

        <div className="w-44 h-[1px] my-20 mx-auto bg-black">
        </div>

        <div className="w-[595px] h-8 bg-primary flex justify-center items-center">
          <img src="src/img/logo.png" alt="" className="w-16" />
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