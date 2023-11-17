import { HeaderLandingPage } from "../components/header/Header"
import BoxPets from "../components/cardsAndBoxes/boxPets"
import { useNavigate } from "react-router-dom"
import { CheckCircle, PlusCircle } from "@phosphor-icons/react"
import { BoxFeatures, BoxFetureSections } from "../components/cardsAndBoxes/boxFeatures"

import calendar from "../img/calendar.svg"
import fileMedical from "../img/file-medical.svg"
import health from "../img/health.svg"
import route from "../img/route.svg"
import team from "../img/team.svg"
import vaccine from "../img/vaccine.svg"
import Footer from "../components/footer"
import GoToTop from "../components/buttons/GoTop"
import ButtonSelect from "../components/buttons/ButtonSelect"

import pawImage1 from "../img/paw_img.png"
import pawImage2 from "../img/paw_img_2.png"
import elementSpace from "../img/element_space.svg"
import useTopToScreen from "../hook/useTopToScreen"


const infoFeatures = [
	{
		title: "Agendamento Simplificado",
		description: "Marque consultas e exames veterinários em segundos, sem complicações. Mantenha o controle do cronograma de saúde do seu pet.",
		icon: calendar
	},
	{
		title: "Informações de Saúde Instantâneas",
		description: "Acesse a carteira de vacinação, receitas médicas e o status de bem-estar do seu pet a qualquer momento, em um único lugar.",
		icon: health
	},
	{
		title: "Encontre Clínicas Próximas",
		description: "Descubra clínicas veterinárias próximas a você em segundos. Esteja sempre preparado para emergências de saúde do seu pet.",
		icon: route
	},
	{
		title: "Prontuário Médico Detalhado",
		description: "Mantenha um registro completo das consultas, exames e tratamentos do seu pet. Nunca perca informações essenciais.",
		icon: fileMedical
	},
	{
		title: "Conecte-se com Profissionais",
		description: "Facilite a comunicação com seu veterinário. Compartilhe informações relevantes diretamente na plataforma.",
		icon: team
	},
	{
		title: "Nunca Esqueça uma Vacina",
		description: "Receba lembretes personalizados para as vacinas e cuidados do seu pet. Garanta que seu amigão esteja sempre protegido.",
		icon: vaccine
	},
]

const infoFeaturesSectionTutor = [
	"Perfil com todas as informações do pet",
	"Carteira de vacinação e vermífugos",
	"Agendamento de consultas e/ou exames",
	"Veterinários mais próximos"
]
const infoFeaturesSectionClinic = [
	"Controle de agendamento de consultas e/ou exames",
	"Acesso ao prontuário médico dos pets ",
	"Perfil para divulgação da clínica",
	"Criação de alertas de promoções ou campanhas de vacinação"
]

