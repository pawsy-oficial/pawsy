import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Dog } from "@phosphor-icons/react";

export function ModalPetExists(props) {
	const [petDetails, setPetDetails] = useState({
		id_pet: "",
		cpf_tutor: ""
	});
	const [errorMessage, setErrorMessage] = useState('');  // Para tratamento de erro
	const [infoPet, setInfoPet] = useState([])


	const handleChange = (e) => {
		const { name, value } = e.target;
		setPetDetails(prevDetails => ({
			...prevDetails,
			[name]: value
		}));
	};

	useEffect(() => {
		if (petDetails.cpf_tutor.length == 11 || petDetails.id_pet.length > 0) {
			axios.get(`${import.meta.env.VITE_URL}/getAllPets?idPet=${petDetails.id_pet}&cpfTutor=${petDetails.cpf_tutor}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get('jwtTokenClinic')}`
				}
			}).then(e => {
				console.log(e.data.result);
				setInfoPet(e.data.result)
			})
				.catch(err => console.log(err))
		}
		else {
			setInfoPet([])
		}
	}, [petDetails])


	useEffect(() => {

	}, [])


	const handleSubmit = async () => {
		try {
			const jwtTokenClinic = Cookies.get('jwtTokenClinic');
			axios.get(import.meta.env.VITE_URL + '/profileClinic', {
				headers: {
					'Authorization': 'Bearer ' + jwtTokenClinic
				}
			}).then(e => {
				const id_clinica = e.data.storedIdClinica
				axios.post(import.meta.env.VITE_URL + '/integrar-paciente-clinica', {
					...petDetails,
					id_clinica
				}).then(e => {
					if (e.data.message === "Pet-paciente integrado com sucesso!") {
						props.setOpen(false);
					} else {
						setErrorMessage(response.data.error);  // Atualiza a mensagem de erro
					}
				})
				.catch(err => console.log(err))
	
			}).catch(err => console.log(err))
		} catch (error) {
			setErrorMessage("Erro ao integrar o pet.");  // Mensagem genérica
			console.error("Error integrating pet:", error);
		}
	};

	const [selectedOption, setSelectedOption] = useState(0)
	function handleChangeSelect(e) {
		setSelectedOption(e.target.value)
	}

	if (props.isOpen) {
		return (
			<div className="fixed top-0 bottom-0 left-0 right-0 bg-primary/20 z-[800]">
				<div className="flex flex-col gap-4 fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white p-6 rounded-lg">
					<div
						className='flex gap-6 items-center'
					>
						<div className="flex flex-col gap-6">
							<div className="flex items-center justify-center w-40 h-40 border-4 border-primary bg-primary/10 rounded-full overflow-hidden">
								{
									infoPet.length > 0
										? <img
											src={`${import.meta.env.VITE_URL}/files/${infoPet[selectedOption].url_img}`}
											className='w-full h-full object-cover'
										/>
										: (
											<Dog size={64} color="#22B77E" />
										)
								}
							</div>

							<select
								value={selectedOption}
								onChange={handleChangeSelect}
								className='border border-primary px-6 py-1 rounded-lg text-center focus-within:outline-none font-semibold capitalize'
							>
								{
									infoPet.map((pets, i) => {
										return <option
											value={i}
										>
											{pets.nm_pet}
										</option>
									})
								}
							</select>
						</div>
						<input type="file" id="photo" className="hidden" />
						<div className="">
							<p className="pb-1 text-base font-normal">Número de identidade (pet):</p>
							<input
								type="text"
								name="id_pet"
								className="border-b-2 w-64"
								placeholder="ex.: #0000"
								value={petDetails.id_pet}
								onChange={handleChange}
							/>
							<p className="pt-4 pb-1 text-base font-normal">CPF tutor:</p>
							<input
								type="text"
								name="cpf_tutor"
								className="border-b-2 w-64"
								placeholder="ex.: 123.456.789-00"
								value={petDetails.cpf_tutor}
								onChange={handleChange}
							/>
						</div>
					</div>
					{errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}  {/* Mostra mensagem de erro se houver */}
					<div className="w-full flex justify-end gap-6">
						<button
							onClick={handleSubmit}
							type=""
							className="px-4 py-1 bg-[#04AD34] text-white rounded-lg"
						>
							<p className="text-sm">Adicionar</p>
						</button>
						<button onClick={() => props.setOpen(!props.isOpen)} type="" className="px-4 py-1 bg-red-error rounded-lg text-white">
							<p className="text-sm">Cancelar</p>
						</button>
					</div>


				</div>
			</div>
		)
	}
}
