import { HeaderMedic } from "../../components/HeaderMedic";
import { CaretLeft } from "@phosphor-icons/react";
import { CreateNewRevenues } from "../../components/componentsMedic/CreateNewRevenues";

export default function NewRevenues() {
	function warinngDontSavePage(){
		confirm("Atenção: se você voltar para a página anterior, você pode perder todas as alterações que fez, pois elas não foram salvas. Tem certeza que deseja voltar? ") && history.back()
	}

	return (
		<>
			<HeaderMedic />

			<div className="w-[595px] mx-auto my-3">
				<button	
					type="button"
					className="flex items-center text-sm cursor-pointer"
					onClick={warinngDontSavePage}
				>
					<CaretLeft color="#22B77E" />
					Voltar
				</button>
			</div>

			<main 
				className="max-h-full mb-16"
			>
				<CreateNewRevenues/>
			</main>
		</>
	);
}
