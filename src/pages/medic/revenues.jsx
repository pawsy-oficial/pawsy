import React, { useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { CardRevenues } from "../../components/componentsMedic/CardRevenues";
import { Revenues } from "../../components/componentsMedic/Revenues";
import { HeaderMedic } from "../../components/HeaderMedic";
import { useLocation, useNavigate } from "react-router-dom";

const RevenuesList = ({ state }) => {
	const navigate = useNavigate();
	const location = useLocation()

	const { pet, clinic, medic } = location.state

	return (
		<>
			<div className="flex flex-col gap-7">
				<a
					onClick={() => history.back()}
					className="flex items-center mt-10 text-sm cursor-pointer"
				>
					<CaretLeft color="#22B77E" />
					Voltar
				</a>
				<button
					onClick={() => navigate("/nova-receita", { state: { pet, clinic, medic } })}
					className="rounded-lg bg-[#22937E] text-white px-6 py-1 w-fit text-base"
				>
					Prescrever nova receita
				</button>
			</div>

			<div className="cursor-pointer">
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
				className="flex pl-28 items-center my-8 mx-auto text-sm cursor-pointer"
			>
				<CaretLeft color="#22B77E" />
				Voltar
			</a>

			<Revenues />
		</div>
	);
};

export default function MarketingRevenue() {
	const [state, setState] = useState(false);
	return (
		<>
			<section className="flex-1">
				<HeaderMedic />
				<main className="max-w-5xl mx-auto">
					{state ? (
						<RevenueDetails revenueId={setState} />
					) : (
						<RevenuesList state={setState} />
					)}
				</main>
			</section>
		</>
	);
}
