import dayjs from "dayjs";
import ModalDeletePost from "../componentsClinic/modalDeletePost";
import { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Camera, Trash } from "@phosphor-icons/react";
import axios from "axios";
import Cookies from "js-cookie";

function PostAd({ title, description, limiteDate, limit, typeAd, image, idPost, loading, typeAds, isOwner }) {
	const [open, setOpen] = useState(false);
	const [editPost, setEditPost] = useState(false)

	return (
		<section
			className={`w-full bg-white rounded-lg gap-6 flex ${isOwner ? "p-6" : "py-1"}`}
		>
			{
				editPost && isOwner
					? <FormEditPost
						description={description}
						idPost={idPost}
						image={image}
						limit={limit}
						limiteDate={limiteDate}
						loading={loading}
						title={title}
						typeAd={typeAd}
						editPost={editPost}
						setEditPost={setEditPost}
						typeAds={typeAds}
					/>
					: <InfoPost
						description={description}
						idPost={idPost}
						image={image}
						limit={limit}
						title={title}
						typeAd={typeAd}
						editPost={editPost}
						setEditPost={setEditPost}
						limiteDate={limiteDate}
						setOpen={setOpen}
						open={open}
						loading={loading}
						isOwner={isOwner}
					/>
			}
		</section>
	);
}


function InfoPost({ title, description, limiteDate, limit, typeAd, image, idPost, loading, setOpen, open, setEditPost, editPost, isOwner }) {
	return (
		<>
			<div 
				className={`${isOwner ? "min-w-[15rem] max-w-[15rem] h-60" : "min-w-[7rem] max-w-[7rem] h-28"} overflow-hidden rounded-lg border-2 border-secundary`}
			>
				<img
					src={`${import.meta.env.VITE_URL}/files/${image}`}
					alt={title}
					className="w-full h-full object-cover"
					draggable={false}
				/>
			</div>

			<div className="w-full flex flex-col gap-2 justify-between">
				<div className="flex flex-col gap-2">
					<h3 className="text-2xl font-bold capitalize">
						{title}
					</h3>
					<p className="text-sm">
						{description}
					</p>
					<p>
						{typeAd}
					</p>
					<div
						className="flex flex-col gap-1"
					>
						<p>
							{limit} dias
						</p>
						<small
							className="text-zinc-500"
						>
							{dayjs(limiteDate).format("DD/MM/YYYY")}
						</small>
					</div>
				</div>
				{
					isOwner && (
						<div className="flex justify-end gap-6">
							<button
								title="Deletar Post"
								onClick={() => setOpen(!open)}
								type="submit"
								className="flex gap-2 items-center"
							>
								<span>
									<Trash 
										size={20} 
										className="hover:fill-red-error transition-colors duration-500"
									/>
								</span>
							</button>

							<button
								title="Editar Post"
								onClick={() => setEditPost(!editPost)}
								type="submit"
								className="bg-[#1F9EAB] hover:bg-[#2797a3] w-[6.813rem] h-[2.188rem] rounded-lg text-white"
							>
								Editar
							</button>
						</div>
					)
				}
			</div>
			<ModalDeletePost
				isOpen={open}
				setOpen={setOpen}
				idPost={idPost}
				loading={loading}
			/>
		</>
	)
}

