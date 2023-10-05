import { X } from '@phosphor-icons/react';
import pessoa from '../../img/person1.png';

export function ModalSeeMedic(props) {
	const detailsMedic = ["Carlos Santana", { pessoa }, '07/01/2023', 'Cardiologista', 'SP 21909']

	if (props.isSee) {
		return (
			<div className="fixed top-0 bottom-0 left-0 right-0 bg-[#111111]/60 z-50 flex justify-center items-center">
				<div className="fixed  bg-white rounded-lg px-6 py-8 w-1/2 max-w-[760px]">
					<div className='absolute right-6'>
						<button onClick={() => props.setSee(!props.isSee)}>
							<X size={28} />
						</button>
					</div>
					<div className='flex flex-col'>
						<div className='flex gap-8'>
							<div>
								<img src={pessoa} alt={pessoa} className="flex items-center justify-center w-44 h-44 border-4 border-primary rounded-full object-cover" />
							</div>
							<div
								className="flex flex-col gap-4"
							>
								<h1
									className="text-xl font-bold pb-3"
								>
									{detailsMedic[0]}
								</h1>
								<p
									className="text-normal"
								>
									<span className='font-semibold'>Data de inscrição:</span> {detailsMedic[2]}
								</p>
								<p 
									className="text-normal"
								>
									<span className='font-semibold'>Especialidade:</span> {detailsMedic[3]}
								</p>
								<p 
									className="text-normal"
								>
									<span className='font-semibold'>CRMV:</span> {detailsMedic[4]}
								</p>
							</div>
						</div>

						<div className="flex justify-end pt-6">
							<button onClick={() => props.setSee(!props.isSee)} type="" className="py-3 px-5 bg-red-error rounded-lg">
								<p className="text-base font-semibold text-white">Apagar</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}