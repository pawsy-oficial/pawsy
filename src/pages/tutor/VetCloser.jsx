import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import CardsVetCloser from "../../components/cardsAndBoxes/cardClinicCloser";
import useCheckedPet from "../../hook/useCheckedPet";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

export default function VetCloser() {
	useCheckedPet()
	


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

	const [mapaCarregado, setMapaCarregado] = useState(false);
	const [location, setLocation] = useState({latitude: null, longitude: null})
	useEffect(() => {

		const {jwtTokenTutor} = Cookies.get()

		axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
			headers: {
				Authorization: `Bearer ${jwtTokenTutor}`
			}
		}).then(
			(e)=> {
				axios.get(`${import.meta.env.VITE_URL}/coordinates?idTutor=${e.data.storedIdTutor}`,{
					headers: {
						Authorization: `Bearer ${jwtTokenTutor}`
					}
				})
				.then(e => setLocation({
					latitude: e.data[0].latitude,
					longitude: e.data[0].longitude,
				}))
				.catch(err => console.log(err))
			}
		).catch(err => console.log(err))
	}, []);

	useEffect(()=>{
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${import.meta.env.VITE_KEY_TOKEN_MAP}`;
		script.async = true;
		script.defer = true;

		window.GetMap = async () => {
			setMapaCarregado(true);
			await GetMap()
			waitForSpatialMath()
				.then(() => {
					Search()
				})
				.catch((error) => {
					console.error('Erro ao esperar pelo método SpatialMath.getDistanceTo:', error);
				});
		};

		document.body.appendChild(script);
		
		return () => {
			delete window.GetMap;
			document.body.removeChild(script);
		};
	}, [location]);

	let map, pinLayer, searchPolygon, infobox;

	let infoboxTemplate = `
                <div class="p-3 bg-white rounded-lg flex flex-col w-60 shadow-lg">
                    <div class="flex gap-3 items-center">
                        <div class="bg-red-400 rounded-full w-10 h-10"></div>
                        <div class="flex flex-col">
                            <h3 class="text-2xl font-lato font-bold">{title}</h3>
                            <span class="text-green-600 text-xs">aberto</span>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-zinc-400 text-xs my-2">{address}</p>
                        <div class="flex justify-between w-full items-center">
                            <span class="text-base font-semibold">1.4KM</span>    
                            <div class="flex gap-4 items-center">
                                <span class="text-xs">4,8</span>    
                                <div class="flex gap-1">
									<div class="bg-yellow-500 w-2 h-2"></div>   
									<div class="bg-yellow-500 w-2 h-2"></div>   
									<div class="bg-yellow-500 w-2 h-2"></div>   
									<div class="bg-yellow-500 w-2 h-2"></div>   
									<div class="bg-yellow-500 w-2 h-2"></div>   
                                </div>    
                            </div>    
                        </div>
                    </div>
                </div>
		`

	function GetMap() {
		console.log(location.latitude, location.longitude);
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
			maxZoom: 15,

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

		let pinMe = new Microsoft.Maps.Pushpin({latitude: location.latitude, longitude: location.longitude}, { // cria e configura um pin
			title: "Você",
			color: "#009b65"
		})

		map.entities.push(pinMe) // insere o pin no mapa

		pinLayer = new Microsoft.Maps.Layer();
		map.layers.insert(pinLayer);
		const locations = [
			{
				latitude: -23.9373066,
				longitude: -46.3741295
			},
			{
				latitude: -23.9651855,
				longitude: -46.3852806
			},
			{
				latitude: -23.9589126,
				longitude: -46.3766286
			},

		]

		locations.forEach((location) => {
			/*function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2, unit = 'kilometers') {
				let theta = longitude1 - longitude2;
				let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
					Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
					Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
				);
				if (unit == 'miles') {
					return Math.round(distance, 2);
				} else if (unit == 'kilometers') {
					return Math.round(distance * 1.609344, 2);
				}
			}*/
			insertPin(location)
		})


		const title = "Test"
		const address = `Praça coronel lopez`

		infobox = new Microsoft.Maps.Infobox({latitude: location.latitude, longitude: location.longitude}, {
			visible: false,
			htmlContent: infoboxTemplate.replace('{title}', title).replace('{address}', address)
		});

		//Assign the infobox to a map instance.
		infobox.setMap(map);
	}

	function Search() {
		//Use the center of the map as the center of the search area.
		let origin = { latitude: location.latitude, longitude: location.longitude };
		let radiusOption = 2.5;
		let radius = parseFloat(radiusOption);

		//Get all the pushpins from the pinLayer.
		let pins = pinLayer.getPrimitives();

		//Loop through each pushpin and calculate its distance from the origin and change the color depending on if it is within the search area or not.
		for (let i = 0; i < pins.length; i++) {
			// console.log(typeof Microsoft.Maps.SpatialMath.getDistanceTo);
			let distance = Microsoft.Maps.SpatialMath.getDistanceTo(origin, pins[i].getLocation(), Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers);

			if (distance <= radius) {
				pins[i].setOptions({ color: 'blue' });
				console.log(`${pins[i].id} : active`);
			} else {
				pins[i].setOptions({ visible: false });
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

	function insertPin({ latitude, longitude }) {
		// console.log(answer.results[0].location); // jogar isso no banco
		let c = new Microsoft.Maps.Pushpin(
			{ latitude: latitude, longitude: longitude }, {
			icon: `<svg width="29" height="39" viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1583_2688)"><path d="M28.75 16.42C28.75 27.97 14.5 38.75 14.5 38.75C14.5 38.75 0.25 27.97 0.25 16.42C0.25 12.1314 1.75133 8.01855 4.42373 4.98608C7.09612 1.95362 10.7207 0.25 14.5 0.25C18.2793 0.25 21.9039 1.95362 24.5763 4.98608C27.2487 8.01855 28.75 12.1314 28.75 16.42Z" fill="#1BA8C4"/><path d="M14.5 23.75C19.6086 23.75 23.75 19.6086 23.75 14.5C23.75 9.39137 19.6086 5.25 14.5 5.25C9.39137 5.25 5.25 9.39137 5.25 14.5C5.25 19.6086 9.39137 23.75 14.5 23.75Z" fill="#F8F8F8" stroke="#F8F8F8" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.6284 9.27149C14.3001 9.35733 13.6078 9.77094 13.6424 11.1798C13.646 11.3262 13.8305 12.5141 14.8841 12.5929C15.6743 12.652 16.1336 11.6681 16.0992 10.7569C16.0662 9.88155 15.3722 9.18637 14.7174 9.25463C14.6924 9.25723 14.6624 9.26261 14.6284 9.27149ZM11.1467 10.1614C11.0564 10.1855 10.9718 10.222 10.8955 10.2714C10.6748 10.4145 10.1009 11.0935 10.9157 12.4462C10.9925 12.5736 11.752 13.5381 12.72 13.1385C13.4459 12.8389 13.3561 11.7675 12.8679 10.9799C12.4649 10.3298 11.6986 10.0141 11.1467 10.1614ZM17.4616 11.262C17.1135 11.3536 16.5327 11.7171 16.3871 12.8941C16.3702 13.0305 16.3784 14.1562 17.3516 14.3564C18.0815 14.5065 18.6465 13.6479 18.7403 12.7974C18.8305 11.9803 18.2783 11.2509 17.6573 11.2354C17.6099 11.2342 17.542 11.2409 17.4616 11.262ZM9.88659 13.3781C9.72807 13.4165 9.58769 13.4878 9.47917 13.5924C9.30261 13.7625 8.90155 14.4884 9.90889 15.5966C10.0037 15.7009 10.8867 16.4603 11.7041 15.9243C12.3171 15.5224 12.0318 14.5488 11.4326 13.906C11.0009 13.4429 10.3621 13.2628 9.88659 13.3781ZM14.2568 14.0805C12.9442 14.4176 12.5797 15.3493 12.3408 16.0731C12.0354 16.9984 11.8144 18.243 12.5425 18.5863C13.5326 19.0533 13.9277 18.4036 14.448 18.097C15.1027 17.7113 15.2956 17.6373 15.6268 17.5657C16.0722 17.4694 16.5003 17.5788 16.9283 17.623C18.1947 17.7539 18.496 17.2818 18.466 16.7894C18.4004 15.7125 17.0661 14.9415 16.2496 14.4291C15.6228 14.0358 14.9845 13.9075 14.32 14.0649C14.2987 14.0699 14.2776 14.0751 14.2568 14.0805Z" fill="black"/></g><defs><clipPath id="clip0_1583_2688"><rect width="28.5" height="38.5" fill="white" transform="translate(0.25 0.25)"/></clipPath></defs></svg>`
		});

		c.metadata = {
			title: 'Pin Title',
			description: 'Pin discription'
		};
		Microsoft.Maps.Events.addHandler(c, "click", pushpinClicked)

		pinLayer.add(c)

		Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath');
	}

	function pushpinClicked(e) {
		//Make sure the infobox has metadata to display.
		console.log(e);
		if (e.target.metadata) {
			//Set the infobox options with the metadata of the pushpin.
			infobox.setOptions({
				location: e.target.getLocation(),
				title: e.target.metadata.title,
				description: e.target.metadata.description,
				visible: true
			});
		}
	}

	return (
		<main className="flex min-h-screen">
			<NavbarTutor />
			<section className="flex-1">
				<Header userType="tutor" />

				<main className="lg:max-w-5xl mx-auto px-5 my-8">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl">Veterinário mais próximo de você:</h1>
						<button 
							className="p-2 bg-primary rounded hover:bg-primary/80"
							onClick={()=>{window.location.reload()}}
						>
							<ArrowCounterClockwise size={18} color="#ffffff" weight="bold"/>
						</button>
					</div>
					<div className="flex justify-center my-8 w-full h-[32rem] border-primary border-2 rounded-[4px]">
						{
							!mapaCarregado ? <p>Carregando...</p> : <div id="myMap"/> 
						}
					</div>
						
					<div className="w-[calc(100vw-64px)] xl:w-full lg:w-[calc(100vw-256px-64px)]">
						<h2 className="pb-6">Na sua área</h2>
						<div className="flex flex-row gap-4 pb-6 overflow-x-auto">
							<CardsVetCloser nameClinic={"ZN Vet"} clinicOpenOrClose={"Aberto"} address={"Av. Brg. Faria Lima, 320 - Radio Clube"} distanceFromTheClinic={"1.5 km"} assessment={"4,0"} />
							<CardsVetCloser nameClinic={"ZN Vet"} clinicOpenOrClose={"Aberto"} address={"Av. Brg. Faria Lima, 320 - Radio Clube"} distanceFromTheClinic={"1.5 km"} assessment={"4,0"} />
							<CardsVetCloser nameClinic={"ZN Vet"} clinicOpenOrClose={"Aberto"} address={"Av. Brg. Faria Lima, 320 - Radio Clube"} distanceFromTheClinic={"1.5 km"} assessment={"4,0"} />
							<CardsVetCloser nameClinic={"ZN Vet"} clinicOpenOrClose={"Aberto"} address={"Av. Brg. Faria Lima, 320 - Radio Clube"} distanceFromTheClinic={"1.5 km"} assessment={"4,0"} />
							<CardsVetCloser nameClinic={"ZN Vet"} clinicOpenOrClose={"Aberto"} address={"Av. Brg. Faria Lima, 320 - Radio Clube"} distanceFromTheClinic={"1.5 km"} assessment={"4,0"} />
						</div>
					</div>
					{/* <h2 className="">Ver mais</h2> */}
					{/* <p className="text-[#909090] text-xs">Encontre mais clínicas veterinárias fora da sua área</p> */}
				</main>
			</section>
		</main>
	);
}