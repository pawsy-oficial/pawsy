import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";
import * as Select from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { WarningVaccine } from "../../components/tutor/Alert";
import { memoCardClinic as CardClinic } from "../../components/vaccine/Cards";
import { CaretDown } from "@phosphor-icons/react";

export default function VaccinePage() {
	const pets = ["Caramelo", "Oreo", "Flor", "Pantera"];
	const [namePet, setNamePet] = useState("");
	const positioPet = pets.indexOf(namePet) == -1 ? 0 : pets.indexOf(namePet);

	/*
	const vaccineName = ["Antirrábica","Viratec 10 CVL", "V8"]; //Viratec 10 CVL é obrigatória
	const dateVaccine = ["24/03/2020","24/03/2021","24/03/2022","24/03/2023", "30/05/2023"];
	const returnVaccine = ["24/03/2021", "24/03/2022", "24/03/2023", "24/03/2024", "30/05/2024"];
	const CRMV = ["000-00", "111-11"];
	const vetAplication = ["Vanessa Santos - "]
	*/

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

	const [alterTable, setAlterTable] = useState(true)

	return (
		<main className="flex min-h-screen">
			<NavbarTutor />
			<section className="flex-1">
				<Header userType="tutor" />
				<main className="px-8 lg:pl-10 lg:pr-16 py-8 flex flex-col gap-5 w-screen md:w-[calc(100vw-256px-24px)] mx-auto">
					<div className="flex gap-6 items-center">
						<Select.Root value={namePet} onValueChange={setNamePet}>
							<Select.Trigger
								className="lg:min-w-[220px] w-80 flex items-center justify-between rounded px-6 py-2 text-2xl font-semibold leading-none h-8 gap-1 bg-white focus:outline-none"
								aria-label="pet"
							>
								<Select.Value className="font-sora" aria-label={namePet}>
									{namePet}
								</Select.Value>
								<CaretDown weight="fill" />
							</Select.Trigger>
							<Select.Portal>
								<Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
									<Select.Viewport className="px-3 py-8">
										<Select.Group>
											<Select.Label className="text-xs text-gray-500 mb-6">
												Meus pets
											</Select.Label>
											{pets.map((name, index) => {
												return (
													<Select.Item
														value={`${name}`}
														className="text-gray-800 cursor-pointer hover:outline-none hover:text-gray-950 text-xl"
													>
														<Select.ItemText>{name}</Select.ItemText>
													</Select.Item>
												);
											})}
										</Select.Group>
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>

						{positioPet == 1 && <WarningVaccine nameVaccine={"Viratec 10"} />}
					</div>

					<section className="flex flex-1 bg-white px-6 py-8 rounded-2xl">
						<div className="w-full flex justify-between gap-10">
							<div className="md:flex-1 w-full">
								<h3 className="font-semibold text-2xl mb-3 text-center font-lato hidden md:block">Vacinas</h3>

								{
									windowScreen.width < 1024
									&& (
										<section className="w-full flex flex-col items-center">
											<div className="w-full flex justify-between gap-6 mb-4">
												<input type="radio" className="hidden" name="typeTable" id="vacina" defaultChecked/>
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
														<table className="w-full cursor-default">
															<thead>
																<tr className=" border-b border-black">
																	<th className=" bg-primary text-white text-sm w-40 p-2">
																		Vacina
																	</th>
																	<th className=" p-2 bg-primary text-white text-sm w-40">
																		Data de aplicação
																	</th>
																	<th className=" p-2 bg-primary text-white text-sm w-40">
																		Retorno
																	</th>
																	<th className=" p-2 bg-primary text-white text-sm w-40">
																		Veterinário
																	</th>
																	<th className="hidden p-2 bg-primary text-white text-sm w-40">
																		CRMV
																	</th>
																</tr>
															</thead>
															<tbody className="second">
																{
																	table[positioPet].map((e, index) => {
																		return (
																			<tr key={index} className="border-b border-black">
																				{
																					e.map((f) => {

																						return (
																							<>
																								<td>{f.vaccineName}</td>
																								<td>{f.dateVaccine}</td>
																								<td>{f.returnVaccine}</td>
																								<td>{f.vetAplication}</td>
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
																						<td>{f.dateVermifugo}</td>
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

								<table className="w-full cursor-default hidden lg:block">
									<thead>
										<tr className=" border-b border-black">
											<th className=" bg-primary text-white text-sm w-40 p-2">
												Vacina
											</th>
											<th className=" p-2 bg-primary text-white text-sm w-40">
												Data de aplicação
											</th>
											<th className=" p-2 bg-primary text-white text-sm w-40">
												Retorno
											</th>
											<th className=" p-2 bg-primary text-white text-sm w-40">
												Veterinário
											</th>
											<th className=" p-2 bg-primary text-white text-sm w-40">
												CRMV
											</th>
										</tr>
									</thead>
									<tbody className="second">
										{
											table[positioPet].map((e, index) => {
												return (
													<tr key={index} className="border-b border-black">
														{
															e.map((f) => {

																return (
																	<>
																		<td>{f.vaccineName}</td>
																		<td>{f.dateVaccine}</td>
																		<td>{f.returnVaccine}</td>
																		<td>{f.vetAplication}</td>
																		<td>{f.CRMV}</td>
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
																<td>{f.dateVermifugo}</td>
																<td>{f.nameVermifugo}</td>
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

							<CardClinic />
							<CardClinic />
							<CardClinic />
							<CardClinic />
							<CardClinic />

						</section>

					</section>
				</main>
			</section>
		</main>
	);
}
