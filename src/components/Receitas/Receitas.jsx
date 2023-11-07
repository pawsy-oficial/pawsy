import dayjs from "dayjs" 

export function CardReceitas({ emissao, validade, dr, state, idRevenue }) {
	return (
		<button
			className="cursor-pointer flex flex-col gap-3 md:flex-row md:items-center my-6 md:mx-auto justify-between py-3 px-4 md:px-24 w-full min-h-[40px] bg-[#F5FFFE] border border-primary rounded-lg hover:bg-[#d2eee4]"
			onClick={()=>{state({status: true, id: idRevenue})}}
		>
			<p><strong>Emissão:</strong> {dayjs(emissao).format("DD/MM/YYYY")}</p>
			<p><strong>Validade:</strong> {dayjs(validade).format("DD/MM/YYYY")}</p>
			<p className="capitalize"><strong>Dr(a):</strong> {dr}</p>
		</button>
	)
}

export function ContainerRevenues({ nameDrug, concentracao, route, amount, time, poso }) {
	return (
		<div className="flex flex-col mx-auto pb-8 pt-4 px-6 gap-3 w-[531px] border border-[#1BA8C4] rounded-lg">
			<div className="flex flex-col gap-2">
				<div className="flex justify-between gap-3 text-xs">
					<strong className="font-normal">Medicamento: <span className="text-zinc-700 font-bold">{nameDrug}</span></strong>
				</div>
				<div className="flex justify-between gap-3 text-xs">
					<strong className="font-bold">Concentração: <span className="text-zinc-700 font-normal"> {concentracao} </span></strong>
					<strong className="font-bold">Via Administração: <span className="text-zinc-700 font-normal">{route}</span></strong>
					<strong className="font-bold">Quantidade: <span className="text-zinc-700 font-normal"> {amount} </span></strong>
				</div>
				<div className="flex justify-between gap-3 text-xs">
					<strong className="font-bold">Duração: <span className="text-zinc-700 font-normal"> {time} </span></strong>
				</div>
			</div>
			<div className="flex flex-col mx-auto py-5 px-4 gap-2 w-[485px] text-xs bg-[#F5FFFE] border border-primary rounded z-20">
				<strong>Posologia:</strong>
				<p>{poso}</p>
			</div>
		</div>
	)
} 