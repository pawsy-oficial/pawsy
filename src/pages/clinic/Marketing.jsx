import PostAd from "../../components/cardsAndBoxes/cardMarketing";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { useEffect, useState } from "react";
import InputFile from "../../components/inputFile/inputFile";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Cookies from "js-cookie";

const schema = Yup.object({
	title: Yup.string().required("Campo obrigatório").max(64, "Limite atingido").min(5, "Deve ter no mínimo 5 caracteres"),
	limitTime: Yup.string().required("Opções obrigatórias").oneOf(['5', '10', '15', '20', '25', '30'], "As opções devem ser entre 5 e 30 dias"),
	description: Yup.string().required("Campo obrigatório").max(300, "Limite atingido").min(5, "Deve ter no mínimo 5 caracteres"),
	idAD: Yup.string().required("Opções obrigatórias"),
	urlImage: Yup.mixed().required("Campo obrigatório").test(
		"fileSize",
		"O arquivo é muito grande",
		value => !value || (value && value.size <= 5242879))
		.test(
			"fileType",
			"Tipo de arquivo não suportado",
			value => !value || (value && ["image/png", "image/jpeg"].includes(value.type))
		)
})

export default function Marketing() {
	const [valueTextArea, setValueTextArea] = useState("");
	const [valueInput, setValueInput] = useState("");
	const [optionsTypeAds, setOptionsTypeAds] = useState([])
	const [idClinic, setIdClinic] = useState(null)
	const [ads, setAds] = useState([])
	const [loading, setLoading] = useState(false)

	/* Image section */

	const [selectImage, setSelectImage] = useState(null)
	const [urlImage, setUrlImage] = useState(null)

	useEffect(() => {
		if (selectImage) {
			if (selectImage.size > 5242880 || selectImage.type != "image/png" && selectImage.type != "image/jpg" && selectImage.type != "image/jpeg") {
				console.log("A imagem não atende os requisitos ");
			}
			else {
				setUrlImage(URL.createObjectURL(selectImage))
			}
		}
	}, [selectImage])

	/* end Image section */

	/* section forms */

	const { handleSubmit, register, control, formState, reset } = useForm({
		mode: "onSubmit",
		resolver: yupResolver(schema)
	})

	const { errors } = formState

	const onSubmit = (data) => {
		setLoading(true)

		const token = Cookies.get("jwtTokenClinic")
		const time = new Date().getTime()
		const urlImageProfile = `${time}_pawsy_${selectImage.name}`
		data.urlImage = urlImageProfile
		data["idClinic"] = idClinic

		axios.post(`${import.meta.env.VITE_URL}/ads`, data, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				let form = new FormData();
				form.append("name", urlImageProfile);
				form.append('file', selectImage, selectImage.name);

				axios.post(`${import.meta.env.VITE_URL}/upload-files`, form, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
					.then(() => {
						console.log(res.data.message)
						reset()
						setLoading(false)
					})
					.catch(err => console.log(err))
			})
			.catch(err => console.error(err))
	}

	useEffect(() => {
		const token = Cookies.get("jwtTokenClinic")
		axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				setIdClinic(res.data.storedIdClinica)

				axios.get(`${import.meta.env.VITE_URL}/getAllAds/${res.data.storedIdClinica}`)
					.then(e => {
						// console.log(e.data.Ads);
						setAds(e.data.Ads)
					})
					.catch(err => console.log(err))
			})
			.catch(err => console.error(err))

		axios.get(`${import.meta.env.VITE_URL}/getAllTypeAds`)
			.then(e => setOptionsTypeAds(e.data.types))
			.catch(err => console.error(err))

	}, [loading])

	/* end section forms */

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
										{
											errors.title &&
											<span
												className="text-red-error text-sm "
											>
												{errors.title.message}*
											</span>
										}
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
										{
											errors.description &&
											<span
												className="text-red-error text-sm "
											>
												{errors.description.message}*
											</span>
										}
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
											errors.idAD &&
											<span
												className="text-red-error text-sm "
											>
												{errors.idAD.message}*
											</span>
										}
										{
											optionsTypeAds.map(optionsType => {
												return (
													<label className="flex items-center gap-2">
														<input
															className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
															type="radio"
															value={optionsType.id_anuncio}
															{...register("idAD")}
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
												{...register("limitTime")}
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
										{
											errors.limitTime &&
											<span
												className="text-red-error text-sm "
											>
												{errors.limitTime.message}*
											</span>
										}
									</div>
								</section>
								<section
									className="flex flex-col justify-center"
								>
									<InputFile
										Controller={Controller}
										control={control}
										setSelectImage={setSelectImage}
										urlImage={urlImage}
									/>
									{
										errors.image &&
										<span
											className="text-red-error text-sm "
										>
											{errors.image.message}*
										</span>
									}
								</section>
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
							{
								ads.length === 0 
								? <p className="text-zinc-500 text-base text-center block w-full">Não há anúncios criados</p>
								: (
									ads.map(ad => {
										return (
											<PostAd
												title={ad.title}
												description={ad.description}
												image={ad.urlImage}
												limiteDate={ad.tmp_final}
												typeAd={ad.typeAd}
												limit={5}
												idPost={ad.idPost}
												loading={setLoading}
											/>
										)
									})
								)
							}
						</div>
					</section>
				</main>
			</section>
		</main>
	);
}