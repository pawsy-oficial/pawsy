import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";

export default function Revenues() {
    return (
      <main className="flex min-h-screen">
        <NavbarTutor />
        <section className="flex-1">
          <Header/>
          <main>
            <h1>Receitas médicas do</h1>
          </main>
        </section>
      </main>
    );
  }