function FormEditPost({ title, description, limit, typeAd, image, idPost, setEditPost, editPost, typeAds, loading }) {
	const token = Cookies.get("jwtTokenClinic")
	const [valueTitle, setValueTitle] = useState(`${title}`)
	const [valueDescription, setValueDescription] = useState(`${description}`)
	const [optionSelectedLimit, setOptionSelectedLimit] = useState(`${limit}`)
	const [selectImage, setSelectImage] = useState(null)
	const [urlImage, setUrlImage] = useState(null)

	const { handleSubmit, register, control } = useForm({
		mode: "onSubmit"
	})

	const onChange = (data) => {
		const currentTime = new Date().getTime()
		let nameFile
		(selectImage) ? nameFile = `${currentTime}_pawsy_${selectImage.name}` : nameFile = image

		data["idPost"] = idPost
		data.urlImage = nameFile
		console.log(data);

		axios.put(`${import.meta.env.VITE_URL}/ads`, data, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				loading(true)
				console.log(res);
				selectImage
					? uploadImage(nameFile, selectImage)
					: (
						loading(false),
						setEditPost(false)
					)
			})
			.catch(err => console.log(err))
	}


	// section image

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

	function uploadImage(nameFile, selectImage) {
		let form = new FormData();
		form.append("name", nameFile)
		form.append('file', selectImage, selectImage.name)
		axios.post(`${import.meta.env.VITE_URL}/upload-files`, form, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(() => {
				loading(false)
				setEditPost(false)
			}).catch(err => {
				console.error(err)
			})
	}
	// end section image

	return (
		<form
			className="flex gap-8 w-full"
			onSubmit={handleSubmit(onChange)}
		>
			<div className="min-w-[15rem] max-w-[15rem] h-60 overflow-hidden rounded-lg border-2 border-secundary">
				<label
					className={`w-full h-full relative sm:w-40 group sm:h-40 overflow-hidden bg-primary/20 cursor-pointer`}
				>
					<img
						src={urlImage ? urlImage : `${import.meta.env.VITE_URL}/files/${image}`}
						alt={title}
						className="h-full w-full object-cover group-hover:brightness-50 transition-all"
						draggable={false}
					/>
					<Controller
						name="urlImage"
						control={control}
						render={({ field }) => (
							<input
								type="file"
								multiple={false}
								className="hidden"
								onChange={event => {
									field.onChange(event.target.files[0]);
									setSelectImage(event.target.files[0]);
								}}
								accept="image/png, image/jpg, image/jpeg"
							/>
						)}
					/>
					<Camera
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-all"
						color="#ffffff"
						size={32}
					/>
				</label>
			</div>

			<div className="w-full flex flex-col gap-2 justify-between">
				<div className="flex flex-col gap-2">
					<div
						className="flex gap-2 justify-between items-center"
					>
						<input
							type="text"
							value={valueTitle}
							{...register("title", {
								onChange: e => {
									const count = e.target.value.length;
									count <= 64 && setValueTitle(e.target.value);
								}
							})}
							placeholder="Título da postagem"
							className="text-2xl font-bold capitalize w-[calc(100%-64px)] border-b-2 border-transparent transition-colors duration-300 focus:border-primary"
						/>
						<span
							className="text-zinc-500 text-sm font-lato"
						>
							{valueTitle.length}/64
						</span>
					</div>
					<div
						className="flex gap-2 justify-between items-center"
					>
						<textarea
							type="text"
							value={valueDescription}
							{...register("description", {
								onChange: e => {
									const count = e.target.value.length;
									count <= 300 && setValueDescription(e.target.value);
								}
							})}
							placeholder="Descrição da postagem"
							className="text-sm w-[calc(100%-64px)] resize-none border-b-2 border-transparent transition-colors duration-300 focus:border-primary focus-within:outline-none"
						/>
						<span
							className="text-zinc-500 text-sm font-lato"
						>
							{valueDescription.length}/300
						</span>
					</div>
					<div
						className="flex gap-2 justify-between items-center"
					>
						{
							typeAds.map(ad => {
								return (
									<label className="flex items-center gap-2">
										<input
											className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
											type="radio"
											value={ad.id_anuncio}
											{...register("idTypeAD")}
											defaultChecked={ad.nm_anuncio == typeAd}
										/>
										<span className="text-xs cursor-pointer">
											{ad.nm_anuncio}
										</span>
									</label>
								)
							})
						}
					</div>

					<div
						className="flex flex-col gap-1"
					>
						<div className="flex items-center gap-2">
							<select
								className="bg-gray-white font-bold border border-primary focus:border-primary focus:outline-primary rounded-lg w-[3.5rem] h-[3rem] text-center text-lg"
								name="days"
								id="days"
								{...register("limitTime", {
									onChange: e => {
										setOptionSelectedLimit(e.target.value)
									}
								})}
							>
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="25">25</option>
								<option value="30">30</option>
							</select>
							<span className="text-lg">Dias</span>
						</div>
						<small
							className="text-zinc-500"
						>
							{
								dayjs().add(optionSelectedLimit, "day").format("DD/MM/YYYY")
							}
						</small>
					</div>
				</div>
				<div className="flex justify-end gap-6">
					<button
						title="Cancelar a edição do Post"
						onClick={() => setEditPost(!editPost)}
						type="submit"
						className="bg-red-error hover:bg-[#c23f4c] w-[7.438rem] h-[2.188rem] rounded-lg text-white font-bold"
					>
						Cancelar
					</button>

					<button
						title="Aceitar a edição do Post"
						type="submit"
						className="bg-primary hover:bg-[#38ab7b] w-[6.813rem] h-[2.188rem] rounded-lg text-white font-bold"
					>
						Confirmar
					</button>
				</div>
			</div>
		</form>
	)
}

export default memo(PostAd)