import Calendar from "../../components/calendar/Calendar";
import ContainerSchedule from "../../components/containerSchedule/ContainerSchedule";
import { NavbarClinic } from "../../components/Navbar";

export default function Schedule() {
    return (
        <main className="layout-main">
            <NavbarClinic page={0} />

            <section className="flex-1 py-8 pr-8">
                <div className="flex gap-5">
                    <section className="flex-1 max-w-5xl">
                        <h2 className="font-bold text-[32px]">1 - 10 de abril de 2023</h2>

                        <ContainerSchedule date={"2023-04-01"}/>
                        <ContainerSchedule date={"2023-04-02"}/>
                        <ContainerSchedule date={"2023-04-05"}/>
                    </section>
                    <article className="w-96 bg-red-400">
                        <h2>1 - 10 de abril de 2023</h2>

                        <Calendar/>
                    </article>
                </div>
            </section>
        </main>
    )
}