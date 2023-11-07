import { HeaderMedic } from "../../components/HeaderMedic";
import { CaretLeft } from "@phosphor-icons/react";
import { CreateNewRevenues } from "../../components/componentsMedic/CreateNewRevenues";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router";

export default function NewRevenues() {
	function warinngDontSavePage(){
		confirm("Atenção: se você voltar para a página anterior, você pode perder todas as alterações que fez, pois elas não foram salvas. Tem certeza que deseja voltar? ") && history.back()
	}

	const location = useLocation()
	const { pet, clinic, medic } = location.state

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
				<CreateNewRevenues
					idPet={pet}
					idClinic={clinic}
					idMedic={medic}
				/>
			</main>
		</>
	);
}
