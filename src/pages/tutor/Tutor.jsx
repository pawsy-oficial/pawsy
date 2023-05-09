import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";

export default function Tutor() {
  return (
    <main className="flex min-h-screen">
      <NavbarTutor />
      <section className="flex-1">
        <Header />
        <div>
          <h1>ola</h1>
          {/* <FormNewPet isFirstAccess={false} /> */}
        </div>
      </section>
    </main>
  );
}
