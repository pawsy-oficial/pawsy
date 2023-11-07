import React, { useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { CardRevenues } from "../../components/componentsMedic/CardRevenues";
import { Revenues } from "../../components/componentsMedic/Revenues";
import { HeaderMedic } from "../../components/HeaderMedic";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const RevenuesList = ({ state }) => {
	const navigate = useNavigate();
	const location = useLocation()

	const { pet, clinic, medic } = location.state

	const [ revenues, setRevenues ] = useState([])

	useEffect(()=>{
		axios.get(`${import.meta.env.VITE_URL}/get-all-revenues/${pet}`)
		.then(e => setRevenues(e.data.result))
		.catch(err => console.log(err))
	},[])

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
				{
					revenues.length == 0
					? <p className="text-zinc-500 font-lato text-sm mt-4">Pet não possui receitas</p>
					: revenues.map(r => {
						return(
							<CardRevenues
								emissao={dayjs(r.dt_emisao).format("DD/MM/YYYY")}
								validade={dayjs(r.dt_validade).format("DD/MM/YYYY")}
								dr={r.nm_medico}
								state={state}
								idRevenue={r.id_receita}
							/>
						)
					})
				}
				
			</div>
		</>
	);
};

const RevenueDetails = ({ revenueId, setState }) => {
	return (
		<div>
			<a
				onClick={() => {
					setState(false);
				}}
				className="flex pl-28 items-center my-8 mx-auto text-sm cursor-pointer"
			>
				<CaretLeft color="#22B77E" />
				Voltar
			</a>

			<Revenues  idRevenue={revenueId} />
		</div>
	);
};

export default function MarketingRevenue() {
	const [state, setState] = useState({
		status: false,
		id: null
	});
	return (
		<>
			<section className="flex-1">
				<HeaderMedic />
				<main className="max-w-5xl mx-auto">
					{
						state.status
						? (
							<RevenueDetails 
								revenueId={state.id} 
								setState={setState}
							/>
						) : (
							<RevenuesList state={setState} />
						)
					}
				</main>
			</section>
		</>
	);
}
