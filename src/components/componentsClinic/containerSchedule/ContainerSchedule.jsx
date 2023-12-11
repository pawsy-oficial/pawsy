import { Eye, Pencil, PlusCircle, X } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { SwitchClinic } from '../../inputsComponents'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'

const ModalConsulta = ({ consulta, onClose }) => {
	const jwtTokenClinic = Cookies.get("jwtTokenClinic");
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleCancelConsulta = async () => {
		setLoading(true);
		try {
			await axios.post(
				`${import.meta.env.VITE_URL}/cancelar-consulta/${consulta.idConsulta}/${consulta.idDisponibilidade}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + jwtTokenClinic,
					},
				}
			);
			setSuccessMessage("Consulta cancelada com sucesso!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			setErrorMessage("Erro ao cancelar a consulta. Tente novamente.");
			setLoading(false);
		}
	};

	const handleHistoricoConsulta = async () => {
		setLoading(true);
		try {

			const responseClinic = await axios.get(import.meta.env.VITE_URL + '/profileClinic', {
				headers: {
					'Authorization': 'Bearer ' + jwtTokenClinic
				}
			});

			const cd_clinica = responseClinic.data.storedIdClinica;

			await axios.post(
				`${import.meta.env.VITE_URL}/historico-consulta/${consulta.idPet}/${cd_clinica}/${consulta.idConsulta}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + jwtTokenClinic,
					},
				}
			);
			setSuccessMessage("Histórico preenchido com sucesso!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			setErrorMessage("Erro ao preencher o histórico. Tente novamente.");
			setLoading(false);
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg max-w-md w-full">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold mb-4">Detalhes da Consulta</h2>
					<button className="mb-3" onClick={onClose}>
						<X size={24} />
					</button>
				</div>
				<div className="flex gap-3 items-center">
					<div
						className={`w-[90px] h-[90px]  sm:w-40 sm:h-40 rounded-full border-2 border-primary overflow-hidden bg-primary/20`}
					>
						<img
							src={`${import.meta.env.VITE_URL}/files/${consulta.imgPet}`}
							className="h-full w-full object-cover"
							draggable={false}
						/>
					</div>
					<div className="flex flex-col gap-1 flex-1">
						<div className='text-sm text-zinc-500'>
							Nome do Pet: <strong className='text-base text-zinc-800'>{consulta.nomePet}</strong>
						</div>
						<div className='text-sm text-zinc-500'>
							Nome do Tutor: <strong className='text-base text-zinc-800'>{consulta.nomeTutor}</strong>
						</div>
						<div className='text-sm text-zinc-500'>
							Data da Consulta: <strong className='text-base text-zinc-800'>{consulta.dataConsulta}</strong>
						</div>
						<div className='text-sm text-zinc-500'>
							Hora da Consulta: <strong className='text-base text-zinc-800'>{consulta.horaConsulta}</strong>
						</div>
						<div className='text-sm text-zinc-500'>
							Nome do Médico: <strong className='text-base text-zinc-800'>{consulta.nomeMedico}</strong>
						</div>
					</div>
				</div>
				<div className="flex justify-center gap-4 pt-4">
					<button
						className="bg-red-500 p-2 text-white font-semibold rounded-lg w-full"
						onClick={handleCancelConsulta}
						disabled={loading}
					>
						Cancelar consulta
					</button>
					<button
						className="bg-primary p-2 text-white font-semibold rounded-lg w-full"
						onClick={handleHistoricoConsulta}
						disabled={loading}
					>
						Compareceu
					</button>
				</div>
				{successMessage && (
					<p className="text-green-500 text-center mt-4">{successMessage}</p>
				)}
				{errorMessage && (
					<p className="text-red-500 text-center mt-4">{errorMessage}</p>
				)}
			</div>
		</div>
	);
};

