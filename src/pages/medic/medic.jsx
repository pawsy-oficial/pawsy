import { HeaderMedic } from "../../components/HeaderMedic";
import CardClinics from "../../components/componentsMedic/CardClinics/CardClinics";
import ZnVet from "../../img/znvet.jpg"
import randomClinic from "../../img/colors=purple.png"
import { useEffect, useState } from "react";

export default function medic() {
  const date = new Date()
  const dateHour = date.getHours()

  const horarios = [8, 12, 14, 19]
  const namesMedic = ["Claudemir Machado", "Vanessa Santos"]
  
  const [openOrClose, setOpenOrClose] = useState(false);

  useEffect(()=>{
    if(dateHour >= horarios[0] || dateHour <= horarios[1] && dateHour >= horarios[2] || dateHour >= horarios[3])
    {
      setOpenOrClose(true)
    }
    else {
      setOpenOrClose(false)
    }
  },[])
  return(
      <>
        <header>
          <HeaderMedic/>
        </header>
        <section className="max-w-7xl mx-auto mt-8 bg-[#F5F7FB]">
          <h1 className="text-3xl font-semibold">
            Olá, {namesMedic[0]}
          </h1>
          <h3 className="mt-8 text-lg">
            Clínicas onde você trabalha:
          </h3>
          <nav className="flex flex-wrap gap-3">
            <CardClinics img={ZnVet} nameClinic="ZnVet" openOrClose={openOrClose}/>
            <CardClinics img={ZnVet} nameClinic="ZnVet1" openOrClose={openOrClose}/>
            <CardClinics img={ZnVet} nameClinic="ZnVet" openOrClose={openOrClose}/>
            <CardClinics img={ZnVet} nameClinic="ZnVet" openOrClose={openOrClose}/>
          </nav>
        </section>
      </>
    )
}