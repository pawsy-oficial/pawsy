import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";

export default function Tutor(){
    return(
        <main className="flex min-h-screen">
            <NavbarClinic page={0}/>

            <section className="flex-1">
                <Header/>
                <main className="pl-10 pr-16 py-8 flex gap-5 justify-center items-center">
                    <h2>🚧 Em desenvolvimento 🚧</h2>
                </main>
            </section>
        </main>
    )
}