import ClientsPerfil, { Avaliation, VaccinePets } from "../../components/cardPerfil/CardPerfil";
import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";

export default function Perfil() {
    return (
        <main className="flex min-h-screen">
            <NavbarClinic page={3} />
            <section className="flex-1">
                <Header />
                <main className="pl-10 pr-16 py-8 flex gap-5">
                   <div className="flex gap-5">
                        <ClientsPerfil/>
                        <VaccinePets/>
                        <Avaliation/>
                    </div>
                </main>
            </section>
        </main>
    )
}