import { X } from "@phosphor-icons/react";

export default function ViewVaccines({ setViewType }){
  return(
    <section className="bg-white p-6 rounded-xl">
      <button onClick={() => setViewType('none')} ><X/></button>
        VACINAS
    </section>
  )
}