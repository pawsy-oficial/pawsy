import "./cardS.css";
import znvet from "../../img/znvet.jpg";

export function CardClinic() {
    return (
        <main className=" pr-6">
            <section className="bg-white p-3 rounded-lg max-w-xs">
                <div className="flex gap-2 items-center">
                    <img src={znvet} alt="znvet" className="rounded-full w-14 h-14" />
                    <div>
                        <h3 className="font-bold text-2xl">ZNVet</h3>
                        <span className="block text-green-500">Aberto</span>
                    </div>
                </div>
                <p className="pt-2 vaccineFree">Vacinação gratuita contra raiva</p>
                <span className="text-sm">Todos os pets</span>
            </section>
        </main>
    );
}