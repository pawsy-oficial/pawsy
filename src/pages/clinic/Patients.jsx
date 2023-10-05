import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";
import { GenderFemale, GenderMale, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { PatientsCard } from "../../components/PatientsComponents/PatientsCard";
import { useState } from "react";
import { ModalPetExists } from "../../components/PatientsComponents/ModalPetExists";

export default function Patient() {
  const [open, setOpen] = useState(false)

  const donos = ["Davi Silva", "Rodrygo Goes", "Kevin Gomes", "Kauan Viera"]
  const idPatients = [222, 312, 664, 83]
  const NmPatients = ["Flor", "Rabico", "Waguinho", "Zezinho"]
  const qtdPatients = [4]

  return (
    <main className="flex min-h-screen">
      <NavbarClinic page={0} />
      <section className="flex-1">
        <Header userType={"clinica"} />

        <main className="pl-10 pr-16 py-8 flex gap-5">
          <section className="flex-1 flex flex-col bg-white px-6 py-8 rounded-2xl">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-2xl">Pacientes</h1>
              <p className="text-gray-400 text-sm">({qtdPatients[0]})</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3 mt-5">
                <input type="radio" name="gender" id="mal" className="hidden" />
                <label id="male" htmlFor="mal">Macho <GenderMale color="#8FB5FF" size="24px" /></label>

                <input type="radio" id="fem" name="gender" className="hidden" />
                <label id="female" htmlFor="fem">Fêmea <GenderFemale color="#FF8FCB" size="24px" /></label>
              </div>

              <div className="flex gap-1 border-primary border rounded-lg p-1 h-8 mt-5 bg-[#F5FFFE]">
                <input type="text" name="" id="" className="bg-[#F5FFFE]" placeholder="Pesquisa" />
                <button><MagnifyingGlass /></button>
              </div>
            </div>

            <section className="mt-10 flex flex-col gap-5">
              <PatientsCard donosP={donos[0]} id={idPatients[0]} pet={NmPatients[0]} />
              <PatientsCard donosP={donos[1]} id={idPatients[1]} pet={NmPatients[1]} />
              <PatientsCard donosP={donos[2]} id={idPatients[2]} pet={NmPatients[2]} />
              <PatientsCard donosP={donos[3]} id={idPatients[3]} pet={NmPatients[3]} />
            </section>
          </section>

          <aside className="flex flex-col gap-10">
            <ModalPetExists isOpen={open} setOpen={setOpen} />
            <section className="w-96 bg-white px-4 py-8 items-center rounded-2xl flex flex-col gap-5 h-max">
              <div className="bg-primary w-4/5 h-12 rounded-full flex items-center justify-center">
                <button className="flex gap-4" onClick={() => setOpen(!open)}>
                  <Plus size={24} color="#FFF" />
                  <p className="text-white text-lg font-medium">Adicionar novo paciente</p>
                </button>
              </div>
            </section>
          </aside>

        </main>
      </section>
    </main>
  )
}