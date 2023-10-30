import { X } from '@phosphor-icons/react';
import axios from 'axios';
import dayjs from 'dayjs';

export function ModalSeeMedic({isSee, setSee, infoMedic, tutor = false, idClinic, idMedic, token}) {

	function handleRemoveMedic(){
		axios.delete(`${import.meta.env.VITE_URL}/integrar-medico-clinica/${idClinic}/${infoMedic.idMedico}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then(e => {
			setSee(!isSee)
		})
		.catch(err => {console.log(err)})
	}

	return (
			<div className="fixed top-0 bottom-0 left-0 right-0 bg-primary/30 z-50 flex justify-center items-center">
				<div className="fixed  bg-white rounded-lg px-6 py-8 w-1/2 max-w-[760px]">
					<div className='absolute right-6'>
						<button onClick={() => setSee(!isSee)}>
							<X size={28} />
						</button>
					</div>
					<div className='flex flex-col'>
						<div className='flex gap-8'>
							<div>
								<img 
									src={`${import.meta.env.VITE_URL}/files/${infoMedic.imagemPerfil}`} 
									alt={`@${infoMedic.nomeMedico}`} 
									className="flex items-center justify-center w-44 h-44 border-4 border-primary rounded-full object-cover" 
									draggable={false}
								/>
							</div>
							<div
								className="flex flex-col gap-4"
							>
								<h1
									className="font-bold pb-3 capitalize text-4xl"
								>
									{infoMedic.nomeMedico}
								</h1>
								<p
									className="text-normal"
								>
									<span className='font-semibold'>Data de inscrição:</span> {dayjs(infoMedic.dataInscricao).format("DD/MM/YYYY")}
								</p>
								<p 
									className="text-normal"
								>
									<span className='font-semibold'>Especialidade:</span> {infoMedic.especialidade}
								</p>
								<p 
									className="text-normal"
								>
									{/* <span className='font-semibold'>CRMV:</span> {detailsMedic[4]} */}
								</p>
							</div>
						</div>

						{
							!tutor && (
								<div className="flex justify-end">
									<button onClick={handleRemoveMedic} type="" className="py-1 px-5 bg-red-error rounded-lg">
										<p className="text-base font-semibold text-white">Remover</p>
									</button>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
	
}