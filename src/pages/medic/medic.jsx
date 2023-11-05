import { HeaderMedic } from "../../components/HeaderMedic";
import CardClinics from "../../components/componentsMedic/CardClinics/CardClinics";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Medic() {
	const [infoMedic, setInfoMedic] = useState([]);
	const [idMedic, setIdMedic] = useState(null)
	const [clinicsMedic, setClinicsMedic] = useState([]);

	const tokenMedic = Cookies.get("jwtTokenMedic")

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_URL}/profileMedic`, {
			headers: {
				Authorization: `Bearer ${tokenMedic}`
			}
		}).then(res => {
			setInfoMedic(res.data)
			setIdMedic(res.data.storedIdMedic)
		})

		axios.get(`${import.meta.env.VITE_URL}/clinicsMedic`, {
			headers: {
				Authorization: `Bearer ${tokenMedic}`
			}
		}).then(res => {
			setClinicsMedic(res.data.results)
		})
	}, []);

	return (
		<>
			<header>
				<HeaderMedic />
			</header>
			<section className="max-w-7xl mx-auto mt-8 bg-[#F5F7FB]">
				<h1 className="text-3xl font-semibold capitalize">
					Olá, {infoMedic.storedNameMedic}
				</h1>
				<h3 
					className="mt-8 text-lg"
				>
					Clínicas onde você trabalha:
				</h3>
				<nav 
					className="flex flex-wrap gap-3 mt-4"
				>
					{
						clinicsMedic.length == 0
						? <p>Você não está registrado em nenhuma clínica</p>
						: clinicsMedic.map((clinic, i) => {
							return (
								<CardClinics
									key={i}
									img={clinic.url_imagem}
									nameClinic={clinic.nm_clinica}
									idClinic={clinic.id_clinica}
									idMedic={idMedic}
								/>
							)
						})
					}
				</nav>
			</section>
		</>
	)
}