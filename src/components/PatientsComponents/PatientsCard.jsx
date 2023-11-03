import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import axios from 'axios';
import Cookies from 'js-cookie';

export function PatientsCard({ pet, donosP, id, image, gender, idClinic, setSee, see }) {
	return (
		<>
			<ModalSeePatient
				See={see}
				setSee={setSee}
				pet={pet}
				donos={donosP}
				id={id}
				image={image}
				idClinic={idClinic}
			/>
			<button
				onClick={() => setSee(!see)}
				className=""
			>
				<div className="flex w-full rounded-lg bg-[#F5FFFE] p-2 gap-6 items-center hover:bg-primary/10 transition-all">
					<div className="w-10 h-10 flex rounded-full border-2 border-primary overflow-hidden">
						<img
							src={`${import.meta.env.VITE_URL}/files/${image}`}
							alt={pet}
							className="object-cover w-full h-full"
						/>
					</div>
					<p className="text-lg capitalize font-semibold">
						<span className='text-zinc-500 text-xs !font-normal'>Nome pet: </span>
						{pet}
					</p>
					<p className="text-lg capitalize font-semibold">
						<span className='text-zinc-500 text-xs !font-normal'>Tutor: </span>
						{donosP}
					</p>
					<p className="text-lg capitalize font-semibold">
						<span className='text-zinc-500 text-xs !font-normal'>Sexo: </span>
						{gender}
					</p>
				</div>
			</button>
		</>
	)
}


function ModalSeePatient({ See, setSee, donos, id, pet, image }) {
	function handleRemovePatient() {
		axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtTokenClinic")}`
            }
		}).then(e => {
			axios.delete(`${import.meta.env.VITE_URL}/patient/${e.data.storedIdClinica}/${id}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("jwtTokenClinic")}`
				}
			})
				.then(e => {
					setSee(!See)
				})
				.catch(err => console.log(err))
		})
	}

	if (See) {
		return (
			<section
				className="fixed inset-0 bg-primary/20 z-[800] flex justify-center items-center"
				onClick={e => {
					if (e.target.tagName == "SECTION") {
						setSee(!See)
					}
				}}
			>
				<div className="bg-white rounded-lg p-4 min-w-fit w-96 relative flex flex-col gap-6">
					<button
						onClick={() => setSee(!See)}
						className='absolute right-4'
					>
						<X size={28} />
					</button>
					<div className="flex gap-6">
						<div
							className='flex flex-col gap-3'
						>
							<div className="w-36 h-36 flex rounded-full border-2 border-primary overflow-hidden">
								<img
									src={`${import.meta.env.VITE_URL}/files/${image}`}
									alt={pet}
									className='w-full h-full object-cover'
								/>
							</div>

						</div>
						<div
							className='flex flex-col gap-8 justify-center'
						>
							<div className="flex flex-col items-start gap-4">
								<h1
									className="text-3xl font-bold capitalize"
								>
									{pet}
								</h1>
								<p className="text-normal flex gap-2">
									Tutor:
									<span className='font-semibold'>
										{donos}
									</span>
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<span
							className='text-zinc-400'
						>
							#{
								id.toString().padStart(4, '0')
							}
						</span>
						<button
							onClick={handleRemovePatient}
							type="button"
							className="px-3 py-1 bg-red-error rounded-lg text-base text-white"
						>
							Remover
						</button>
					</div>
				</div>
			</section>
		)
	}
}