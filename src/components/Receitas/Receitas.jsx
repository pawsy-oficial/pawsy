import { useNavigate } from "react-router-dom"

export function CardReceitas({ emissao, validade, dr, state }) {
	const navigate = useNavigate()
	return (
		<a
			className="flex items-center my-6 mx-auto justify-between py-3 px-24 w-full h-11 bg-[#F5FFFE] border border-primary rounded-lg hover:bg-[#d2eee4]"
			onClick={()=>{state(true)}}
		>
			<p>Emissão: {emissao}</p>
			<p>Validade: {validade}</p>
			<p>Dr(a) {dr}</p>
		</a>
	)
}

export function ContainerRevenues() {
	return (
		<div className="flex flex-col mx-auto pb-8 pt-4 px-6 gap-3 w-[531px] border border-[#1BA8C4] rounded-lg">
			<div className="flex flex-col gap-2">
				<div className="flex justify-between gap-3 text-xs">
					<strong className="font-normal">Medicamento: <span className="text-zinc-700 font-bold">ESPIRONOLACTONA 25mg</span></strong>
				</div>
				<div className="flex justify-between gap-3 text-xs">
					<strong className="font-bold">Concentração: <span className="text-zinc-700 font-normal"> - </span></strong>
					<strong className="font-bold">Via Administração: <span className="text-zinc-700 font-normal">ORAL (Uso Interno)</span></strong>
					<strong className="font-bold">Quantidade: <span className="text-zinc-700 font-normal"> 60 </span></strong>
				</div>
				<div className="flex justify-between gap-3 text-xs">
					<strong className="font-bold">Duração: <span className="text-zinc-700 font-normal"> 01 mês </span></strong>
				</div>
			</div>
			<div className="flex flex-col mx-auto py-5 px-4 gap-2 w-[485px] text-xs bg-[#F5FFFE] border border-primary rounded z-20">
				<strong>Posologia:</strong>
				<p>Tomar 01 comprimido de 12 / 12 horas</p>
			</div>
		</div>
	)
} 