import LogoWaterMark from "../../../img/waterMark.svg";
import { CardMedicines } from "../CardMedicines";

export function Revenues() {
  return (
    <div className="w-[595px] h-[892px] my-8 mx-auto bg-white border border-primary relative">
      <img
        src={LogoWaterMark}
        alt="marca d'água PAWSY"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex py-6 px-8 w-[593px] h-[132px] bg-[#F5FFFE] text-xs font-bold flex-col justify-between">
        <div className="flex justify-between">
          <div>Receituário comum</div>
          <div>Emitido em: 02/04/2023</div>
          <div>Valido até: 02/05/2023</div>
        </div>
        <div className="flex justify-between">
          <div className="text-zinc-900">
            Unidade: <span className="text-zinc-600 font-normal">ZN Vet</span>
          </div>
          <div className="text-zinc-900">
            Médico vet.:{" "}
            <span className="text-zinc-600 font-normal">Vanessa Santos</span>
          </div>
          <div className="text-zinc-900">
            CRMV:<span className="text-zinc-600 font-normal">10.000</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-zinc-900">
            Tutor: <span className="text-zinc-600 font-normal">Hale Silva</span>
          </div>
          <div className="text-zinc-900">
            PET: <span className="text-zinc-600 font-normal">Caramelo</span>
          </div>
          <div className="text-zinc-900">
            Idade: <span className="text-zinc-600 font-normal">5 anos</span>
          </div>
          <div className="text-zinc-900">
            Espécie: <span className="text-zinc-600 font-normal">Canina</span>
          </div>
          <div className="text-zinc-900">
            Sexo: <span className="text-zinc-600 font-normal">Macho</span>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-6 py-8 z-10">
        <CardMedicines />
        <CardMedicines />
      </section>

      <div className="w-44 h-[1px] my-20 mx-auto bg-black" />

      <div className="w-[595px] h-8 bg-primary flex justify-center items-center absolute bottom-0">
        <img src="src/img/logo.png" alt="" className="w-16" />
      </div>
    </div>
  );
}
