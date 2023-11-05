import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";
import { useEffect, useState } from "react";
import { CardClinic } from "../../components/cardsAndBoxes/cardClinic";
import dayjs from 'dayjs'
import useCheckedPet from "../../hook/useCheckedPet";
import useTopToScreen from "../../hook/useTopToScreen"
import axios from "axios";
import Cookies from "js-cookie";

export default function VaccinePage() {
	const [alterTable, setAlterTable] = useState(true)
	const [adsPosts, setAdsPosts] = useState([])
	const [tableVaccine, setTableVaccine] = useState([])
	const [tableVermifuge, setTableVermifuge] = useState([])
	const [pets, setPets] = useState([])
	const [idPetOption, setIdPetOption] = useState(null)
	const [windowScreen, setWindowScreen] = useState({ width: null })
	const [loading, setLoading] = useState(false)

	useCheckedPet()
	useTopToScreen()

	useEffect(() => {
		function handleResize() {
			setWindowScreen({ width: window.innerWidth })
		}
		window.addEventListener("resize", handleResize)
		handleResize()

		axios.get(`${import.meta.env.VITE_URL}/getAllAds/all?filter=preview`)
			.then(e => setAdsPosts(e.data.adsPreview))
			.catch(err => console.log(err))

		return () => window.removeEventListener("resize", handleResize)
	}, [])

	useEffect(() => {
		setLoading(true)
		axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("jwtTokenTutor")}`
			}
		})
			.then(result => {
				let idTutor = result.data.storedIdTutor

				axios.get(`${import.meta.env.VITE_URL}/get-all-pets/${idTutor}`, {
					headers: {
						Authorization: `Bearer ${Cookies.get("jwtTokenTutor")}`
					}
				})
					.then(e => setPets(e.data.myPets))
					.catch(err => console.log(err))

				axios.get(`${import.meta.env.VITE_URL}/get-vaccine/${idPetOption}`, {
					headers: {
						Authorization: `Bearer ${Cookies.get("jwtTokenTutor")}`
					}
				})
					.then(e => {
						setTableVaccine(e.data.results)
						setLoading(false)
					})
					.catch(err => console.log(err))

				axios.get(`${import.meta.env.VITE_URL}/get-all-vermifuge/${idTutor}/${idPetOption}`, {
					headers: {
						Authorization: `Bearer ${Cookies.get("jwtTokenTutor")}`
					}
				})
					.then(e => setTableVermifuge(e.data.results))
					.catch(err => console.log(err))
			}).catch(err => console.log(err))
	}, [idPetOption])

	return (
		<main className="flex min-h-screen">
			<NavbarTutor />
			<section className="flex-1">
				<Header userType="tutor" />
				<main className="px-2 sm:px-8 lg:pl-10 lg:pr-16 py-8 flex flex-col gap-5 w-screen md:w-[calc(100vw-256px-24px)] mx-auto">
					<div className="flex gap-6 items-center">
						<select
							className="bg-[#F5FFFE] md:w-44 w-full capitalize cursor-pointer font-bold h-8 border border-primary rounded-lg px-3 outline-none focus:border-primary"
							onChange={e => setIdPetOption(e.target.value)}
						>
							{
								pets.map((pet, index) => {
									return (
										<option
											key={index}
											value={`${pet.pet.id_pawsy}`}
											className="text-gray-800 cursor-pointer hover:outline-none hover:text-gray-950 text-xl"
										>
											{pet.pet.nm_pet}
										</option>
									);
								})
							}
						</select>
					</div>

					<section className="flex flex-1 bg-white px-0 sm:px-6 py-8 rounded-2xl">
						<div className="w-full flex justify-between gap-10">
							<div className="md:flex-1 w-full max-w-3xl">
								<h3 className="font-semibold text-2xl mb-3 text-center font-lato hidden md:block">Vacinas</h3>

								{ // responsivo
									windowScreen.width < 1024
									&& (
										<section className="w-full flex flex-col items-center">
											<div className="w-full flex justify-between gap-6 mb-4">
												<input type="radio" className="hidden" name="typeTable" id="vacina" defaultChecked />
												<label
													className="w-full border-b-2 text-center border-transparent font-lato text-lg font-semibold"
													htmlFor="vacina"
													onClick={() => setAlterTable(true)}
												>
													VACINA
												</label>

												<input type="radio" className="hidden" name="typeTable" id="vermifugo" />
												<label
													className="w-full border-b-2 border-transparent text-center font-lato text-lg font-semibold"
													htmlFor="vermifugo"
													onClick={() => setAlterTable(false)}
												>
													VERMÍFUGO
												</label>
											</div>
											{
												alterTable ?
													(
														<table
															className="w-full cursor-default border-0"
														>
															<thead>
																<tr className="border-none">
																	<th className="py-1 border-none bg-primary text-white text-sm w-40 rounded-l-full">
																		Vacina
																	</th>
																	<th className=" py-1 border-none bg-primary text-white text-sm w-40">
																		Data de aplicação
																	</th>
																	<th className=" py-1 border-none bg-primary text-white text-sm w-40">
																		Retorno
																	</th>
																	<th className=" py-1 border-none bg-primary text-white text-sm w-40 rounded-r-full">
																		Veterinário
																	</th>
																</tr>
															</thead>
															<tbody className="second line-colors border-0">
																{
																	loading 
																	? <p>Carregando...</p>
																	: tableVaccine.map((e, index) => {
																		return (
																			<tr
																				key={index}
																				className="border-none"
																				id={`id_${e.idAplication}_application`}
																			>
																				<td className="border-none rounded-l-full capitalize text-sm">{e.nameVaccine}</td>
																				<td className="border-none text-sm">{dayjs(e.dateAplication).format('DD/MM/YYYY')}</td>
																				<td className="border-none text-sm">{dayjs(e.dateReturn).format('DD/MM/YYYY')}</td>
																				<td className="border-none capitalize text-sm rounded-r-full">{e.nameMedic}</td>
																			</tr>
																		);
																	})
																}
															</tbody>
														</table>
													)
													: (
														<table className="cursor-default">
															<thead>
																<tr className="">
																	<th className=" bg-primary text-white text-sm w-40 py-1 border-none rounded-l-full">
																		Data
																	</th>
																	<th className=" bg-primary text-white text-sm w-40 py-1 border-none rounded-r-full">
																		Nome
																	</th>
																</tr>
															</thead>
															<tbody className="second line-colors">
																{
																	loading
																	? <p>Carregando...</p>
																	: tableVermifuge.map((e) => {
																		return (
																			<tr className="">
																				<td className="border-none rounded-l-full">{dayjs(e.dt_aplicacao).format("DD/MM/YYYY")}</td>
																				<td className="border-none rounded-r-full">{e.nm_vermifugo}</td>
																			</tr>
																		);
																	})
																}
															</tbody>
														</table>
													)
											}
										</section>
									)
								}
								<table className="w-full cursor-default hidden lg:block border-none rounded-lg rounded-r-2xl">
									<thead className="border-none">
										<tr className="border-b border-black border-none">
											<th className="py-1 bg-primary text-white text-sm w-40 border-none rounded-l-full">
												Vacina
											</th>
											<th className=" py-1 bg-primary text-white text-sm w-40 border-none">
												Data de aplicação
											</th>
											<th className=" py-1 bg-primary text-white text-sm w-40 border-none">
												Retorno
											</th>
											<th className=" py-1 bg-primary text-white text-sm w-40 border-none">
												Veterinário
											</th>
											<th className=" py-1 bg-primary text-white text-sm w-40 border-none rounded-r-full">
												CRMV
											</th>
										</tr>
									</thead>
									<tbody className="second line-colors">
										{
											loading
											? <p>Carregando...</p>
											: tableVaccine.map((e, index) => {
												return (
													<tr
														key={index}
														className="border-none"
														id={`id_${e.idAplication}_application`}
													>
														<td className="border-none rounded-l-full capitalize">{e.nameVaccine}</td>
														<td className="border-none">{dayjs(e.dateAplication).format('DD/MM/YYYY')}</td>
														<td className="border-none">{dayjs(e.dateReturn).format('DD/MM/YYYY')}</td>
														<td className="border-none capitalize">{e.nameMedic}</td>
														<td className="border-none rounded-r-full">{e.crmv}</td>
													</tr>
												);
											})
										}
									</tbody>
								</table>
							</div>
							<div className="hidden xl:block">
								<h3 className="font-semibold text-2xl mb-3 text-center font-lato">Vermífugos</h3>
								<table className="cursor-default">
									<thead>
										<tr className="">
											<th className=" bg-primary text-white text-sm w-40 py-1 border-none rounded-l-full">
												Data
											</th>
											<th className=" bg-primary text-white text-sm w-40 py-1 border-none rounded-r-full">
												Nome
											</th>
										</tr>
									</thead>
									<tbody className="second line-colors">
										{
											loading
											? <p>Carregando...</p>
											: tableVermifuge.map((e) => {
												return (
													<tr className="">
														<td className="border-none rounded-l-full">{dayjs(e.dt_aplicacao).format("DD/MM/YYYY")}</td>
														<td className="border-none rounded-r-full">{e.nm_vermifugo}</td>
													</tr>
												);
											})
										}
									</tbody>
								</table>
							</div>
						</div>
					</section>

					<section className="w-full mt-4">
						<p className="titulo-card">
							Campanhas de vacinação próximas de você
						</p>
						<section className="lg:flex gap-5 w-full lg:overflow-auto py-3 grid grid-cols-2">
							{
								adsPosts.length != 0
									? (
										adsPosts.map(ad => {
											return (
												<CardClinic
													description={ad.description}
													image={ad.urlImageClinic}
													idClinic={ad.idClinic}
													title={ad.title}
													nameClinic={ad.nameClinic}
												/>
											)
										})
									) : (
										<p
											className="w-full text-center text-zinc-400 font-lato text-sm"
										>
											Não há nenhum anúncio
										</p>
									)
							}
						</section>

					</section>
				</main>
			</section>
		</main>
	);
}
