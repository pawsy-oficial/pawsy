import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import { CaretLeft } from "@phosphor-icons/react";
import { CardReceitas, ContainerRevenues } from "../../components/Receitas/Receitas";
import LogoWaterMark from "../../img/waterMark.svg"
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";

// a abordagem a seguir consiste em um early return reativo á uma query na url, ou seja,
//quando a url for /tutor o componente exibido deve ser <RevenuesList/>
// quando a url for /tutor?receita={id da receita} o componente exibido deve ser <RevenueDetails/>

// const searchParams = window?.location?.search;

// const query = new URLSearchParams(searchParams);

// const revenueId = query.get("receita");

// puta merda! o GPT passou por aqui


function RevenuesList({ state }) {
	const [ myPets, setMyPets ] = useState([])
	const [ revenues, setRevenues ] = useState([])
	const [option, setOption] = useState(0)

	useEffect(() => { 
		axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("jwtTokenTutor")}`
			}
		})
			.then(result => {
				let idTutor = result.data.storedIdTutor

				axios.get(`${import.meta.env.VITE_URL}/get-all-pets/${idTutor}`, {
					headers: {
						Authorization: `Bearer ${Cookies.get("jwtTokenTutor")}`
					}
				})
				.then(e => {
					setMyPets(e.data.myPets)
				})
				.catch(err => console.log(err))
			})
			.catch(err => console.log(err))	
		}, [])

		useEffect(()=>{
			if(option){
				const idPet = myPets[option].pet.id_pawsy ?? 0
				axios.get(`${import.meta.env.VITE_URL}/get-all-revenues/${idPet}`)
				.then(e => setRevenues(e.data.result))
				.catch(err => console.log(err))
			}
		},[option])
		

	return (
		<>
			<div className="flex my-8 text-lg items-center gap-3 px-6">
				<h1 className="hidden md:block">Receitas médicas do</h1>
				<select
					className="bg-[#F5FFFE] md:w-44 w-full capitalize font-bold h-8 border border-primary rounded-lg px-3 outline-none focus:border-primary"
					name="dogs"
					onChange={(e) => setOption(e.target.value)}
				>
					{
						myPets.map((pet, i) => {
							return (
								<option 
									key={i} 
									value={i} 
								>
									{pet.pet.nm_pet}
								</option>
							)
						})
					}
				</select>
			</div>

			<div className="px-6">
				{	
					revenues.length == 0
					? <p className="text-zinc-500 text-sm" >Não há receitas para esse pet</p>
					: revenues.map((revenue) => {
						return (
							<CardReceitas 
								emissao={revenue.dt_emisao} 
								validade={revenue.dt_validade} 
								dr={revenue.nm_medico} 
								state={state} 
								idRevenue={revenue.id_receita}
							/>
						)
					})
				}
			</div>
		</>
	);
};

const RevenueDetails = ({ revenueId, setState }) => {

	const [dataHeader, setDataHeader] = useState({
		cd_crmv: "",
		dt_emisao: "",
		dt_nascimento: "",
		dt_validade: "",
		id_medico: "",
		id_receita: "",
		nm_TipoReceita: "",
		nm_animal: "",
		nm_medico: "",
		nm_pet: "",
		nm_sexo: "",
		nm_tutor: "",
	})
	const [dataDrug, setDataDrug] = useState([])

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_URL}/get-revenues/${revenueId}`)
			.then(e => {
				setDataDrug(e.data.medicamentos)
				setDataHeader({
					cd_crmv: e.data.header[0].cd_crmv,
					dt_emisao: dayjs(e.data.header[0].dt_emisao).format("DD/MM/YYYY"),
					dt_nascimento: dayjs().diff(dayjs(e.data.header[0].dt_nascimento).format("YYYY-MM-DD"), "year"),
					dt_validade: dayjs(e.data.header[0].dt_validade).format("DD/MM/YYYY"),
					id_medico: e.data.header[0].id_medico,
					id_receita: e.data.header[0].id_receita,
					nm_TipoReceita: e.data.header[0].nm_TipoReceita,
					nm_animal: e.data.header[0].nm_animal,
					nm_medico: e.data.header[0].nm_medico,
					nm_pet: e.data.header[0].nm_pet,
					nm_sexo: e.data.header[0].nm_sexo,
					nm_tutor: e.data.header[0].nm_tutor,
				})
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div>
			<a onClick={() => { setState(false) }} className="flex pl-28 items-center my-8 mx-auto text-sm cursor-pointer"><CaretLeft />Voltar</a>

			<div className="w-[595px] h-[892px] my-8 mx-auto bg-white border border-primary relative">
				<img
					src={LogoWaterMark}
					alt="marca d'água PAWSY"
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				/>
				<div className="flex py-6 px-8 w-[593px] h-[132px] bg-[#F5FFFE] text-xs font-bold flex-col justify-between">
					<div className="flex justify-between">

						<div>
							Receituário {dataHeader.nm_TipoReceita}
						</div>
						<div>
							Emitido em: {dataHeader.dt_emisao}
						</div>
						<div>
							Valido até: {dataHeader.dt_validade}
						</div>

					</div>
					<div className="flex justify-between">
						{/* <div className="text-zinc-900">
							Unidade: <span className="text-zinc-600 font-normal">ZN Vet</span>
						</div> */}
						<div className="text-zinc-900">
							Médico vet.: <span className="text-zinc-600 font-normal capitalize">{dataHeader.nm_medico}</span>
						</div>
						<div className="text-zinc-900">
							CRMV:<span className="text-zinc-600 font-normal capitalize">{dataHeader.cd_crmv}</span>
						</div>
					</div>

					<div className="flex justify-between">
						<div className="text-zinc-900">
							Tutor: <span className="text-zinc-600 font-normal capitalize">{dataHeader.nm_tutor}</span>
						</div>
						<div className="text-zinc-900">
							PET: <span className="text-zinc-600 font-normal capitalize">{dataHeader.nm_pet}</span>
						</div>
						<div className="text-zinc-900">
							Idade: <span className="text-zinc-600 font-normal capitalize">{dataHeader.dt_nascimento} ano(s)</span>
						</div>
						<div className="text-zinc-900">
							Espécie: <span className="text-zinc-600 font-normal capitalize">{dataHeader.nm_animal}</span>
						</div>
						<div className="text-zinc-900">
							Sexo: <span className="text-zinc-600 font-normal capitalize">{dataHeader.nm_sexo}</span>
						</div>
					</div>


				</div>

				<section className="flex flex-col gap-6 py-8 z-10">
					{
						dataDrug.map(dd => {
							console.log(dd);
							return(
								<ContainerRevenues 
									amount={dd.qtd_medicamento}
									concentracao={dd.concentracao}
									nameDrug={dd.nm_medicamento}
									poso={dd.posologia}
									route={dd.via_adm}
									time={dd.tmp_duracao}
								/>
							)
						})
					}
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
	const [state, setState] = useState({
		status: false,
		id: 0
	})
	return (
		<main className="flex min-h-screen">
			<NavbarTutor />
			<section className="flex-1">
				<Header userType={"tutor"} />
				<main className="max-w-5xl mx-auto">
					{
						state.status
							? (
								<RevenueDetails 
									revenueId={state.id}
									setState={setState} 
								/>
							)
							: (
								<RevenuesList 
									state={setState} 
								/>
							)
					}
				</main>
			</section>
		</main>
	);
}