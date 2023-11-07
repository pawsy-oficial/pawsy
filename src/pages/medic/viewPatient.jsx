import { useLocation, useNavigate } from "react-router-dom";
import { HeaderMedic } from "../../components/HeaderMedic";
import dono from "../../img/profilePerson.jpeg";
import { ArrowUUpLeft, CaretLeft, GenderFemale, GenderMale, X } from "@phosphor-icons/react";
import ModalEditObs from "../../components/componentsMedic/ModalEditObs/ModalEditObs";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ViewRevenues from "../../components/componentsMedic/viewPatientsComponents/ViewRevenues";
import ViewVaccines from "../../components/componentsMedic/viewPatientsComponents/ViewVaccines";
import dayjs from "dayjs";

export default function ViewPatient() {
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation()
	const { pet, medic } = location.state

	

	const [infoTutor, setInfoTutor] = useState({
		image: "",
		name: "",
	})
	const [petsTutor, setPetsTutor] = useState([])

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_URL}/get-all-my-pets/${pet.idClinic}/${pet.idTutor}`)
			.then(e => {
				setInfoTutor({
					image: e.data.results[0].url_imagem,
					name: e.data.results[0].nm_tutor
				})
				setPetsTutor(e.data.results)
				// console.log(e.data.results);
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<>

			<HeaderMedic />

			<div className="max-w-7xl mx-auto w-full mt-3">
				<button
					onClick={() => history.back()}
					className="flex gap-2 items-center text-base font-semibold"
				>
					<CaretLeft color="#22B77E" />
					Voltar
				</button>
			</div>
			<main className="max-w-7xl mx-auto my-3 bg-[#F5F7FB] flex justify-between gap-5">
				<section className="bg-white p-6 rounded-xl w-3/4 flex justify-between shadow-md">
					<div className="flex flex-col gap-6 flex-1">
						<section
							className="flex gap-8 flex-1 justify-between"
						>
							<div
								className="flex gap-5"
							>
								<div
									className="flex flex-col gap-2 items-center"
								>
									<div
										className="w-60 h-60 rounded-full border-4 border-secundary overflow-hidden"
										role="img"
									>
										<img
											src={`${import.meta.env.VITE_URL}/files/${pet.imagePet}`}
											className="w-full h-full object-cover"
											draggable={false}
											alt={`Imagem de ${pet.petName}`}
										/>
									</div>

									<span
										className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
										role="contentinfo"
									>
										#{
											pet.idPet.toString().padStart(4, "0")
										}
									</span>
								</div>
								<div className="flex flex-col gap-2">
									<strong className="uppercase font-bold text-4xl flex items-center gap-2 mb-4">
										{
											pet.petName
										}
										{
											pet.gender === "macho" ? <GenderMale color="#1BA8C4" /> : <GenderFemale color="#ff8fcb" />
										} 
										
									</strong>
									<strong
										className="font-semibold text-base"
									>
										Idade:
										<span
											className="font-medium font-lato pl-2"
										>
											{
												dayjs().diff(pet.year, "year")
											} ano(s)
										</span>
									</strong>
									<strong
										className="font-semibold text-base"
									>
										Raça:
										<span
											className="font-medium font-lato pl-2"
										>
											{pet.breed}
										</span>
									</strong>
									<strong
										className="font-semibold text-base"
									>
										Status:
										<span
											className="font-medium font-lato pl-2"
										>
											saudavel
										</span>
									</strong>
									<strong
										className="font-semibold text-base"
									>
										Peso:
										<span
											className="font-medium font-lato pl-2"
										>
											{pet.weight} kg
										</span>
									</strong>
									<strong
										className="font-semibold text-base"
									>
										Altura:
										<span
											className="font-medium font-lato pl-2"
										>
											{pet.height} cm
										</span>
									</strong>
								</div>
							</div>

							<div className="flex flex-col items-end gap-4">
								<button
									onClick={() => navigate("/receitas-medicas", { state: { pet: pet.idPet, clinic: pet.idClinic, medic } })}
									className="rounded-md px-6 text-center text-white bg-[#22937E] p-1"
								>
									Receitas médicas
								</button>
								<button
									onClick={() => navigate("/vacinas-e-vermifugacao", { state: { pet, medic } })}
									className="rounded-md px-6 text-center text-white bg-[#22937E] p-1"
								>
									Vacinas e vermifugação
								</button>
								<button
									onClick={() => setOpen(!open)}
									className="rounded-md px-6 text-center text-white bg-[#22937E] p-1"
								>
									Editar informações
								</button>
								<ModalEditObs
									isOpen={open}
									setOpen={setOpen}
									idPet={pet.idPet}
								/>
							</div>
						</section>

						<div className="flex flex-col">
							<div className="flex flex-col gap-4">
								<h3
									className="font-bold text-2xl"
								>
									Observações
								</h3>
								<ul
									className="flex flex-col gap-1"
								>
									<li className="font-semibold text-base">
										Alergia a medicamentos: {pet.allergy}
									</li>
									<li className="font-semibold text-base">
										Castrado(a): {pet.castrated ? "Sim" : "Não"}
									</li>
									<li className="font-semibold text-base">
										Comportamento: {pet.behavior}
									</li>
									<li className="font-semibold text-base">
										Tratamento: {pet.treatment}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<article
					className="bg-white p-6 rounded-xl flex flex-col flex-1 h-fit shadow-md"
				>
					<div
						className="flex flex-col gap-3 items-center"
					>
						<div
							className="w-36 h-36 rounded-full border-2 border-secundary overflow-hidden"
						>
							<img
								src={`${import.meta.env.VITE_URL}/files/${infoTutor.image}`}
								className="w-full h-full object-cover"
								draggable={false}
								alt={`Imagem do(a) ${infoTutor.name}`}
							/>
						</div>
						<p
							className="text-lg font-bold"
						>
							{
								infoTutor.name
							}
						</p>

					</div>

					<section
						className="flex flex-col gap-3 mt-6"
					>
						{
							petsTutor.map(pet => {
								return (
									<button
										title={`Ver os dados de ${pet.nm_pet}`}
										className="flex gap-4 items-center hover:bg-secundary/10 transition-all duration-300 rounded-full"
										type="button"
									>
										<div
											className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden"
										>
											<img
												src={`${import.meta.env.VITE_URL}/files/${pet.url_img}`}
												className="w-full h-full object-cover"
												draggable={false}
												alt={`Imagem do(a) ${pet.nm_pet}`}
											/>
										</div>
										<strong
											className="font-semibold text-base capitalize"
										>
											{
												pet.nm_pet
											}
										</strong>
									</button>
								)
							})
						}
					</section>
				</article>
			</main>

			{/* <div className="flex justify-center w-full mt-10">
				<section>
					{viewType === "revenues" && (
						<ViewRevenues setViewType={setViewType} />
					)}
					{viewType === "vaccine" && <ViewVaccines setViewType={setViewType} />}
				</section>
			</div> */}
		</>
	);
}
