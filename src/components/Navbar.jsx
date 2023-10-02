import { Question, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import Logo from "../img/logoPawsy.svg";
import Cookies from 'js-cookie';

export function NavBar({ page }, index) {
	const isActive = (pathname) => {
		return window?.location?.pathname === pathname;
	};
	// console.log(page.pathname);
	const navigate = useNavigate()
	return (

		<li
			key={index}
			className={`nav-link ${isActive(page.pathname) && " lg:bg-[#F5F7FB] !text-black f after:block before:block"}`}
			onClick={() => navigate(`${page.pathname}`)}
		>
			<span>{page.name}</span>
		</li>
	)
}

	const handleButtonClickSignOut = () => {
		const allCookies = Cookies.get();
		for (let cookie in allCookies) {
				Cookies.remove(cookie);
		}

		window.location.reload();
	};
	
export function NavbarTutor({ page, isFirstAccess=false }) {
	const pages = [
		{
			name: "Inicío",
			pathname: "/tutor",
		},
		{
			name: "Carteira de vacinação",
			pathname: "/carteira",
		},
		{
			name: "Agendar consulta",
			pathname: "/consulta",
		},
		{
			name: "Vét. mais próximo",
			pathname: "/vets",
		},
		{
			name: "Bem-estar",
			pathname: "/bem-estar",
		},
		{
			name: "Receitas",
			pathname: "/receitas",
		},
	];

	const navigate = useNavigate()

	return (
		<>
			{
				!isFirstAccess &&
				<section className="nav_bar">
					<div className="w-52">
						<img src={Logo} alt="Logotipo PAWSY" />
					</div>

					<nav className="flex flex-col w-[calc(100%+24px)] gap-4">
						<ul>
							{pages.map((page, index) => {
								return (
									<NavBar page={page} key={index} />
								);
							})}
						</ul>
					</nav>
					<div className="flex justify-between text-white">
						<button
							onClick={handleButtonClickSignOut}
						>
							<SignOut size={24} color="#fff" />
						</button>
						<span>
							<Question size={24} color="#fff" />
						</span>
					</div>
				</section>
			}
		</>
	);
}

export function NavbarClinic() {
	const pages = [
		{
			name: "Perfil",
			pathname: "/clinica",
		},
		{
			name: "Agenda",
			pathname: "/agenda",
		},
		{
			name: "Marketing",
			pathname: "/marketing",
		},
		{
			name: "Pacientes",
			pathname: "/pacientes",
		},
	];

	const isActive = (pathname) => {
		return window?.location?.pathname === pathname;
	};

	const navigate = useNavigate()

	return (
		<section className="nav_bar">
			<div className="w-52">
				<img src={Logo} />
			</div>
			<nav className="flex flex-col w-[calc(100%+24px)] gap-4">
				<ul>

					{pages.map((page, index) => {
						return (
							<NavBar page={page} key={index} />
						);
					})}
				</ul>
			</nav>
			<div className="flex justify-between text-white">
				<button
					onClick={handleButtonClickSignOut}
				>
					<SignOut size={24} color="#fff" />
				</button>
				<span>
					<Question size={24} color="#fff" />
				</span>
			</div>
		</section>
	);
}