import React from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import { CaretLeft } from "@phosphor-icons/react";
import {CardReceitas, ContainerRevenues} from "../../components/Receitas/Receitas";
import LogoWaterMark from "../../img/waterMark.svg"

// a abordagem a seguir consiste em um early return reativo á uma query na url, ou seja,
//quando a url for /tutor o componente exibido deve ser <RevenuesList/>
// quando a url for /tutor?receita={id da receita} o componente exibido deve ser <RevenueDetails/>

const searchParams = window?.location?.search;

const query = new URLSearchParams(searchParams);

const revenueId = query.get("receita");

const RevenuesList = () => {
	return (
		<>
			<div className="flex my-8 text-lg items-center">
				<h1>Receitas médicas do</h1>
				<select className="bg-[#F5FFFE] ml-3 w-44 font-bold h-8 border border-primary rounded-lg px-3 outline-none focus:border-primary" name="dogs">
					<option value="Caramelo" selected>Caramelo</option>
					<option value="Oreo" defaultValue="">Oreo</option>
					<option value="Flor" defaultValue="">Flor</option>
					<option value="Pantera" defaultValue="">Pantera</option>
				</select>
			</div>

			<div className="">
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
					<ContainerRevenues/>
					<ContainerRevenues/>
				</section>

				<div className="w-44 h-[1px] my-20 mx-auto bg-black"/>

				<div className="w-[595px] h-8 bg-primary flex justify-center items-center absolute bottom-0">
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
				<main className="max-w-5xl mx-auto">
					{
						revenueId 
						? (
							<RevenueDetails revenueId={revenueId} />
						) 
						: (
							<RevenuesList />
						)
					}
				</main>
			</section>
		</main>
	);
}