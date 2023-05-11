import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import "./index.css"

export default function VetCloser() {
    return (
      <main className="flex min-h-screen">
        <NavbarTutor />
        <section className="flex-1">
          <Header/>
          <main>
            <h1>Veterinário mais próximo de você:</h1>
          </main>
        </section>
      </main>
    );
  }
  