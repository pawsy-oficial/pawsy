import style from "./ModalVermifuge.module.css";
import { FloppyDisk, X } from "@phosphor-icons/react";
import { useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export function ModalVermifuge({ isOpenVermifuge, setOpenVermifuge, id }) {
	const [vermifuge, setVermifuge] = useState("");
	const jwtTokenMedic = Cookies.get("jwtTokenMedic")
	const data = {
			vermifuge: vermifuge,
			id_pet: id,
			id_medic: "1"
	}
	const handleSubmit = async () => {
		try {
			axios.post(`${import.meta.env.VITE_URL}/vermifuge`, data, {
					headers: {
						'Authorization': 'Bearer ' + jwtTokenMedic
					}
				,
			}).then(e => {
				console.log(e);
				setOpenVermifuge(!isOpenVermifuge)
			}).catch(err => console.log(err))

		} catch (error) {
			console.log("Erro ao integrar vermifugo: ");
		}
	};
	if (isOpenVermifuge) {
		return (
			<div className={style.background}>
				<form onSubmit={e => e.preventDefault()} className={style.modal}>
					<button onClick={() => setOpenVermifuge(false)} className="absolute left-80">
						<X size={24} color="#22937E" />
					</button>
					<h2 className="text-2xl font-semibold mt-4">Nome do vermífugo</h2>
					<div className="flex pt-6 flex-col gap-1">
						<p className="text-xs">Proteção</p>
						<input
							type="text"
							value={vermifuge}
							onChange={e => setVermifuge(e.target.value)}
							name="vermifuge"
							className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary"
						/>
					</div>
					<div className="flex flex-row place-content-end pt-6">
						<button
							onClick={handleSubmit}
							className="flex items-center bg-[#22937E] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
						>
							<FloppyDisk size={24} />
							SALVAR
						</button>
					</div>
				</form>
			</div>
		);
	}
}
