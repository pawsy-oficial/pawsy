import { HeaderLandingPage } from "../components/header/Header"
import BoxPets from "../components/cardsAndBoxes/boxPets"

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeaderLandingPage />

			<section
				className="min-h-[800px] bg-[#E0FAFF] flex items-center relative overflow-hidden"
			>
				<section
					className="max-w-5xl w-full mx-auto z-10"
				>
					<div 
						className="max-w-2xl flex flex-col gap-6"
					>
						<h2
							className="font-baloo2 font-semibold text-6xl"
							>
							Gerencie a saúde do seu pet com a <span className="">pawsy</span>
						</h2>
						<sub
							className="text-base font-lato"
						>
							Cuide do seu pet com carinho. Encontre clínicas próximas e agende consultas online agora mesmo!
						</sub>
					</div>
					<div 
						className="w-full flex gap-16 mt-10"
					>
						<button
							className="bg-primary text-white font-baloo2 font-semibold text-base px-6 py-2 rounded-lg"
						>
							Cadastre-se
						</button>
					</div>
				</section>
				<BoxPets/>
				<div
					className="bg-mockup w-[800px] h-[600px] left-full  -translate-x-3/4 bg-cover bg-no-repeat absolute"
				/>
			</section>
		</main>
	)
}
