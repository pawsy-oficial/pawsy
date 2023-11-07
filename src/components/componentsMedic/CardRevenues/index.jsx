import { useNavigate } from "react-router-dom";

export function CardRevenues({ emissao, validade, dr, state, idRevenue }) {
	return (
		<a
			className="flex items-center my-6 mx-auto justify-between py-3 px-24 w-full h-11 bg-[#F5FFFE] border border-primary rounded-lg hover:bg-[#d2eee4]"
			onClick={() => {
				state(
					{
						status: true,
						id: idRevenue
					}
				);
			}}
		>
			<p>Emissão: {emissao}</p>
			<p>Validade: {validade}</p>
			<p className="capitalize">Dr(a) {dr}</p>
		</a>
	);
}
