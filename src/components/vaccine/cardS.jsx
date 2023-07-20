import znvet from "../../img/znvet.jpg";
import { memo } from "react";

function CardClinic() {
    return (
        <div className="bg-white p-3 rounded-lg w-full lg:min-w-[256px] flex flex-col gap-4">
            <div className="flex gap-3 items-center flex-col md:flex-row">
                <img src={znvet} alt="znvet" className="rounded-full md:w-14 md:h-14 h-16 w-16" />
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <h3 className="font-bold text-2xl">ZNVet</h3>
                    <span className="text-xs text-[#409E44]">Aberto</span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="pt-2 md:text-base text-xs font-semibold">Vacinação gratuita contra raiva</p>
                <span className="text-sm">Todos os pets</span>
            </div>
        </div>
    );
}

const memoCardClinic = memo(CardClinic)
export { memoCardClinic }