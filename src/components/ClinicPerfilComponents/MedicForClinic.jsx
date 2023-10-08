import pessoa from '../../img/person1.png';

export default function MedicForClinic({nameMedic, imageMedic}) {
	const Medic = ['Carlos Santana']
	return (
		<div className="flex items-center">
			<div className="w-10 h-10 flex rounded-full border-2 border-primary overflow-hidden">
				<img
					src={`${import.meta.env.VITE_URL}/files/${imageMedic}`}
					alt={`@${nameMedic}`}
					className="object-cover w-full h-full"
				/>
			</div>
			<p className="pl-2 text-base capitalize">{nameMedic}</p>
		</div>
	)
}