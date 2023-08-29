import Post from "../../components/CardsMarketing";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { PaperPlaneTilt, Camera } from "@phosphor-icons/react";
import { useState } from "react";
import "../../style/marketing.css";
import InputFile from "../../components/inputFile/inputFile";

export default function Marketing() {
	const [valueTextArea, setValueTextArea] = useState("");
	const [valueInput, setValueInput] = useState("");

	const [selectedOption, setSelectedOption] = useState("");
	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	

	return (
		<main className="flex min-h-screen">
			<NavbarClinic page={0} />

			<section className="flex-1">
				<Header />

				<main className="pl-14 py-9">
					<h1 className="text-[32px] font-bold py-3">Criar novo anúncio</h1>
					<div className="border border-primary rounded-lg flex flex-wrap bg-white w-[69rem] h-[25.188rem]">
						<div className="mt-6 ml-6 mr-6 flex flex-col">
							<p className="text-[18px]">Título</p>
							<div className="w-full relative">
								<input
									className="bg-gray-white border focus:border-primary rounded w-[27.5rem] h-[2rem] p-2"
									onInput={(e) => {
										const count = e.target.value.length;
										count <= 64 && setValueInput(e.target.value);
									}}
									value={valueInput}
									type="text"
								/>
								<span className="absolute right-2 bottom-1 font-lato text-zinc-400">
									{valueInput.length}/64
								</span>
							</div>

							<p className="text-[18px] py-4">Descrição</p>
							<div className="w-full relative">
								<textarea
									name=""
									id=""
									cols="30"
									rows="6"
									className="bg-gray-white border focus:border-primary focus-visible:outline-none rounded resize-none w-[27.5rem] h-[10.375rem] p-2"
									onInput={(e) => {
										const count = e.target.value.length;
										count <= 300 && setValueTextArea(e.target.value);
									}}
									value={valueTextArea}
								></textarea>
								<span className="absolute right-2 bottom-2 font-lato text-zinc-400">
									{valueTextArea.length}/300
								</span>
							</div>
						</div>

						<div className="flex gap-8 mt-6 ml-6 mr-6">
							<div className="flex flex-col gap-3">
								<p className="text-[18px]">Tipo do anúncio</p>

								<div className="flex items-center gap-2">
									<input
										className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
										type="radio"
										name="options"
										value="option1"
										id="option1"
										checked={selectedOption === "option1"}
										onChange={handleOptionChange}
									/>
									<label className="text-xs cursor-pointer" htmlFor="option1">
										Campanha de vacinação
									</label>
								</div>

								<div className="flex items-center gap-2">
									<input
										className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
										type="radio"
										name="options"
										value="option2"
										id="option2"
										checked={selectedOption === "option2"}
										onChange={handleOptionChange}
									/>
									<label className="text-xs cursor-pointer" htmlFor="option2">
										Campanha de castração
									</label>
								</div>

								<div className="flex items-center gap-2">
									<input
										className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
										type="radio"
										name="options"
										value="option3"
										id="option3"
										checked={selectedOption === "option3"}
										onChange={handleOptionChange}
									/>
									<label className="text-xs cursor-pointer" htmlFor="option3">
										Doação
									</label>
								</div>

								<div className="flex items-center gap-2">
									<input
										className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
										type="radio"
										name="options"
										value="option4"
										id="option4"
										checked={selectedOption === "option4"}
										onChange={handleOptionChange}
									/>
									<label className="text-xs cursor-pointer" htmlFor="option4">
										Promoção
									</label>
								</div>

								<div className="flex items-center gap-2">
									<input
										className="w-4 h-[0.85rem] accent-green-600 cursor-pointer"
										type="radio"
										name="options"
										value="option5"
										id="option5"
										checked={selectedOption === "option5"}
										onChange={handleOptionChange}
									/>
									<label className="text-xs cursor-pointer" htmlFor="option5">
										Outro
									</label>
									<input
										className="bg-gray-white border-b-2 border-primary pl-1"
										type="text"
										disabled={selectedOption !== "option5"}
									/>
								</div>

								<div className="flex flex-col gap-4">
									<p className="text-[18px]">Período do anúncio</p>
									<div className="flex items-center gap-2">
										<select
											className="bg-gray-white border border-primary focus:border-primary focus:outline-primary rounded-lg w-[3.5rem] h-[3rem] text-center text-[18px]"
											name="days"
											id="days"
										>
											{/* <option value="" disabled selected defaultValue=""></option> */}
											<option value="">5</option>
											<option value="">10</option>
											<option value="">15</option>
											<option value="">20</option>
											<option value="">25</option>
											<option value="">30</option>
										</select>
										<p className="text-[18px]">Dias</p>
									</div>
								</div>
							</div>

							<InputFile/>
						</div>
					</div>

					<h1 className="text-[32px] font-bold py-10">Últimos anúncios</h1>
					<div className="flex flex-col gap-12">
						<Post />
						<Post />
					</div>
				</main>
			</section>
		</main>
	);
}