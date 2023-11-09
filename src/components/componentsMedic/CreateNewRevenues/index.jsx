import axios from "axios";
import LogoWaterMark from "../../../img/waterMark.svg";
import { CreateNewMedicines } from "../CreateNewMedicines";
import { PlusCircle, XCircle } from "@phosphor-icons/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export function CreateNewRevenues({ idPet, idClinic, idMedic }) {
	const [typeRevenue, setTypeRevenue] = useState([])
	const [selectedOption, setSelectedOption] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_URL}/get-type-revenue`)
			.then(result => {
				console.log(result);
				setTypeRevenue(result.data.results)
			})
			.catch(err => console.log(err))
	}, [])

	const schema = Yup.object().shape({
		typeRevenues: Yup.string().oneOf(["1","2","3","4","5","6"]).required("Campo obrigatório"),
		date: Yup.date().required("Campo obrigatório").typeError("Valor invalido"),
		drug: Yup.array().of(
			Yup.object().shape({
				amount: Yup.number().required("Campo obrigatório").typeError("Deve ser um numero"),
				concentration: Yup.number().required("Campo obrigatório").typeError("Deve ser um numero").positive("Deve ser maior que zero (0)"),
				dosage: Yup.string().min(5, "Deve ter no minimo 5 caracteres").max(260, "Limite atingido (260 caracteres)").required("Campo obrigatório"),
				drugName: Yup.string().min(3, "Deve ter no minimo 3 caracteres").required("Campo obrigatório"),
				route: Yup.string().required("Campo obrigatório"),
				time: Yup.number().required("Campo obrigatório").positive("Deve ser maior que zero (0)")
			})
		)
	})

	const { handleSubmit, register, formState, control } = useForm({
		mode: "onSubmit",
		resolver: yupResolver(schema)
	});

	const onSubmit = (data)=>{
		data["idPet"] = idPet
		data["idClinic"] = idClinic
		data["id_pet"] = idPet
		data["id_clinic"] = idClinic
		data["idMedic"] = idMedic
		data["description"] = `Uma nova receita de medicamento foi adicionada ao plano de tratamento de seu pet, visando sua saúde e bem-estar.`
		console.log(data);

		axios.post(`${import.meta.env.VITE_URL}/revenues`, data)
		.then(e => {
			axios.post(`${import.meta.env.VITE_URL}/history`, data)
			.then(f => {
				history.back()
			}).catch(err=>console.log(err))
		})
		.catch(err => console.log(err))


	}

	const { errors } = formState

	const { fields, append, remove } = useFieldArray({
        control,
        name: "drug",
        shouldUnregister: true
    });

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}	
			className="w-[595px] mx-auto flex flex-col gap-8"
		>
			<main
				className="min-h-[892px] flex flex-col max-h-fit bg-white border border-primary relative"
			>
			<img
				src={LogoWaterMark}
				alt="marca d'água PAWSY"
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				draggable={false}
				style={{ userSelect: "none" }}
			/>
			<header
				className="flex py-6 px-8 w-full bg-[#F5FFFE] text-xs font-bold flex-col gap-2"
			>
				<label
					className="flex flex-row items-center gap-4"
				>
					<span>
						Tipo da receita:
					</span>
					<select
						className="w-fit border-secundary border-2 flex items-center rounded-lg py-1 px-3 text-sm bg-white focus:outline-none"
						{
							...register("typeRevenues", {
								onChange: e => setSelectedOption(e.target.selectedIndex)
							})
						}
					>
						{
							typeRevenue.map(tp => {
								return (
									<option
										value={tp.id_TipoReceita}
									>
										{tp.nm_TipoReceita}
									</option>
								)
							})
						}
					</select>
				</label>

				<label 
					className="flex flex-row items-center gap-4 text-zinc-900"
				>
					<span>Data de validade:</span> 
					<input 
						className="w-fit border-secundary border-2 flex items-center rounded-lg py-1 px-3 text-sm bg-white focus:outline-none"
						type="date" 
						min={dayjs().add(7, "day").format("YYYY-MM-DD")}
						{...register("date")}
					/>
				</label>
			</header>

			<section 
				className="flex flex-col gap-6 py-8 z-10"
			>
				{
					fields.map((field, index ) => {
						return(
							<CreateNewMedicines
								key={field.id}
								remove={remove}
								index={index}
								register={register}
							/>
						)
					})
				}
			</section>

			<button
				type="button"
				onClick={()=> append({ data: "" })}
				className="flex gap-2 items-center w-fit mx-auto text-primary text-lg font-semibold font-lato z-50"
			>
				<PlusCircle size={24} />
				<span>Adionar novo medicamento</span>
			</button>

			<div className="w-44 h-[1px] my-20 mx-auto bg-black">
				<div className="flex flex-col items-center pt-3">
					<span className="text-xs">Drª Vanessa Santos</span>
					<span className="text-[9px]">CRMV: 10.000</span>
				</div>
			</div>

			<footer
				className="w-[595px] h-8 bg-primary flex justify-center items-center absolute bottom-0"
			>
				<img 
					src="src/img/logo.png" 
					alt="Logo da Pawsy" 
					className="w-16" 
				/>
			</footer>
			</main>

			<button 
				type="submit"
				disabled={fields.length == 0 && true}
				className={`bg-primary py-1 px-6 rounded-lg text-white font-bold font-lato ${fields.length == 0 && "disabled:opacity-25"}`}
			>
				Salvar
			</button>
		</form>
	);
}
