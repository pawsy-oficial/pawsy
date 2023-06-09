import { CaretLeft, NotePencil } from "@phosphor-icons/react";
import Cat from "../../../img/frajola.jpg"
import Tutor from "../../../img/tutor.jpg"
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export function PatientContainerSchedule({ alterPage }) {
    return (
        <>
            <button
                onClick={() => { alterPage(0) }}
                className="flex items-center text-zinc-500 gap-2">
                <CaretLeft />
                <span>Voltar</span>
            </button>

            <section className="rounded-lg overflow-hidden max-w-2xl mt-8">
                <header className="bg-primary py-2 px-6 flex justify-between text-white ">
                    <p className="text-base font-lato">12/06/2023</p>
                    <p className="text-base font-lato">Dr. Leonardo Nabio </p>
                    <p className="text-base font-lato">Fisioterapia</p>
                </header>
                <main className="p-6 flex items-center gap-6 bg-white relative">
                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <button className="absolute right-6 top-6">
                                <NotePencil  weight="bold" size={24} />
                            </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className="bg-primary/40  data-[state=open]:animate-overlayShow fixed inset-0" />
                            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                    Editar a consulta do paciente
                                </AlertDialog.Title>
                                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                                    
                                    <form action="">
                                        <div className="flex justify-between gap-2 mb-6">
                                            <label className="flex flex-col gap-2">
                                                <span>Nova data</span>
                                                <input type="text" className="border border-zinc-500 px-6  py-1 rounded-lg bg-[#F5FFFE] focus:border-primary"/>
                                            </label>
                                            <label className="flex flex-col gap-2">
                                                <span>Novo horário</span>
                                                <input type="text" className="border border-zinc-500 px-6  py-1 rounded-lg bg-[#F5FFFE] focus:border-primary"/>
                                            </label>
                                        </div>
                                        <label className="flex flex-col gap-2 ">
                                            <span>Motivo da alteração</span>
                                            <textarea 
                                                name="" id="" cols="30" rows="10"
                                                className="resize-none bg-[#F5FFFE] border border-zinc-500 rounded-lg focus:!border-primary outline-none p-3"    
                                            />
                                        </label>
                                    </form>

                                </AlertDialog.Description>
                                <div className="flex justify-end gap-[25px]">
                                    <AlertDialog.Cancel asChild>
                                        <button className="rounded-lg bg-red-500 text-white px-6 py-2">
                                            Cancelar
                                        </button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action asChild>
                                        <button className="rounded-lg bg-emerald-500 text-white px-6 py-2">
                                            Alterar
                                        </button>
                                    </AlertDialog.Action>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                    <div className="relative">
                        <div className="rounded-full border-2 border-primary w-28 h-28 overflow-hidden">
                            <img src={Cat} alt="" className="object-cover h-full w-full" />
                        </div>
                        <div className="rounded-full border-2 border-primary w-10 h-10 overflow-hidden absolute right-0 bottom-0">
                            <img src={Tutor} alt="" className="object-cover h-full w-full" />
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-2 font-lato text-base">
                                <p>Paciente:</p>
                                <span>Frajola</span>
                            </div>
                            <div className="flex gap-2 font-lato text-base">
                                <p>NIP:</p>
                                <span className="text-secundary underline">#0045</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-2 font-lato text-base">
                                <p>Tutor(a):</p>
                                <span>Emily Santos</span>
                            </div>
                            <div className="flex gap-2 font-lato text-base">
                                <p>Espécie:</p>
                                <span>Gato</span>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}