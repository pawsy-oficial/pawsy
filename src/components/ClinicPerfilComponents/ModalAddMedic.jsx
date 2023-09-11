import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Camera, User } from "@phosphor-icons/react";

export function ModalAddMedic(props) {
	const [medicDetails, setMedicDetails] = useState({
		id: "",
		crmv: ""
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [ nameMedic, setNameMedic ] = useState("")
	const [ urlImagem, setUrlImagem ] = useState("")

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMedicDetails(prevDetails => ({
			...prevDetails,
			[name]: value
		}));
	};

	const handleSubmit = async () => {
		try {
			const jwtTokenClinic = Cookies.get('jwtTokenClinic');
			const responseClinic = await axios.get(import.meta.env.VITE_URL + '/profileClinic', {
				headers: {
					'Authorization': 'Bearer ' + jwtTokenClinic
				}
			});

			const cd_clinica = responseClinic.data.storedIdClinica;

			const response = await axios.post(import.meta.env.VITE_URL + '/integrar-medico-clinica', {
				...medicDetails,
				cd_clinica
			});

			if (response.data.message === "Médico integrado com sucesso!") {
				props.setOpen(false);
			} else {
				setErrorMessage(response.data.error);
			}
		} catch (error) {
			setErrorMessage("Erro ao integrar médico: " + error.response.data.error);
		}
	};

	useEffect(()=>{
		const jwtTokenClinic = Cookies.get('jwtTokenClinic');
		const url = `${import.meta.env.VITE_URL}/medico?id=${medicDetails.id}&crmv=${medicDetails.crmv}`


		axios.get(url, {
			headers: {
				Authorization: 'Bearer ' + jwtTokenClinic
			}
		}).then(
			e => {
				setNameMedic(e.data.result[0].nm_medico)
				console.log(`${import.meta.env.VITE_URL}/files/${e.data.result[0].url_imagem}`)
				setUrlImagem(`${import.meta.env.VITE_URL}/files/${e.data.result[0].url_imagem}`)
			}
		).catch(
			e => console.log(e)
		)

	},[medicDetails])

	if (props.isOpen) {
		return (
			<div className="fixed inset-0 bg-[#111111]/60 z-50 flex justify-center items-center">
				<form 
					className="flex flex-col gap-10 fixed bg-white py-8 px-6 rounded-lg"
					onSubmit={e => e.preventDefault()}
				>
					<section
						className='flex gap-6 items-center'
					>
						<div className="flex flex-col items-center gap-2">
							<div 
								className="flex items-center justify-center w-40 h-40 border border-primary overflow-hidden bg-primary/10 rounded-full"
							>
								{
									urlImagem ? <img src={urlImagem} className="w-full h-full object-cover" /> : <User size={80} color="#22B77E" />
								}
								
							</div>
							
							<p className='text-base font-lato font-semibold'>{nameMedic}</p>
							<span className="text-center rounded-lg text-xs bg-red-error/25 p-1">{errorMessage}</span>
							{
							}
						</div>
						<div className="flex ga flex-col gap-1">
							<label className="text-base font-normal flex flex-col gap-3">
								<span
									className='pl-4 font-lato font-semibold text-base'
								>
									Número de identidade Pawsy
								</span>
								<input
									type="text"
									name="id"
									className="border-b-2 w-64 focus:border-b-primary transition-colors pl-4 text-sm"
									placeholder="ex.: #0000"
									value={medicDetails.id}
									onChange={handleChange}
								/>
							</label>
							<small className='text-zinc-500 pl-4 w-full text-center'>ou</small>
							<label className="text-base font-normal flex flex-col gap-3">
								<span
									className='pl-4 font-lato font-semibold text-base'
								>
									CRMV
								</span>
								<input
									type="text"
									name="crmv"
									className="border-b-2 w-64 focus:border-b-primary transition-colors pl-4 text-sm"
									placeholder="ex.: 00000"
									value={medicDetails.crmv}
									onChange={handleChange}
								/>
							</label>
						</div>
					</section>

					<div className="w-full flex justify-end gap-6">
						<button onClick={handleSubmit} type="" className="px-6 py-1 bg-[#04AD34] rounded-lg text-white">
							Adicionar
						</button>
						<button onClick={() => props.setOpen(!props.isOpen)} type="" className="px-6 py-1 bg-[#DC3545] rounded-lg text-white">
							Cancelar
						</button>
					</div>
				</form>
			</div>
		);
	}
}
