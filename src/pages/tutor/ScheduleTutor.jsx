import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";

export default function ScheduleTutor() {
    return (
        <main className="flex min-h-screen">
            <NavbarTutor page={2} />
            <section className="flex-1">
                <Header />

                <main className="pl-10 pr-16 py-8 flex gap-5 justify-center items-center">
                    <h2>🚧 Em desenvolvimento 🚧</h2>
                </main>
            </section>
        </main>
    )
}
