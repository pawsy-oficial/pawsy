import { NavbarTutor } from "../../components/Navbar";
import { Header } from "../../components/header/Header";
import "./vaccine.css";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";

export default function VaccinePage() {
  const pets = ["Caramelo", "Oreo", "Flor", "Pantera"];
  const [namePet, setNamePet] = useState("Selecione o pet");

  return (
    <main className="flex min-h-screen">
      <NavbarTutor />
      <section className="flex-1">
        <Header />
        <main className="pl-10 pr-16 py-8 flex flex-col gap-5">
          <Select.Root value={namePet} onValueChange={setNamePet}>
            <Select.Trigger
              className="w-fit inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
              aria-label="Food"
            >
              <Select.Value className="font-sora" aria-label={namePet}>
                {namePet}
              </Select.Value>
              <Select.Icon className="text-violet11">
                {/* <ChevronDownIcon /> */}
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <Select.Viewport className="p-[5px]">
                  <Select.Group>
                    <Select.Label></Select.Label>
                    {pets.map((name) => {
                      return (
                        <Select.Item value={`${name}`}>
                          <Select.ItemText>{name}</Select.ItemText>
                        </Select.Item>
                      );
                    })}
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <section className="flex flex-1 bg-white px-6 py-8 rounded-2xl">
            <div className="w-full flex justify-between">
              <table>
                <thead>
                  <tr className=" border-b border-black">
                    <th className=" bg-primary text-white text-sm w-40 p-2">
                      Vacina
                    </th>
                    <th className=" p-2 bg-primary text-white text-sm w-40">
                      Data de aplicação
                    </th>
                    <th className=" p-2 bg-primary text-white text-sm w-40">
                      Retorno
                    </th>
                    <th className=" p-2 bg-primary text-white text-sm w-40">
                      Veterinário
                    </th>
                  </tr>
                </thead>
                <tbody className="second">
                  <tr className="border-b border-black">
                    <td className="">Indiana</td>
                    <td className="">Indianapolis</td>
                    <td className="">Indianapolis</td>
                    <td className="">Indianapolis</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="">Ohio</td>
                    <td className="">Columbus</td>
                    <td className="">Indianapolis</td>
                    <td className="">Indianapolis</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="">Michigan</td>
                    <td className="">Detroit</td>
                    <td className="">Indianapolis</td>
                    <td className="">Indianapolis</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr className=" border-b border-black">
                    <th className=" bg-primary text-white text-sm w-40 p-2">
                      Data
                    </th>
                    <th className=" bg-primary text-white text-sm w-40 p-2">
                      Nome
                    </th>
                  </tr>
                </thead>
                <tbody className="second">
                  <tr className="border-b border-black">
                    <td>Indiana</td>
                    <td>Indianapolis</td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </section>
        </main>
      </section>
    </main>
  );
}