export default function Home() {
	const navigate = useNavigate()
	useTopToScreen()
	return (
		<main className="min-h-screen">
			<HeaderLandingPage />

			<GoToTop />

			<section
				className="min-h-[800px] bg-[#E0FAFF] flex items-center relative overflow-hidden"
			>
				<section
					className="lg:max-w-5xl max-w-2xl w-full mx-auto z-10 px-6 md:p-0"
				>
					<div
						className="max-w-2xl flex flex-col gap-6"
					>
						<h2
							className="font-baloo2 font-semibold text-6xl"
						>
							Gerencie a saúde do seu pet com a <span className="font-baloo2 font-bold">pawsy</span>
						</h2>
						<sub
							className="text-base font-lato"
						>
							Cuide do seu pet com carinho. Encontre clínicas próximas e agende consultas online agora mesmo!
						</sub>
					</div>
					<div
						className="w-full flex  justify-center md:justify-start gap-16 mt-10"
					>
						<button
							className="bg-primary text-white font-baloo2 font-semibold text-base px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-500"
							onClick={() => navigate("/acesso")}
						>
							Cadastre-se
						</button>
						<button
							className="bg-primary text-white font-baloo2 font-semibold text-base px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-500"
							onClick={() => {
								window.scrollTo({
									top: 720,
									behavior: "smooth",
								});
							}}
						>
							Saiba mais
						</button>
					</div>
				</section>
				<BoxPets />
				<div
					className="bg-mockup hidden md:block w-1/2 lg:w-[800px] h-[600px] left-full  -translate-x-3/4 bg-cover bg-no-repeat absolute"
				/>
			</section>

			<main
				className="lg:max-w-4xl xl:max-w-5xl w-full mx-auto mt-16"
			>
				<section
					className="flex flex-col gap-8"
				>
					<article
						className="px-6 lg:max-w-lg flex"
					>
						<div className="flex flex-col gap-8">
							<div
								className="flex flex-col gap-2"
							>
								<span
									className="text-primary font-baloo2 text-base font-semibold"
								>
									Como funciona?
								</span>
								<h2
									className="font-semibold font-sora text-[2rem]"
								>
									Uma plataforma que conecta tutores e clínicas veterinárias em um só lugar
								</h2>
								<p
									className="text-zinc-500 font-lato text-sm leading-relaxed"
								>
									Com a Pawsy, monitorar o bem-estar dos seus pets e de seus clientes se torna uma experiência simples e ágil. Agende consultas, controle a carteira de vacinação, encontre clínicas próximas e ofereça um cuidado completo e dedicado aos pets.
								</p>
							</div>
							<ul
								className="flex flex-col gap-2"
							>
								<li
									className="flex gap-6 items-center"
								>
									<CheckCircle color="#22B77E" size={24} />
									<span>Fácil e intuitivo de usar</span>
								</li>
								<li
									className="flex gap-6 items-center"
								>
									<CheckCircle color="#22B77E" size={24} />
									<span>Interface simples e acessível</span>
								</li>
								<li
									className="flex gap-6 items-center"
								>
									<CheckCircle color="#22B77E" size={24} />
									<span>Interface simples e acessível</span>
								</li>
							</ul>
						</div>
					</article>

					<article
						className="px-6 w-full lg:max-w-none flex flex-col gap-10"
					>
						<div
							className="flex flex-col gap-2 md:items-center"
						>
							<span
								className="text-primary font-baloo2 text-base font-semibold"
							>
								Por que escolher a Pawsy?
							</span>
							<h2
								className="font-semibold font-sora text-[2rem] max-w-sm md:text-center"
							>
								Praticidade e Cuidado em um só lugar!
							</h2>
						</div>
						<div
							className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center"
						>
							{
								infoFeatures.map(info => {
									return (
										<BoxFeatures
											description={info.description}
											icon={info.icon}
											title={info.title}
										/>
									)
								})
							}
						</div>
					</article>

					<article
						className="w-full flex flex-col gap-10 mt-6 px-6"
					>
						<div
							className="flex flex-col gap-2 md:items-center"
						>
							<h2
								className="font-semibold font-sora text-[2rem] max-w-lg md:text-center"
							>
								Quais vantagens a Pawsy oferece para tutores e clínicas?
							</h2>
						</div>

						<div
							className="flex items-center"
						>
							<img 
								src={pawImage1} 
								alt=""
								draggable="false"	
								className="-translate-x-20 md:block hidden"
							/>
							<BoxFetureSections
								title="Clínica veterinária"
								description="Oferecemos uma série de recursos projetados para simplificar o dia a dia das clínicas veterinárias. Descubra como a Pawsy pode ajudar a melhorar a eficiência e o atendimento, permitindo que você se concentre no que mais importa: cuidar dos pets."
								list={infoFeaturesSectionClinic}
							/>
						</div>
						<div
							className="flex items-center"
						>
							<BoxFetureSections
								title="Tutores"
								description="Descubra como os recursos da Pawsy podem facilitar o cuidado e o acompanhamento da saúde dos seus pets. Com funcionalidades intuitivas, ajudamos você a manter seus pets saudáveis e felizes, tudo em um só lugar."
								list={infoFeaturesSectionTutor}
							/>
							<img 
								src={pawImage2} 
								alt=""
								draggable="false"	
								className="lg:translate-x-20 md:block hidden"
							/>
						</div>
					</article>

					<article
						className="w-full flex flex-col gap-3 mt-6 items-center px-6"
					>
						<h2
							className="w-full text-center flex flex-col font-sora text-[2rem] font-bold"
						>
							Perguntas frequentes
							<img 
								src={elementSpace}
								className="h-6"
								draggable="false"
							/>
						</h2>

						<section
							className="max-w-3xl w-full"
						>
							<ButtonSelect
								question="Como posso me cadastrar na Pawsy?"
								answare={`Para se cadastrar na Pawsy, basta clicar no botão "Acessar" na página inicial. Você pode escolher entre as opções de cadastro para tutor, clínica ou médico e preencher as informações necessárias.`}
							/>
							<ButtonSelect
								question="Quanto custa o uso da plataforma Pawsy?"
								answare={`O uso básico da Pawsy é totalmente gratuito. Oferecemos funcionalidades essenciais para cuidar dos seus pets sem custo.`}
							/>
							<ButtonSelect
								question="Como posso encontrar uma clínica veterinária próxima na Pawsy?"
								answare={`Para encontrar uma clínica veterinária próxima, vá para a seção "Vet. mais próximo". A Pawsy mostrará um mapa e uma lista de clínicas veterinárias próximas com base no endereço fornecido.`}
							/>
							<ButtonSelect
								question="Posso compartilhar as informações do perfil do meu pet com outras pessoas?"
								answare={`No momento, a Pawsy não oferece a opção de compartilhar informações do perfil do seu pet com outras pessoas. Todas as informações são privadas e visíveis apenas para você e as clínicas veterinárias que você escolher.`}
							/>
							<ButtonSelect
								question="Como entro em contato com a equipe de suporte da Pawsy?"
								answare={`Você pode entrar em contato com a equipe de suporte da Pawsy clicando no botão de ajuda na parte inferior direita do menu de navegação dentro da plataforma. Estamos aqui para ajudar com todas as suas dúvidas e sugestões.`}
							/>

						</section>
					</article>
				</section>
			</main>

			<section
				className="bg-banner_footer px-6 md:p-0 w-full h-[500px] bg-no-repeat bg-cover mt-8 bg-top flex items-center"
			>
				<div
					className="w-full max-w-5xl mx-auto flex flex-col gap-8 md:px-8"
				>
					<p
						className="font-baloo2 text-white text-5xl w-full md:w-3/4"
					>
						Veja agora mesmo como está a saúde do seu pet
					</p>
					<button
						className="bg-secundary text-white w-fit font-baloo2 font-semibold text-base px-6 py-2 rounded-lg hover:bg-secundary/80 transition-colors duration-500"
						onClick={() => navigate("/acesso")}
					>
						Ver agora
					</button>
				</div>

			</section>

			<Footer />
		</main>
	)
}
