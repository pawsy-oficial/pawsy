import { HeaderMedic } from "../../components/HeaderMedic";
import CardClinics from "../../components/componentsMedic/CardClinics/CardClinics";
import ZnVet from "../../img/znvet.jpg"
import randomClinic from "../../img/colors=purple.png"
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Medic() {
  const date = new Date()
  const dateHour = date.getHours()

  const horarios = [8, 12, 14, 19]

  const [infoMedic, setInfoMedic] = useState([]);

  const [idMedic, setIdMedic] = useState(null)

  const [clinicsMedic, setClinicsMedic] = useState([]);

  const [openOrClose, setOpenOrClose] = useState(false);

  const tokenMedic = Cookies.get("jwtTokenMedic")

  useEffect(() => {
    const checkOpeningHours = () => {
      const currentHour = new Date().getHours();
      if ((currentHour >= horarios[0] && currentHour < horarios[1]) || (currentHour >= horarios[2] && currentHour < horarios[3])) {
        setOpenOrClose(true);
      } else {
        setOpenOrClose(false);
      }
    };

    axios.get(`${import.meta.env.VITE_URL}/profileMedic`, {
      headers: {
        Authorization: `Bearer ${tokenMedic}`
      }
    }).then(res =>{
      setInfoMedic(res.data)
      setIdMedic(res.data.storedIdMedic)
    })

    axios.get(`${import.meta.env.VITE_URL}/clinicsMedic`, {
      headers: {
        Authorization: `Bearer ${tokenMedic}`
      }
    }).then(res =>{
      setClinicsMedic(res.data.results)
    })

    checkOpeningHours();
    const intervalId = setInterval(checkOpeningHours, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <header>
        <HeaderMedic />
      </header>
      <section className="max-w-7xl mx-auto mt-8 bg-[#F5F7FB]">
        <h1 className="text-3xl font-semibold">
          Olá, {infoMedic.storedNameMedic}
        </h1>
        <h3 className="mt-8 text-lg">
          Clínicas onde você trabalha:
        </h3>
        <nav className="flex flex-wrap gap-3">
          {
            clinicsMedic.map((clinic, i) => {
              return (
                <CardClinics 
                  key={i} 
                  img={clinic.url_imagem} 
                  nameClinic={clinic.nm_clinica} 
                  openOrClose={clinic.status_loja}
                  idClinic={clinic.id_clinica}
                  idMedic={idMedic}
                />
              )
            })
          }
        </nav>
      </section>
    </>
  )
}