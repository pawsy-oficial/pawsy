export function CardMedicines({ nameDrug, consentration, time, amount, route, dosage }) {
	return (
		<>
			<article
				className="relative group flex flex-col mx-auto pb-8 pt-4 px-6 gap-3 w-[531px] border border-[#1BA8C4] rounded-lg z-10"
			>
				<div className="flex flex-col gap-2">
					<div className="flex gap-8 text-xs items-center">
						<p className="font-bold">Medicamento:</p>
						<span className="text-zinc-700">
							{nameDrug}
						</span>
					</div>
					<div className="flex gap-2 text-xs ">
						<strong className="font-bold">
							Concentração:{" "}
						</strong>
							<span className="text-zinc-700">
								{consentration} mg
							</span>
						<strong className="font-bold">
							Via Administração:{" "}
						</strong>
							<span>
								{route}
							</span>
						<strong className="font-bold">
							Quantidade:{" "}
						</strong>
							<span>
								{amount}
							</span>
					</div>
					<div className="flex justify-between gap-3 text-xs">
						<strong>
							Duração:{" "}
							<span className="">
								{time} dia(s)
							</span>
						</strong>
					</div>
				</div>

				<fieldset
					className="flex flex-col mx-auto py-1 px-4 gap-2 w-full text-xs bg-[#F5FFFE] border border-primary rounded z-20"
				>
					<legend
						className="px-4 font-bold font-lato"
					>
						Posologia:
					</legend>
					<p>
						{dosage}
					</p>
				</fieldset>
			</article>
		</>
	);
}
