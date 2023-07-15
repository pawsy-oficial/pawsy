import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import { CaretLeft } from "@phosphor-icons/react";
import { CardReceitas, ContainerRevenues } from "../../components/Receitas/Receitas";
import LogoWaterMark from "../../img/waterMark.svg"
import { useNavigate } from "react-router-dom";

// a abordagem a seguir consiste em um early return reativo á uma query na url, ou seja,
//quando a url for /tutor o componente exibido deve ser <RevenuesList/>
// quando a url for /tutor?receita={id da receita} o componente exibido deve ser <RevenueDetails/>

// const searchParams = window?.location?.search;

// const query = new URLSearchParams(searchParams);

// const revenueId = query.get("receita");

// puta merda! o GPT passou por aqui


function RevenuesList({ state }) {
	const dataBase =
		[
			{ name: "caramelo", schedule: [ {emissao: "2023*04-01", validade: "2023-04-02", dr: "Vanessa Santos"} ] },
			{ name: "oreo", schedule: [ {emissao: "2023-04-01", validade: "2023-04-02", dr: "Vanessa Santos"}, {emissao: "2023*04-01", validade: "2023-04-02", dr: "Vanessa Santos"} ] },
			{ name: "flor", schedule: [ {emissao: "2023-04-01", validade: "2023-04-02", dr: "Vanessa Santos"}, {emissao: "2023*04-01", validade: "2023-04-02", dr: "Vanessa Santos"}, {emissao: "2023*04-01", validade: "2023-04-02", dr: "Vanessa Santos"} ] },
			{ name: "pantera", schedule: [ {emissao: "2023-04-01", validade: "2023-04-02", dr: "Vanessa Santos"}, {emissao: "2023*04-01", validade: "2023-04-02", dr: "Vanessa Santos"}, {emissao: "2023*04-01", validade: "2023-04-02", dr: "Vanessa Santos"}, {emissao: "2023*04-01", validade: "2023-04-02", dr: "Vanessa Santos"} ] }
		]
	const [option, setOption] = useState(0)


	return (
		<>
			<div className="flex my-8 text-lg items-center">
				<h1>Receitas médicas do</h1>
				<select
					className="bg-[#F5FFFE] ml-3 w-44 font-bold h-8 border border-primary rounded-lg px-3 outline-none focus:border-primary"
					name="dogs"
					onChange={(e) => setOption(e.target.value)}
				>
					{
						dataBase.map(({name},i)=>{
							return(
								<option key={i} value={i} selected>{name}</option>
							)
						})
					}
				</select>
			</div>

			<div className="">
				{
					dataBase[option].schedule.map(({validade, emissao, dr})=>{
						return(
							<CardReceitas emissao={emissao} validade={validade} dr={dr} state={state} />
						)
					})
						
					
				}
			</div>
		</>
	);
};

const RevenueDetails = ({ revenueId }) => {
	return (
		<div>
			<a onClick={() => { revenueId(false) }} className="flex pl-28 items-center my-8 mx-auto text-sm cursor-pointer"><CaretLeft />Voltar</a>

			<div className="w-[595px] h-[892px] my-8 mx-auto bg-white border border-primary relative">
				<img
					src={LogoWaterMark}
					alt="marca d'água PAWSY"
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				/>
				<div className="flex py-6 px-8 w-[593px] h-[132px] bg-[#F5FFFE] text-xs font-bold flex-col justify-between">
					<div className="flex justify-between">

						<div>
							Receituário comum
						</div>
						<div>
							Emitido em: 02/04/2023
						</div>
						<div>
							Valido até: 02/05/2023
						</div>

					</div>
					<div className="flex justify-between">
						<div className="text-zinc-900">
							Unidade: <span className="text-zinc-600 font-normal">ZN Vet</span>
						</div>
						<div className="text-zinc-900">
							Médico vet.: <span className="text-zinc-600 font-normal">Vanessa Santos</span>
						</div>
						<div className="text-zinc-900">
							CRMV:<span className="text-zinc-600 font-normal">10.000</span>
						</div>
					</div>

					<div className="flex justify-between">
						<div className="text-zinc-900">
							Tutor: <span className="text-zinc-600 font-normal">Hale Silva</span>
						</div>
						<div className="text-zinc-900">
							PET: <span className="text-zinc-600 font-normal">Caramelo</span>
						</div>
						<div className="text-zinc-900">
							Idade: <span className="text-zinc-600 font-normal">5 anos</span>
						</div>
						<div className="text-zinc-900">
							Espécie: <span className="text-zinc-600 font-normal">Canina</span>
						</div>
						<div className="text-zinc-900">
							Sexo: <span className="text-zinc-600 font-normal">Macho</span>
						</div>
					</div>


				</div>

				<section className="flex flex-col gap-6 py-8 z-10">
					<ContainerRevenues />
					<ContainerRevenues />
				</section>

				<div className="w-44 h-[1px] my-20 mx-auto bg-black" />

				<div className="w-[595px] h-8 bg-primary flex justify-center items-center absolute bottom-0">
					<img src="src/img/logo.png" alt="" className="w-16" />
				</div>
			</div>
		</div>
	);
};

export default function Revenues() {
	const [state, setState] = useState(false)
	return (
		<main className="flex min-h-screen">
			<NavbarTutor />
			<section className="flex-1">
				<Header />
				<main className="max-w-5xl mx-auto">
					{
						state
							? (
								<RevenueDetails revenueId={setState} />
							)
							: (
								<RevenuesList state={setState} />
							)
					}
				</main>
			</section>
		</main>
	);
}