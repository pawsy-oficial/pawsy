import { HeaderMedic } from "../../components/HeaderMedic";
import CardClinics from "../../components/componentsMedic/CardClinics/CardClinics";
import ZnVet from "../../img/znvet.jpg"
import randomClinic from "../../img/colors=purple.png"
import { useEffect, useState } from "react";

export default function Medic() {
  const date = new Date()
  const dateHour = date.getHours()

  const horarios = [8, 12, 14, 19]
  const namesMedic = ["Claudemir Machado", "Vanessa Santos"]
  
  const [openOrClose, setOpenOrClose] = useState(false);

  useEffect(() => {
    const checkOpeningHours = () => {
      const currentHour = new Date().getHours();
      if ((currentHour >= horarios[0] && currentHour < horarios[1]) || (currentHour >= horarios[2] && currentHour < horarios[3])) {
        setOpenOrClose(true);
      } else {
        setOpenOrClose(false);
      }
    };

    checkOpeningHours();
    const intervalId = setInterval(checkOpeningHours, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const ClinicasInfo = [
    {randomClinic}, "PetMax",
    {ZnVet}, "ZnVet",
    {randomClinic}, "MonoPet"
  ]

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
            <CardClinics img={ZnVet} nameClinic={ClinicasInfo[3]} openOrClose={openOrClose}/>
            <CardClinics img={randomClinic} nameClinic={ClinicasInfo[1]} openOrClose={openOrClose}/>
            <CardClinics img={randomClinic} nameClinic={ClinicasInfo[5]} openOrClose={openOrClose}/>
          </nav>
        </section>
      </>
    )
}