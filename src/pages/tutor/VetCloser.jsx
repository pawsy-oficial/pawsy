import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import CardsVetCloser from "../../components/cardsAndBoxes/cardClinicCloser";
import "../../style/vet-closer.css"

export default function VetCloser() {
    return (
      <main className="flex min-h-screen">
        <NavbarTutor />
        <section className="flex-1">
          <Header userType="tutor"/>

          <main className="lg:max-w-5xl mx-auto px-5 my-8">
            <h1 className="text-2xl">Veterinário mais próximo de você:</h1>
            <div className="flex justify-center my-8 w-full h-[32rem] border-primary border-2 rounded-[4px]">
                 <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.146321441899!2d-46.4124008244477!3d-23.955265476182166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce1b854d76218d%3A0x899c7e64e46c67fa!2sVeterin%C3%A1ria%20Popular%20C%C3%A3o%20Vicente!5e0!3m2!1spt-BR!2sbr!4v1684520773506!5m2!1spt-BR!2sbr"  /> 
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