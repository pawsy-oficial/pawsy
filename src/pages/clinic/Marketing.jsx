import Post from "../../components/cardsAndBoxes/cardMarketing";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { useEffect, useState } from "react";
import InputFile from "../../components/inputFile/inputFile";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

export default function Marketing() {
	const [valueTextArea, setValueTextArea] = useState("");
	const [valueInput, setValueInput] = useState("");
	const [optionsTypeAds, setOptionsTypeAds] = useState([])

	/* Image section */

	const [selectImage, setSelectImage] = useState(null)
    const [urlImage, setUrlImage] = useState(null)

	useEffect(() => {
        if (selectImage) {
            console.log(selectImage);
            if (selectImage.size > 5242880 || selectImage.type != "image/png" && selectImage.type != "image/jpg" && selectImage.type != "image/jpeg") {
                console.log("A imagem não atende os requisitos ");
            }
            else {
                setUrlImage(URL.createObjectURL(selectImage))
            }
        }
    }, [selectImage])

	/* end Image section */


	const { handleSubmit, register, control } = useForm({
		mode: "onSubmit"
	})

	const onSubmit = (data) => {
		const time = new Date().getTime()
        const urlImageProfile = `${time}_pawsy_${selectImage.name}`
		data.image = urlImageProfile
		

		
	}

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_URL}/getAllTypeAds`)
			.then(e => setOptionsTypeAds(e.data.types))
			.catch(err => console.error(err))
	}, [])

	return (
		<main className="flex min-h-screen">
			<NavbarClinic page={0} />

			<section className="flex-1">
				<Header userType={"clinica"} />

				<main className="pl-14 py-9 max-w-6xl flex flex-col gap-8">
					<section
						className="flex flex-col gap-4"
					>
						<h2
							className="text-[2rem] font-bold"
						>
							Criar novo anúncio
						</h2>

						<form
							onSubmit={handleSubmit(onSubmit)}
							className="border border-primary rounded-lg flex flex-col gap-2 p-4 bg-white w-full"
						>
							<div
								className="flex gap-4 justify-between"
							>
								<section
									className="flex flex-col gap-6 w-[28rem]"
								>
									<label
										className="text-lg flex flex-col gap-2"
									>
										<span>Título</span>
										<div className="w-full relative">
											<input
												className="bg-gray-white border focus:border-primary rounded w-full py-1 px-2"
												onInput={(e) => {
													const count = e.target.value.length;
													count <= 64 && setValueInput(e.target.value);
												}}
												value={valueInput}
												type="text"
												{...register("title")}
											/>
											<span className="absolute right-2 bottom-1 font-lato text-zinc-400">
												{valueInput.length}/64
											</span>
										</div>
									</label>

									<label
										className="text-lg flex flex-col gap-2"
									>
										<span>
											Descrição
										</span>
										<div className="w-full relative">
											<textarea
												className="bg-gray-white border focus:border-primary focus-visible:outline-none rounded resize-none w-full h-[10.375rem] p-2"
												onInput={(e) => {
													const count = e.target.value.length;
													count <= 300 && setValueTextArea(e.target.value);
												}}
												value={valueTextArea}
												{...register("description")}
											/>
											<span className="absolute right-2 bottom-2 font-lato text-zinc-400">
												{valueTextArea.length}/300
											</span>
										</div>
									</label>
								</section>

								<section className="flex flex-col gap-6">
									<div className="flex flex-col gap-2">
										<h3
											className="text-lg"
										>
											Tipo do anúncio
										</h3>
										{
											optionsTypeAds.map(optionsType => {
												return(
													<label className="flex items-center gap-2">
														<input
															className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
															type="radio"
															value={optionsType.id_anuncio}
															{...register("typeAd")}
														/>
														<span className="text-xs cursor-pointer">
															{optionsType.nm_anuncio}
														</span>
													</label>
												)
											})
										}
									</div>

									<div className="flex flex-col gap-2">
										<h3 className="text-lg">Período do anúncio</h3>
										<div className="flex items-center gap-2">
											<select
												className="bg-gray-white font-bold border border-primary focus:border-primary focus:outline-primary rounded-lg w-[3.5rem] h-[3rem] text-center text-lg"
												name="days"
												id="days"
												{...register("dateLimit")}
											>
												{/* <option value="" disabled selected defaultValue=""></option> */}
												<option value="5">5</option>
												<option value="10">10</option>
												<option value="15">15</option>
												<option value="20">20</option>
												<option value="25">25</option>
												<option value="30">30</option>
											</select>
											<span className="text-lg">Dias</span>
										</div>
									</div>
								</section>

								<InputFile 
									Controller={Controller} 
									control={control}
									setSelectImage={setSelectImage}
									urlImage={urlImage}
								/>
							</div>
							<div
								className="flex justify-end w-full"
							>
								<button
									className="bg-[#22b77e] hover:bg-[#22b77e]/80 py-1 px-4 rounded-lg text-white flex flex-row items-center justify-center gap-3"
									type="submit"
								>
									Publicar <PaperPlaneTilt />
								</button>
							</div>
						</form>
					</section>

					<section
						className="flex flex-col gap-4"
					>
						<h2
							className="text-[2rem] font-bold"
						>
							Últimos anúncios
						</h2>
						<div className="flex flex-col gap-12">
							<Post />
							<Post />
						</div>
					</section>
				</main>
			</section>
		</main>
	);
}