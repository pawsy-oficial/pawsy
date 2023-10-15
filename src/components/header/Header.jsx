import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import ProfileModal from "./ProfileModal";
import Notification from "./Notification";
import { memo, useEffect, useState } from "react";

import LogoGreen from "../../img/logoPawsyGreen.svg"
import LogoWhite from "../../img/logoPawsy.svg"
import { NavBar } from "../Navbar";
import SearcInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

export function Header({ userType }) {

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


	const [windowScreen, setWindowScreen] = useState({ width: null })

	useEffect(() => {
		function handleResize() {
			setWindowScreen({ width: window.innerWidth })
		}
		window.addEventListener("resize", handleResize)
		handleResize()

		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const [navState, setNavState] = useState(false)
	const [searchState, setSearchState] = useState(false)

	useEffect(() => {
		if (windowScreen.width > 1020) {
			setNavState(false)
			setSearchState(false)
		}
	}, [windowScreen])

	return (
		<>
			<header className="w-full bg-[#F9FFFD] py-3 px-6 md:px-20 sticky top-0 z-50">
				<div className="flex justify-between xl:justify-end items-center">
					<button
						className="block lg:hidden"
						onClick={() => setNavState(!navState)}
					>
						{
							navState
								? <X size={24} />
								: <List size={24} />
						}
					</button>
					<img src={LogoGreen} className="block lg:hidden translate-x-[20%]" />

					{
						userType == "tutor" && (
							<SearcInput />
						)
					}

					<div className="flex gap-4 items-center">
						<div>

							{
								windowScreen.width < 1020
									? (
										<button onClick={() => setSearchState(!searchState)}>
											<MagnifyingGlass size={24} />
										</button>
									)
									: <Notification />
							}

						</div>
						<div className="">
							<ProfileModal userType={userType} />
						</div>
					</div>


				</div>
				{
					searchState && (
						<div className="w-full mt-2">
							<input type="search" className="w-full h-full py-1 px-3 border focus:border-primary" />
						</div>
					)
				}
				{
					navState && (
						<div className=" bg-[#F9FFFD] absolute left-0 right-0 top-full border-b-2 border-primary rounded-b-xl">
							<ul>

								{
									pages.map((page, index) => { return <NavBar page={page} key={index} /> })
								}

							</ul>
						</div>
					)
				}
			</header>
		</>
	);
}


function HeaderLogin({ style }) {
	const navigate = useNavigate()

	return (
		<header
			className={`flex justify-between items-center w-full sticky top-0 gap-16 px-16 py-8`}
			style={style}
		>
			<img
				src={LogoWhite} alt="Logo pawsy" height={64} width={200}
				loading="lazy"
			/>

			<nav
				className="gap-10 font-lato text-lg text-white hidden md:flex"
			>
				<a
					onClick={() => navigate("/")}
					className="cursor-pointer"
				>
					Página inicial
				</a>
				<a
					onClick={() => navigate("/sobre")}
					className="cursor-pointer"
				>
					Sobre nós
				</a>
				{/* <a href="#">suporte</a> */}
			</nav>
		</header>
	)
}


function HeaderLandingPage({type}) {

	const navigate = useNavigate()

	const isActive = (pathname) => {
		return window?.location?.pathname === pathname
	};
	const [ limit, setLimit ] = useState(false)

	function handleScroll(e) {
		let scroll = window.scrollY
		scroll > 700 ? setLimit(true) : setLimit(false)
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
	}, [])

	const pages = [
		{
			pageName: "Home",
			urlPage: "/"
		},
		{
			pageName: "Sobre nós",
			urlPage: "/sobre"
		},
		// {
		// 	pageName: "Planos",
		// 	urlPage: "/planos"
		// },
		// {
		// 	pageName: "Recursos",
		// 	urlPage: "/recursos"
		// }
	]

	return (
		<header
			className={`flex w-full justify-between items-center px-16 py-5 fixed top-0 z-50 backdrop-blur-sm ${(limit || type == "light" ) && "bg-white"} transition-colors duration-700`}
		>
			<div
				className="flex gap-20"
			>
				<div>
					<img src={LogoGreen} alt="Logo Pawsy" />
				</div>
				<nav
					className="flex gap-16"
				>
					{
						pages.map(page => {
							return (
								<a
									className="font-baloo2 font-semibold text-base flex flex-col items-center cursor-pointer gap-1 data-[status=active]:text-primary"
									data-status={isActive(page.urlPage) ? "active" : "disabled"}
									onClick={() => navigate(`${page.urlPage}`)}
								>
									{page.pageName}
									{
										isActive(page.urlPage) && (
											<figure>
												<svg className="fill-primary w-4" viewBox="0 0 435 417" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M66.5355 268.179C89.0406 252.633 165.352 233.203 174.725 237.218C194.972 253.749 238.742 325.327 240.217 374.309C241.138 404.894 186.369 440.519 150.691 394.594C138.635 379.075 136.104 365.47 123.779 362.847C108.607 359.617 100.763 376.602 67.0205 375.061C17.1934 372.785 6.46389 309.675 66.5355 268.179Z" />
													<path d="M76.6308 72.2136C70.2558 68.3165 63.3137 66.1212 56.2246 66.0942C44.6907 66.0442 6.6695 77.4102 0.085045 147.834C-0.534855 154.466 1.07685 209.04 45.7107 217.736C79.1826 224.258 104.02 182.041 107.367 140.706C109.778 110.923 95.7554 83.9061 76.6308 72.2136Z" />
													<path d="M409.119 274.567C407.736 267.1 404.688 260.342 399.907 254.924C392.133 246.104 357.82 224.753 300.314 266.902C294.899 270.871 254.883 308.648 278.563 348.472C296.32 378.338 344.942 368.984 378.345 343.851C402.412 325.741 413.264 296.966 409.119 274.567Z" />
													<path d="M217.03 0.47779C221.177 1.30929 225.135 2.84924 228.843 4.99625C251.506 18.1148 264.862 53.885 255.025 89.0421C243.11 131.626 208.654 170.734 175.156 157.059C130.487 138.824 139.942 81.371 141.941 74.556C163.158 2.18616 205.038 -1.92772 217.03 0.47779Z" />
													<path d="M373.005 92.7449C376.197 95.5186 378.875 98.8148 381.036 102.515C394.242 125.127 388.155 162.821 362.214 188.509C330.794 219.624 281.503 236.567 259.155 208.111C229.355 170.167 265.993 124.913 271.101 119.979C325.34 67.5801 363.772 84.7219 373.005 92.7449Z" />
												</svg>
											</figure>
										)
									}
								</a>
							)
						})
					}
				</nav>
			</div>
			<div>
				<button
					className="bg-primary text-white font-baloo2 font-semibold text-base px-6 py-2 rounded-lg"
					onClick={() => navigate("/acesso")}
				>
					Acessar
				</button>
			</div>
		</header>
	)
}

const memoHeaderLogin = memo(HeaderLogin)
const memoHeaderLandingPage = memo(HeaderLandingPage)
export { memoHeaderLogin as HeaderLogin }
export { memoHeaderLandingPage as HeaderLandingPage }
