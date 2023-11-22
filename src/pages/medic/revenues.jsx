import React, { useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { CardRevenues } from "../../components/componentsMedic/CardRevenues";
import { Revenues } from "../../components/componentsMedic/Revenues";
import { HeaderMedic } from "../../components/HeaderMedic";
import { useLocation, useNavigate } from "react-router-dom";
import { DownloadSimple } from "@phosphor-icons/react";
import { usePDF, Resolution, Margin } from 'react-to-pdf';
import { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import ButtonDownloadPdf from "../../components/buttons/ButtonDownloadPdf";

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
					className="flex items-center mt-10 text-sm cursor-pointer w-fit"
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
					: revenues.sort((a, b) => {
						return new Date(b.dt_validade) - new Date(a.dt_validade)
					}).map((r, i) => {
						return(
							<CardRevenues
								emissao={dayjs(r.dt_emisao).format("DD/MM/YYYY")}
								validade={dayjs(r.dt_validade).format("DD/MM/YYYY")}
								dr={r.nm_medico}
								state={state}
								idRevenue={r.id_receita}
								key={i}
							/>
						)
					})
					.reverse()
				}
				
			</div>
		</>
	);
};

const RevenueDetails = ({ revenueId, setState }) => {
    const { toPDF, targetRef } = usePDF({filename: 'receita.pdf'});
	const options = {
		// default is `save`
		method: 'open',
		// default is Resolution.MEDIUM = 3, which should be enough, higher values
		// increases the image quality but also the size of the PDF, so be careful
		// using values higher than 10 when having multiple pages generated, it
		// might cause the page to crash or hang.
		resolution: Resolution.HIGH,
		page: {
		   // margin is in MM, default is Margin.NONE = 0
		   margin: Margin.SMALL,
		   // default is 'A4'
		   format: 'letter',
		   // default is 'portrait'
		   orientation: 'landscape',
		},
		canvas: {
		   // default is 'image/jpeg' for better size performance
		   mimeType: 'image/png',
		   qualityRatio: 1
		},
		// Customize any value passed to the jsPDF instance and html2canvas
		// function. You probably will not need this and things can break, 
		// so use with caution.
		overrides: {
		   // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
		   pdf: {
			  compress: true
		   },
		   // see https://html2canvas.hertzen.com/configuration for more options
		   canvas: {
			  useCORS: true
		   }
		},
	 };
	return (
		<div className="">
			<div className="flex flex-row my-4 justify-between mx-auto">
				<a
					onClick={() => {
						setState(false);
					}}
					className="flex items-center  text-sm cursor-pointer w-fit"
				>
					<CaretLeft color="#22B77E" />
					Voltar
				</a>
				<button 
					onClick={
						() => toPDF()
					} 
					className="flex cursor-pointer"
				>
					<DownloadSimple size={24}/>
				</button>
			</div>
			<div 
				className=""
				ref={targetRef} 
			>
				<Revenues 
					idRevenue={revenueId} 
				/>
			</div>

			{/* <Revenues  idRevenue={revenueId} /> */}
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
				<main className="w-[50%] mx-auto">
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
