import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { GenderFemale, GenderMale, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { PatientsCard } from "../../components/PatientsComponents/PatientsCard";
import { useEffect, useState } from "react";
import { ModalPetExists } from "../../components/PatientsComponents/ModalPetExists";
import axios from "axios";
import Cookies from "js-cookie";

export default function Patient() {
	const [ open, setOpen ] = useState(false)
	const [ patients, setPatients ] = useState([])
	const [ namePatient, setNamePatient ] = useState("")
	const [ gender, setGender ] = useState("")
	const [prev, setPrev] = useState(false)

	let idClinic

	useEffect(()=>{
		const tokenClinic = Cookies.get("jwtTokenClinic")

        axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
            headers: {
                Authorization: `Bearer ${tokenClinic}`
            }
        }).then(e => {
                idClinic = e.data.storedIdClinica
				axios.get(`${import.meta.env.VITE_URL}/getAllPatients/${idClinic}`, {
					headers:{
						Authorization: `Bearer ${tokenClinic}`
					}
				}).then(e => {
					setPatients(e.data.result)
				})
				.catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err)
            })
	},[open, prev])

	const filterPatientes = patients.filter(patient => (
		(
			gender.length == 0
				? patient.namePet.startsWith(namePatient.toLowerCase()) 
				: patient.nm_sexo == gender && patient.namePet.startsWith(namePatient.toLowerCase())
		) 
	) ?? [])

	return (
		<main className="flex min-h-screen">
			<NavbarClinic page={0} />
			<section className="flex-1">
				<Header userType={"clinica"} />

				<main className="pl-10 pr-16 py-8 flex gap-5">
					<section className="flex-1 flex flex-col bg-white px-6 py-8 rounded-2xl">
						<div className="flex items-center gap-2">
							<h1 className="font-semibold text-2xl">Pacientes</h1>
							<p className="text-gray-400 text-sm">({patients.length})</p>
						</div>
						<div className="flex justify-between mt-5">
							<div className="flex gap-3">
								<input 
									type="radio"
									name="gender"
									id="mal"
									className="hidden"
								/>
								<label 
									id="male"
									htmlFor="mal"
									className="flex py-1 px-2 rounded-lg cursor-pointer gap-1 border-2 border-transparent hover:border-[#8fB5FF]"
									onClick={()=>setGender("macho")}
								>
									<span>Macho</span>
									<GenderMale color="#8FB5FF" size="24px" />
								</label>

								<input type="radio" id="fem" name="gender" className="hidden" />
								<label 
									id="female"
									htmlFor="fem"
									className="flex py-1 px-2 rounded-lg cursor-pointer gap-1 border-2 border-transparent hover:border-[#FF8FCB]"
									onClick={()=>setGender("fêmea")}
								>
									<span>Fêmea</span> 
									<GenderFemale color="#FF8FCB" size="24px" />
								</label>
							</div>

							<div 
								className="flex gap-1 border-primary border rounded-lg py-1 px-4 h-8  bg-[#F5FFFE]"
							>
								<input 
									type="text"
									className="bg-[#F5FFFE]" 
									placeholder="Pesquisa" 
									title="pesquise pelo nome do paciente"
									value={namePatient}
									onChange={e=> {
										setNamePatient(e.target.value)
									}}
								/>
								<MagnifyingGlass />
							</div>
						</div>

						<section className="mt-10 flex flex-col gap-5">
							{
								patients.length == 0 
								? <p className="text-zinc-500">A clínica não possui pacientes cadastrados</p>
								: filterPatientes.map(patient => {
									return (
										<PatientsCard 
											donosP={patient.nameTutor} 
											id={patient.id} 
											pet={patient.namePet} 
											image={patient.imagePet} 
											gender={patient.nm_sexo}
											idClinic={idClinic}
											setProv={setPrev}
											prev={prev}
										/>
									)
								})
							}
						</section>
					</section>

					<aside className="flex flex-col gap-10">
						<ModalPetExists 
							isOpen={open} 
							setOpen={setOpen}
						/>
						<section className="w-96 bg-white px-4 py-8 items-center rounded-2xl flex flex-col gap-5 h-max">
							<button 
								className="bg-primary w-full rounded-full flex items-center justify-center py-2 gap-3 hover:bg-primary/80"
								onClick={() => setOpen(!open)}
							>
								{/* <button className="flex gap-4"> */}
									<Plus size={24} color="#FFF" />
									<span 
										className="text-white text-lg font-medium"
									>
										Adicionar novo paciente
									</span>
								{/* </button> */}
							</button>
						</section>
					</aside>

				</main>
			</section>
		</main>
	)
}