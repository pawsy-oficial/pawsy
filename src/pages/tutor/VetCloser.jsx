import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import CardsVetCloser from "../../components/cardsAndBoxes/cardClinicCloser";
import useCheckedPet from "../../hook/useCheckedPet";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import CardPostsAds from "../../components/cardsAndBoxes/cardPostAd";

function waitForSpatialMath() {
	return new Promise((resolve, reject) => {
		const maxAttempts = 10; // Número máximo de tentativas
		let attempts = 0;

		function checkAvailability() {
			attempts++;

			if (attempts > maxAttempts) {
				reject(new Error('O método SpatialMath.getDistanceTo não está disponível após várias tentativas.'));
				return;
			}

			if (Microsoft.Maps.SpatialMath && typeof Microsoft.Maps.SpatialMath.getDistanceTo === 'function') {
				clearTimeout(timer)
				resolve();
			} else {
				var timer = setTimeout(checkAvailability, 1000); // Verifica a cada segundo
			}
		}
		checkAvailability();
	});
}

export default function VetCloser() {
	useCheckedPet()

	const [mapaCarregado, setMapaCarregado] = useState(false);
	const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
	const [clinicsLocation, setClinicsLocation] = useState([]);
	const [clinicCloser, setClinicCloser] = useState([]);

	useEffect(() => {
		const { jwtTokenTutor } = Cookies.get();

		axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
			headers: {
				Authorization: `Bearer ${jwtTokenTutor}`,
			},
		})
			.then((e) => {
				axios.get(`${import.meta.env.VITE_URL}/coordinates?idTutor=${e.data.storedIdTutor}`, {
					headers: {
						Authorization: `Bearer ${jwtTokenTutor}`,
					},
				})
					.then((e) => {
						setLocation({
							latitude: e.data[0].latitude,
							longitude: e.data[0].longitude,
						});
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, []);

	let searchExecuted = false

	useEffect(() => {
		const { jwtTokenTutor } = Cookies.get();

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${import.meta.env.VITE_KEY_TOKEN_MAP}`;
		script.async = true;
		script.defer = true;

		if (location.latitude != null || location.longitude != null) {
			axios.get(`${import.meta.env.VITE_URL}/ClinicCoordinates`, {
				headers: {
					Authorization: `Bearer ${jwtTokenTutor}`,
				},
			})
				.then((res) => {
					setClinicsLocation(res.data);
				})
				.catch((err) => console.log(err));

			window.GetMap = async () => {
				setMapaCarregado(true);
				await GetMap();
				try {
					await waitForSpatialMath();

					if (!searchExecuted) { // Verificar se a pesquisa já foi executada
						searchExecuted = true // Definir para true após a primeira execução
						Search();
					}
				} catch (error) {
					console.error('Erro ao esperar pelo método SpatialMath.getDistanceTo:', error);
				}
			};
		}

		document.body.appendChild(script);

		return () => {
			delete window.GetMap;
			document.body.removeChild(script);
		};
	}, [location.latitude, location.longitude]);

	let map, pinLayer, searchPolygon, infobox;
	var infoboxLayer = new Microsoft.Maps.EntityCollection();

	let executed = false

	function GetMap() {
		// console.log(location.latitude, location.longitude);
		let navigationBarMode = Microsoft.Maps.NavigationBarMode;
		map = new Microsoft.Maps.Map('#myMap', { // create map

			credentials: import.meta.env.VITE_KEY_TOKEN_MAP, // api Key

			// start point
			center: new Microsoft.Maps.Location(location.latitude, location.longitude),

			// style default map
			mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,

			// zoom map
			zoom: 15,
			minZoom: 14,
			maxZoom: 16,

			navigationBarMode: navigationBarMode.square, // estilo dos controles
			supportedMapTypes: [Microsoft.Maps.MapTypeId.road, Microsoft.Maps.MapTypeId.aerial], // estilo dos controles

			customMapStyle: { // customizar o estilo do mapa
				elements: {
					area: { fillColor: '#f5f5f5' },
					water: { fillColor: '#1ba8c4' },
					tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
					arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
					road: { fillColor: '#ffffff', strokeColor: '#d9d9d9' },
					street: { fillColor: '#ffffff', strokeColor: '#ffffff' }
				}
			}

		});

		let pinMe = new Microsoft.Maps.Pushpin({ latitude: location.latitude, longitude: location.longitude }, { // cria e configura um pin
			title: "Você",
			color: "#009b65"
		})

		map.entities.push(pinMe) // insere o pin no mapa

		pinLayer = new Microsoft.Maps.Layer();
		map.layers.insert(pinLayer);

		if (!executed && clinicsLocation.length) {
			executed = true
			clinicsLocation.forEach((location) => {
				insertPin(location)
			})
		}
		infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
		infoboxLayer.push(infobox);

		//Assign the infobox to a map instance.
		infobox.setMap(map);
		Microsoft.Maps.Events.addHandler(map, 'click', function (e) { infobox.setOptions({ visible: false }) });
		Microsoft.Maps.Events.addHandler(map, 'mouseup', function (e) { document.querySelector("#myMap").style.cursor = "grab" });
		Microsoft.Maps.Events.addHandler(map, 'mousedown', function (e) { document.querySelector("#myMap").style.cursor = "grabbing" });
	}


	function Search() {
		//Use the center of the map as the center of the search area.
		let origin = { latitude: location.latitude, longitude: location.longitude };
		let radiusOption = 2;
		let radius = parseFloat(radiusOption);

		//Get all the pushpins from the pinLayer.
		let pins = pinLayer.getPrimitives();

		//Loop through each pushpin and calculate its distance from the origin and change the color depending on if it is within the search area or not.

		if (pins.length > 0) {
			for (let i = 0; i < pins.length; i++) {
				// console.log(typeof Microsoft.Maps.SpatialMath.getDistanceTo);
				let distance = Microsoft.Maps.SpatialMath.getDistanceTo(origin, pins[i].getLocation(), Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers);
				// console.log("oook");

				if (distance <= radius) {
					pins[i].setOptions({ color: 'blue' });
					// console.log(pins[i].metadata.id);
					const idClinic = pins[i].metadata.id
					setClinicCloser(oldArray => [...oldArray, idClinic])
					// const newArrayIdClinic = [...clinicCloser, idClinic]
					// console.log(newArrayIdClinic);
				} else {
					pins[i].setOptions({ visible: false });
				}
			}
		}


		//Create a circle polygon to show the search area. 
		let circleLocs = Microsoft.Maps.SpatialMath.getRegularPolygon(origin, radius, 36, Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers);

		if (searchPolygon) {
			searchPolygon.setLocations(circleLocs);
		} else {
			searchPolygon = new Microsoft.Maps.Polygon(circleLocs, {
				strokeColor: '#009b65',
				fillColor: 'transparent'
			});

			map.entities.push(searchPolygon);
		}
	}


	function insertPin({ latitude, longitude, idClinica }) {
		// console.log(answer.results[0].location); // jogar isso no banco

		axios.get(`${import.meta.env.VITE_URL}/ClinicPreviews?id=${idClinica}`)
			.then(res => {
				let c = new Microsoft.Maps.Pushpin(
					{ latitude: latitude, longitude: longitude }, {
					icon: `
						<svg width="37" height="49" viewBox="0 0 37 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 42.5C15.5 44.1667 19 47 24 42.5M9 43C11 44.6667 19 52.5 28 43" stroke="#1BA8C4"/><g filter="url(#filter0_d_1622_2746)"><path d="M33 18.4537C33 30.2063 18.5 41.1754 18.5 41.1754C18.5 41.1754 4 30.2063 4 18.4537C4 14.0899 5.52767 9.90484 8.24695 6.81917C10.9662 3.73351 14.6544 2 18.5 2C22.3456 2 26.0338 3.73351 28.753 6.81917C31.4723 9.90484 33 14.0899 33 18.4537Z" fill="#1BA8C4"/></g><path d="M18.5002 25.9123C23.6984 25.9123 27.9125 21.6983 27.9125 16.5C27.9125 11.3017 23.6984 7.08772 18.5002 7.08772C13.3019 7.08772 9.08789 11.3017 9.08789 16.5C9.08789 21.6983 13.3019 25.9123 18.5002 25.9123Z" fill="#F8F8F8" stroke="#F8F8F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.6305 11.1798C18.2964 11.2671 17.592 11.688 17.6271 13.1215C17.6308 13.2705 17.8186 14.4793 18.8907 14.5595C19.6947 14.6196 20.1621 13.6184 20.1271 12.6912C20.0935 11.8005 19.3873 11.0931 18.7211 11.1626C18.6956 11.1653 18.6651 11.1707 18.6305 11.1798ZM15.0877 12.0853C14.9958 12.1098 14.9097 12.1469 14.8321 12.1972C14.6075 12.3428 14.0236 13.0337 14.8527 14.4102C14.9308 14.5398 15.7036 15.5212 16.6886 15.1146C17.4272 14.8097 17.3358 13.7195 16.8391 12.9182C16.429 12.2566 15.6493 11.9354 15.0877 12.0853ZM21.5134 13.2052C21.1592 13.2984 20.5682 13.6683 20.42 14.8659C20.4029 15.0048 20.4112 16.1502 21.4015 16.3538C22.1441 16.5066 22.719 15.6329 22.8145 14.7675C22.9063 13.9361 22.3444 13.1939 21.7125 13.1781C21.6643 13.1769 21.5952 13.1837 21.5134 13.2052ZM13.8055 15.3584C13.6442 15.3975 13.5013 15.47 13.3909 15.5764C13.2112 15.7496 12.8031 16.4882 13.8282 17.6158C13.9247 17.722 14.8232 18.4947 15.6549 17.9493C16.2786 17.5403 15.9883 16.5497 15.3786 15.8956C14.9393 15.4243 14.2893 15.2411 13.8055 15.3584ZM18.2523 16.0731C16.9167 16.4162 16.5458 17.3642 16.3027 18.1007C15.992 19.0422 15.7671 20.3086 16.5079 20.658C17.5155 21.1332 17.9174 20.472 18.4469 20.1601C19.1131 19.7677 19.3094 19.6923 19.6464 19.6195C20.0996 19.5215 20.5352 19.6328 20.9707 19.6778C22.2593 19.811 22.566 19.3306 22.5354 18.8295C22.4687 17.7337 21.111 16.9493 20.2801 16.4279C19.6423 16.0277 18.9928 15.8971 18.3167 16.0572C18.295 16.0623 18.2735 16.0676 18.2523 16.0731Z" fill="black"/><defs><filter id="filter0_d_1622_2746" x="0" y="0" width="37" height="47.1754" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1622_2746"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1622_2746" result="shape"/></filter></defs></svg>
					`
				});

				c.metadata = {
					nameClinic: res.data.Nome,
					address: res.data.Endereco,
					image: res.data.Imagem,
					id: idClinica
				};
				Microsoft.Maps.Events.addHandler(c, "click", pushpinClicked)

				pinLayer.add(c)
			})
			.catch(err => console.log(err))

		Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath');
	}


	function pushpinClicked(e) {
		if (e.targetType == "pushpin") {
			var pin = e.target;
			// console.log(pin.metadata);
			var html = `
				<div class="p-3 bg-white rounded-lg flex flex-col w-60 shadow-lg">
					<div class="flex gap-3 items-center">
						<div class="bg-primary overflow-hidden rounded-full min-w-[40px] w-10 h-10 border-2 border-secundary">
							<img src="${import.meta.env.VITE_URL}/files/${pin.metadata.image}" class="h-full w-full object-cover">
						</div>
						<div class="flex flex-col">
							<h3 class="text-2xl font-lato font-bold capitalize">
								${pin.metadata.nameClinic}
							</h3>
							<span class="text-green-600 text-xs">aberto</span>
						</div>
					</div>
					<div class="flex flex-col">
						<p class="text-zinc-400 text-xs my-2">
							${pin.metadata.address}
						</p>
						
					</div>
				</div>
			`;

			infobox.setOptions({
				visible: true,
				offset: new Microsoft.Maps.Point(-33, 20),
				htmlContent: html
			});

			//set location of infobox
			infobox.setLocation(pin.getLocation());
		}
	}

	const [clinicInfoPreview, setClinicInfoPreview] = useState([])
	const [adsPreview, setAdsPreview] = useState([])
	const [statusClinic, setStatusClinic] = useState(false)

	useEffect(() => {
		clinicCloser.forEach(id => {
			axios.get(`${import.meta.env.VITE_URL}/ClinicPreviews?id=${id}`)
				.then(res => {
					// console.log(res.data);
					setClinicInfoPreview(oldInfos => [...oldInfos, res.data])
				})
				.catch(err => console.log(err))
			// console.log(id);
			axios.get(`${import.meta.env.VITE_URL}/getAllAds/${id}?filter=preview`)
				.then(e => {
					if(e.data.adsPreview.length > 0){
						console.log(e.data.adsPreview);
						setAdsPreview(oldAds => [...oldAds, e.data.adsPreview])
					}
				})
				.catch(err => console.log(err))
			// criar uma rota para pegar todos os posts dessas clinicas
		})
	}, [clinicCloser])

	return (
		<main className="flex min-h-screen">
			<NavbarTutor />
			<section className="flex-1">
				<Header userType="tutor" />

				<main className="lg:max-w-5xl mx-auto px-5 my-8 mb-16">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl">Veterinário mais próximo de você:</h1>
						<button
							className="p-2 bg-primary rounded hover:bg-primary/80"
							onClick={() => { window.location.reload() }}
						>
							<ArrowCounterClockwise size={18} color="#ffffff" weight="bold" />
						</button>
					</div>
					<div className="flex justify-center my-8 w-full h-[32rem] border-primary border-2 rounded-[4px]">
						{
							!mapaCarregado ? <p>Carregando...</p> : <div id="myMap" />
						}
					</div>

					<div className="w-[calc(100vw-64px)] xl:w-full lg:w-[calc(100vw-256px-64px)]">
						<h2>Na sua área:</h2>
						<div className="flex flex-row gap-4 overflow-x-auto pb-3 mt-6">
							{
								clinicInfoPreview.map(
									clinicInfo => {
										// console.log(clinicInfo);
										return (
											<CardsVetCloser
												nameClinic={clinicInfo.Nome}
												address={clinicInfo.Endereco}
												img={clinicInfo.Imagem}
												id={clinicInfo.Id}
												clinicOpenOrClose={clinicInfo.Status}
											// distanceFromTheClinic={"1.5 km"} 
											// assessment={"4,0"}
											/>
										)
									}
								)
							}
						</div>
					</div>
					<h2 className="mt-8">Promoções próximas de você</h2>

					<section
						className="w-full grid grid-cols-4 gap-5 mt-6"
					>
						{
							adsPreview.map(ad => {
								return( 
									ad.map(a => {
										return (
											<CardPostsAds
												title={a.title}
												description={a.description}
												idClinic={a.idClinic}
												imageClinicURL={a.urlImageClinic}
												imageURL={a.imgPost}
												nameClinic={a.nameClinic}
											/>
										)
									})
								)
							})
						}
					</section>

				</main>
			</section>
		</main>
	);
}