import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";
import "./wellbeing.css"

export default function WellBeing() {
    return (
      <main className="flex min-h-screen">
        <NavbarTutor />
        <section className="flex-1">
          <Header/>
          <main>
            <div id="rectangle">

            </div>
          </main>
        </section>
      </main>
    );
  }