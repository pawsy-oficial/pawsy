import { X } from "@phosphor-icons/react";
import { CardRevenues } from "../CardRevenues";

export default function ViewRevenues({ setViewType }){
  return(
    <section className="bg-white p-6 rounded-xl">
      <button onClick={() => setViewType('none')} ><X/></button>
      <CardRevenues/>
    </section>
  )
}