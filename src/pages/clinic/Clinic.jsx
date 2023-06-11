import { Header } from "../../components/header/Header";
import { NavbarClinic } from "../../components/Navbar";

export default function Tutor(){
    return(
        <main className="flex min-h-screen">
            <NavbarClinic page={0}/>

            <section className="flex-1">
                <Header/>
                <main className="p-8">
                    <h1>dsa</h1>
                </main>
            </section>
        </main>
    )
}