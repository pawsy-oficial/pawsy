import { useEffect, useState } from "react";
import LogoWaterMark from "../../../img/waterMark.svg";
import { CardMedicines } from "../CardMedicines";
import axios from "axios";
import dayjs from "dayjs";

export function Revenues({ idRevenue }) {

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
		axios.get(`${import.meta.env.VITE_URL}/get-revenues/${idRevenue}`)
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
		<main
			className="w-[595px] h-[892px] my-8 mx-auto bg-white border border-primary relative"
		>
			<img
				src={LogoWaterMark}
				alt="marca d'água PAWSY"
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
			<div className="flex py-6 px-8 w-[593px] h-[132px] bg-[#F5FFFE] text-xs font-bold flex-col justify-between">
				<div className="flex justify-between">
					<div>Receituário {dataHeader.nm_TipoReceita}</div>
					<div>Emitido em: {dataHeader.dt_emisao}</div>
					<div>Valido até: {dataHeader.dt_validade}</div>
				</div>
				<div className="flex justify-between">
					{/* <div className="text-zinc-900">
						Unidade: <span className="text-zinc-600 font-normal">ZN Vet</span>
					</div> */}
					<div className="text-zinc-900">
						Médico vet.:{" "}
						<span className="text-zinc-600 font-normal capitalize">{dataHeader.nm_medico}</span>
					</div>
					<div className="text-zinc-900">
						CRMV:<span className="text-zinc-600 font-normal">{dataHeader.cd_crmv}</span>
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
						Idade: <span className="text-zinc-600 font-normal">{dataHeader.dt_nascimento} ano(s)</span>
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

						return(
							<CardMedicines 
								consentration={dd.concentracao}
								amount={dd.qtd_medicamento}
								dosage={dd.posologia}
								nameDrug={dd.nm_medicamento}
								route={dd.via_adm}
								time={dd.tmp_duracao}
							/>
						)
					})
				}
			</section>

			<div className="w-44 h-[1px] my-20 mx-auto bg-black">
				<div className="flex flex-col items-center">
					<p className="text-xs">Dr(a) {dataHeader.nm_medico}</p>
					<p className="text-[9px]">CRMV: {dataHeader.cd_crmv}</p>
				</div>
			</div>

			<div className="w-[595px] h-8 bg-primary flex justify-center items-center absolute bottom-0">
				<img src="src/img/logo.png" alt="" className="w-16" />
			</div>
		</main>
	);
}
