import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import { Star } from '@phosphor-icons/react'
import CardsVetCloser from "../../components/VetCloser/VetCloser";
import "../../style/vet-closer.css"

export default function VetCloser() {
    return (
      <main className="flex min-h-screen">
        <NavbarTutor />
        <section className="flex-1">
          <Header/>
          <main className="max-w-5xl mx-auto px-5 my-8">
            <h1 className="text-2xl">Veterinário mais próximo de você:</h1>
            <div className="box-map">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.146321441899!2d-46.4124008244477!3d-23.955265476182166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce1b854d76218d%3A0x899c7e64e46c67fa!2sVeterin%C3%A1ria%20Popular%20C%C3%A3o%20Vicente!5e0!3m2!1spt-BR!2sbr!4v1684520773506!5m2!1spt-BR!2sbr" width="980" height="573" /> 
            </div>
            <h2 className="pb-6">Na sua área</h2>
            <div className="cards-vets pb-6">
                <div className="card1">
                    <h1 className="text-2xl">ZN Vet</h1>
                    <p className="text-xs text-[#409E44]">Aberto</p>
                    <p className="text-xs text-[#909090]">Av. Brg. Faria Lima, 320 - Radio Clube </p>
                    <p className="km-stars">1.5 km <Star size={18} /> <Star size={18} /> <Star size={18} /> <Star size={18} /></p>
                </div>
                <div className="card2">
                <h1 className="text-2xl">ZN Vet</h1>
                    <p className="text-xs text-[#409E44]">Aberto</p>
                    <p className="text-xs text-[#909090]">Av. Brg. Faria Lima, 320 - Radio Clube </p>
                    <p className="km-stars">1.5 km <Star size={18} /> <Star size={18} /> <Star size={18} /> <Star size={18} /></p>
                </div>
                <div className="card3">
                <h1 className="text-2xl">ZN Vet</h1>
                    <p className="text-xs text-[#409E44]">Aberto</p>
                    <p className="text-xs text-[#909090]">Av. Brg. Faria Lima, 320 - Radio Clube </p>
                    <p className="km-stars">1.5 km <Star size={18} /> <Star size={18} /> <Star size={18} /> <Star size={18} /></p>
                </div>
            </div>
            <h2 className="">Ver mais</h2>
            <p className="text-[#909090] text-xs">Encontre mais clínicas veterinárias fora da sua área</p>
          </main>
        </section>
      </main>
    );
  }