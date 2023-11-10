import { Trash } from "@phosphor-icons/react";

export function CreateNewMedicines({ remove, index, register }) {
	return (
		<article 
			className="relative group flex flex-col mx-auto pb-8 pt-4 px-6 gap-3 w-[531px] border border-[#1BA8C4] rounded-lg z-10"
		>
			<div className="flex flex-col gap-2">
				<div className="flex gap-8 text-xs items-center">
					<p>Medicamento:</p>
					<input
						type="text"
						className="bg-[#F5FFFE] w-80 h-5 border border-primary rounded pl-1"
						{...register(`drug.${index}.drugName`)}
					/>
				</div>
				<div className="flex gap-2 text-xs ">
					<strong className="font-bold">
						Concentração:{" "}
						<input
							type="number"
							className="w-9 h-5 border pl-1 border-primary bg-[#F5FFFE] rounded"
							{...register(`drug.${index}.concentration`)} 
						/>
					</strong>
					<strong className="font-bold">
						Via Administração:{" "}
						<select
							{...register(`drug.${index}.route`)}
							className="w-28 h-5 border border-primary bg-[#F5FFFE] rounded"

						>
							<option value="Via oral">Via oral</option>
							<option value="Retal">Retal</option>
							<option value="Sublingual">Sublingual</option>
							<option value="Intravenoso">Intravenoso</option>
							<option value="Dermatológica">Dermatológica</option>
							<option value="Nasal">Nasal</option>
							<option value="Oftálmica">Oftálmica</option>
						</select>
					</strong>
					<strong className="font-bold">
						Quantidade:{" "}
						<input
							{...register(`drug.${index}.amount`)}
							type="number"
							className="w-9 h-5 border pl-1 border-primary bg-[#F5FFFE] rounded"
						/>
					</strong>
				</div>
				<div className="flex justify-between gap-3 text-xs">
					<strong className="font-bold">
						Duração:{" "}
						<input
							type="number"
							{...register(`drug.${index}.time`)}
							className="w-9 h-5 border pl-1 border-primary bg-[#F5FFFE] rounded"
						/>
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
				<textarea
					type="text"
					{...register(`drug.${index}.dosage`)}
					placeholder="Coloque aqui a posologia do medicamento"
					rows={5}
					className="bg-[#F5FFFE] resize-none focus-within:outline-none"
				/>
			</fieldset>


			<button
				type="button"
				className="text-red-error text-sm font-lato absolute right-2 top-2 group-hover:block hidden"
				onClick={()=>remove(index)}
			>
				<Trash color="#DC3453" size={24} />
			</button>
		</article>
	);
}
