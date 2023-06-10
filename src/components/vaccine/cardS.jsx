import "./cardS.css";
import znvet from "../../img/znvet.jpg";

export function CardClinic() {
    return (
        <div className="bg-white p-3 rounded-lg min-w-[256px] flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <img src={znvet} alt="znvet" className="rounded-full w-14 h-14" />
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">ZNVet</h3>
                    <span className="text-xs text-[#409E44]">Aberto</span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="pt-2 text-base font-semibold">Vacinação gratuita contra raiva</p>
                <span className="text-sm">Todos os pets</span>
            </div>
        </div>
    );
}