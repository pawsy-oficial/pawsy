import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";

import { useEffect, useState } from "react";
import { WarningVaccine } from "../../components/tutor/Alert";

import { CardClinic } from "../../components/cardsAndBoxes/cardClinic";

import dayjs from 'dayjs'
import useCheckedPet from "../../hook/useCheckedPet";
import { SelectPetsVaccine } from "../../components/inputsComponents/selects";
import Cookies from "js-cookie";
import axios from "axios";

export default function VaccinePage() {
	const pets = ["Caramelo", "Oreo", "Flor", "Pantera"];
	const [namePet, setNamePet] = useState("");
	const [alterTable, setAlterTable] = useState(true)
	const [myPets, setMyPets] = useState([])

    const tokenTutor = Cookies.get('jwtTokenTutor')
	const positioPet = pets.indexOf(namePet) == -1 ? 0 : pets.indexOf(namePet);

	useCheckedPet()

	//Lista Vacinas
	const table = [
		[
			//Caramelo (pets[0])
			[
				{
					vaccineName: "Antirrábica",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Antirrábica",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Antirrábica",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Antirrábica",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2021-03-24",
					returnVaccine: "2022-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2022-03-24",
					returnVaccine: "2023-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
		],
		[
			//Oreo (pets[1])
			[
				{
					vaccineName: "V8",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Antirrábica",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
		],
		[
			//Flor (pets[2])
			[
				{
					vaccineName: "Antirrábica",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2021-03-24",
					returnVaccine: "2022-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2022-03-24",
					returnVaccine: "2023-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
		],
		[
			//Pantera (pets[3])
			[
				{
					vaccineName: "Antirrábica",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2020-03-24",
					returnVaccine: "2021-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2021-03-24",
					returnVaccine: "2022-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
			[
				{
					vaccineName: "Viratec 10 CVL",
					dateVaccine: "2022-03-24",
					returnVaccine: "2023-03-24",
					CRMV: "000-00",
					vetAplication: "Vanessa Santos",
				},
			],
		],
	];

	//Lista Vermes

	const tableVermifugo = [
		[
			//caramelo
			[
				{
					dateVermifugo: "2020-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2021-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2022-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2023-02-12",
					nameVermifugo: "Vermikill",
				},
			],
		],
		[
			//Oreo
			[
				{
					dateVermifugo: "2020-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2021-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2021-02-12",
					nameVermifugo: "Vermikill",
				},
			],
		],
		[
			//Flor
			[
				{
					dateVermifugo: "2020-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2021-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2022-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2023-02-12",
					nameVermifugo: "Vermikill",
				},
			],
		],
		[
			//Pantera
			[
				{
					dateVermifugo: "2020-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2021-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2022-02-12",
					nameVermifugo: "Vermikill",
				},
			],
			[
				{
					dateVermifugo: "2023-02-12",
					nameVermifugo: "Vermikill",
				},
			],
		],
	];

	const [windowScreen, setWindowScreen] = useState({ width: null })

	useEffect(() => {
		function handleResize() {
			setWindowScreen({ width: window.innerWidth })
		}
		window.addEventListener("resize", handleResize)
		handleResize()

		return () => window.removeEventListener("resize", handleResize)
	}, [])
	
	const [adsPosts, setAdsPosts] = useState([])
	
	useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
            headers: {
                Authorization: `Bearer ${tokenTutor}`
            }
        }).then(res => {
            axios.get(`${import.meta.env.VITE_URL}/get-all-pets/${res.data.storedIdTutor}`, {
                headers: {
                    Authorization: `Bearer ${tokenTutor}`
                }
            })
                .then(res => {
                    setMyPets(res.data.myPets);
                    setNamePet(res.data.myPets[0].nm_pet)
                })
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))
    }, [])

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_URL}/getAllAds/all?filter=preview`)
			.then(e => setAdsPosts(e.data.adsPreview))
			.catch(err => console.log(err))
	}, [])

	return (
		<main className="flex min-h-screen">
			<NavbarTutor />
			<section className="flex-1">
				<Header userType="tutor" />
				<main className="px-8 lg:pl-10 lg:pr-16 py-8 flex flex-col gap-5 w-screen md:w-[calc(100vw-256px-24px)] mx-auto">
					<div className="flex gap-6 items-center">
						<SelectPetsVaccine pets={myPets} setNamePet={setNamePet} name={namePet}/>

						{positioPet == 1 && <WarningVaccine nameVaccine={"Viratec 10"} />}
					</div>

					<section className="flex flex-1 bg-white px-6 py-8 rounded-2xl">
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
																	table[positioPet].map((e, index) => {
																		return (
																			<tr key={index} className="border-none">
																				{
																					e.map((f) => {

																						return (
																							<>
																								<td className="border-none rounded-l-full">{f.vaccineName}</td>
																								<td className="border-none">{dayjs(f.dateVaccine).format('DD/MM/YYYY')}</td>
																								<td className="border-none">{f.returnVaccine}</td>
																								<td className="border-none rounded-r-full">{f.vetAplication}</td>
																								<td className="hidden">{f.CRMV}</td>
																							</>
																						);
																					})
																				}
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
																<tr className=" border-b border-black">
																	<th className=" bg-primary text-white text-sm w-40 p-2">
																		Data
																	</th>
																	<th className=" bg-primary text-white text-sm w-40 p-2">
																		Nome
																	</th>
																</tr>
															</thead>
															<tbody className="second">
																{tableVermifugo[positioPet].map((e) => {
																	return (
																		<tr className="border-b border-black">
																			{e.map((f) => {

																				return (
																					<>
																						<td>{dayjs(f.dateVermifugo).format('DD/MM/YYYY')}</td>
																						<td>{f.nameVermifugo}</td>
																					</>
																				);
																			})}
																		</tr>
																	);
																})}
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
											table[positioPet].map((e, index) => {
												return (
													<tr key={index} className="border-none">
														{
															e.map((f) => {

																return (
																	<>
																		<td className="border-none rounded-l-full">{f.vaccineName}</td>
																		<td className="border-none">{dayjs(f.dateVaccine).format('DD/MM/YYYY')}</td>
																		<td className="border-none">{dayjs(f.returnVaccine).format('DD/MM/YYYY')}</td>
																		<td className="border-none">{f.vetAplication}</td>
																		<td className="border-none rounded-r-full">{f.CRMV}</td>
																	</>
																);
															})
														}
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
										{tableVermifugo[positioPet].map((e) => {
											return (
												<tr className="">
													{e.map((f) => {

														return (
															<>
																<td className="border-none rounded-l-full">{dayjs(f.dateVermifugo).format("DD/MM/YYYY")}</td>
																<td className="border-none rounded-r-full">{f.nameVermifugo}</td>
															</>
														);
													})}
												</tr>
											);
										})}
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
										return(
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