export function ContainerSchedule({ dia, consultas, alterPage }) {
	const [selectedConsulta, setSelectedConsulta] = useState(null);

	const openModal = (consulta) => {
		setSelectedConsulta(consulta);
	};

	const closeModal = () => {
		setSelectedConsulta(null);
	};

	return (
		<div className="flex flex-col gap-6 mt-6 rounded-lg">
			<span className="text-2xl">{dia}</span>
			<div className="flex gap-4 flex-col">
				{
					consultas.map((consulta) => (
						<button
							key={consulta.id}
							className={`bg-white rounded-lg w-full cursor-pointer hover:bg-secundary/10 transition-all duration-500 flex justify-between px-5 py-4 ${false && "line-through text-zinc-400"}`}
							onClick={() => openModal(consulta)}
						>
							<div className="flex gap-10">
								<p>
									{dia}
								</p>
								<p>{consulta.horaConsulta}</p>
								<p>{consulta.nomeTutor}</p>
							</div>
							<p>Dr. {consulta.nomeMedico}</p>
						</button>
					))
				}

			</div>

			{selectedConsulta && (
				<ModalConsulta
					consulta={selectedConsulta}
					onClose={closeModal}
				/>
			)}
		</div>
	);
}


export function ContainerMonthSchedule({ idAgenda, idClinica, abertura, fechamento, nome, obs }) {
	const [handleSwitch, setHandleSwitch] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const getStatus = async () => {
			const jwtTokenClinic = Cookies.get('jwtTokenClinic');
			try {
				axios.get(`${import.meta.env.VITE_URL}/status-schedule/${idAgenda}`, {
					headers: {
						'Authorization': 'Bearer ' + jwtTokenClinic
					}
				}).then((response) => {
					const isAgendaAtiva = response.data;
					if (isAgendaAtiva) {
						setHandleSwitch(true);
					}
				}).catch(err => console.log(err));
			} catch (error) {
				console.log(error);
			}
		};

		getStatus();
	}, []);

	const toggleSwitch = async () => {
		if (!handleSwitch) {
			setHandleSwitch(true);
			const jwtTokenClinic = Cookies.get('jwtTokenClinic');
			try {
				await axios.post(`${import.meta.env.VITE_URL}/gerar-consultas`, { idAgenda }, {
					headers: {
						'Authorization': 'Bearer ' + jwtTokenClinic
					}
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<section className="relative p-6 rounded-lg border border-zinc-400 bg-white font-lato flex flex-col justify-between gap-2">
			<h1 className="font-bold text-zinc-500 text-2xl hover:text-primary">{nome}</h1>
			<div className="flex gap-3">
				<p className="text-zinc-500">{abertura}  até  {fechamento}</p>
			</div>
			<p className="text-zinc-500 text-sm">{obs}</p>
			<div className="flex justify-between gap-4 w-full md:justify-start items-center">
				<SwitchClinic state={handleSwitch} onChange={toggleSwitch} />
				<label className="text-sm font-semibold" htmlFor="allDateSchedule">GERAR CONSULTAS</label>
			</div>
			<div className="pt-4">
				<button className="flex items-center gap-3 p-1 px-2 bg-primary text-base font-medium text-white rounded-md"
					onClick={() => {
						console.log("Dados enviados:", idAgenda, nome, abertura, fechamento);
						navigate("/consultas-agenda", { state: { idAgenda, nome, abertura, fechamento } });
					}}
				><Eye /> Visualizar agenda</button>
			</div>
		</section>
	);
}

export function TimeLineSchendule({ year, index }) {
	const date = new Date()
	const indexCurrentYear = date.getFullYear()

	return (
		<>
			<input type="radio" name="yearTimeLine" id={`${index}-${year}`} className="radio hidden" defaultChecked={year == indexCurrentYear ? true : false} />
			<label htmlFor={`${index}-${year}`}>
				<span className="text-zinc-500 text-2xl">
					{year}
				</span>
			</label>
		</>
	)
}