import { X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape(
	{
		vermifuge: Yup.string().required("campo obrigatório").min(3, "minimo 3 caracteres"),
		returnDate: Yup.date().min(dayjs().add(1, "month").format("YYYY-MM-DD"), "deve ter no minimo 1 mês para a próxima dose").required("campo obrigatório")
	}
)

export function ModalVermifuge({ isOpenVermifuge, setOpenVermifuge, id, idClinic, nameMedic, lastName }) {
	const [infoMedic, setInfoMedic] = useState([]);
	const tokenMedic = Cookies.get("jwtTokenMedic");
	const jwtTokenMedic = Cookies.get("jwtTokenMedic");

	
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_URL}/profileMedic`, {
				headers: {
					Authorization: `Bearer ${tokenMedic}`,
				},
			})
			.then((res) => {
				setInfoMedic(res.data);
			});
	}, [])

	const { handleSubmit, register, formState } = useForm({
        mode: "onSubmit",
		resolver: yupResolver(schema)
    });

	const { errors } = formState

	const onSubmit = (data) => {
		data["id_medic"] = infoMedic.storedIdMedic
		data["id_pet"] = id
		data["id_clinic"] = idClinic
		data["description"] = `Seu pet foi tratado com o vermífugo ${data.vermifuge} por ${nameMedic} ${lastName}, mantendo-o seguro contra parasitas internos.`
		
		try {
			axios.post(`${import.meta.env.VITE_URL}/vermifuge`, data, {
				headers: {
					Authorization: "Bearer " + jwtTokenMedic,
				},
			})
				.then((e) => {
					axios.post(`${import.meta.env.VITE_URL}/history`, data)
						.then(f => {
							setOpenVermifuge(!isOpenVermifuge);
						})
						.catch(err => console.log(err))
				})
				.catch((err) => console.log(err));
		} catch (error) {
			console.log("Erro ao integrar vermifugo: ");
		}
	};

	return (
		<>
			{
				isOpenVermifuge && (
					<section
						onClick={e => e.target.tagName === "SECTION" && setOpenVermifuge(false)}
						className="fixed inset-0 bg-primary/40 flex justify-center items-center"
					>
						<form 
							onSubmit={handleSubmit(onSubmit)} 
							className="flex flex-col fixed bg-white p-6 rounded-lg min-w-[22rem]"
						>
							<button
								onClick={() => setOpenVermifuge(false)}
								className="absolute left-80"
							>
								<X size={24} color="#22937E" />
							</button>
							<h2 
								className="text-2xl font-semibold mt-4"
							>
								Nome do vermífugo
							</h2>
							<div className="flex pt-6 flex-col gap-1">
								<p className="text-xs">Proteção</p>
								<input
									{...register("vermifuge")}
									autoFocus
									type="text"
									className="bg-gray-white rounded-lg px-4 py-1 w-full text-base border focus:border-primary"
								/>
								{
									errors.vermifuge && <span className="text-sm text-red-error" >{errors.vermifuge.message}</span>
								}
							</div>
							<div className="flex pt-6 flex-col gap-1">
								<p className="text-xs">Data retorno</p>
								<input
									{...register("returnDate")}
									type="date"
									min={dayjs().add(1, "month").format("YYYY-MM-DD")}
									className="bg-gray-white rounded-lg px-4 py-1 w-full text-base border focus:border-primary"
								/>
								{
									errors.returnDate && <span className="text-sm text-red-error" >{errors.returnDate.message}</span>
								}
							</div>
							<div className="flex flex-row place-content-end pt-6">
								<button
									type="submit"
									className="flex items-center bg-[#22937E] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
								>
									SALVAR
								</button>
							</div>
						</form>
					</section>
				)
			}
		</>
	);

}
