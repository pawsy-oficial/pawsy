import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";

export default function Tutor() {
  return (
    <main className="flex min-h-screen">
      <NavbarTutor />
      <section className="flex-1">
        <Header />
      </section>
    </main>
  );
}
