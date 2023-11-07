import { DotsThreeVertical } from "@phosphor-icons/react"
import * as Popover from '@radix-ui/react-popover';

export default function CardSchedule({ deleteButton, logoVet, clinicName, scheduleDate, scheduleHour, scheduleType, vetName, petName}) {
    return (
        <div className={`flex relative gap-6 shadow-md rounded-lg p-3 sm:w-full ${!deleteButton && "cursor-pointer"} bg-[#f8fffc]`}>
            {
                deleteButton && (
                    <>
                        <Popover.Root>
                            <Popover.Trigger asChild className='group' aria-label="Informações do perfil">
                                <button className="absolute right-2 top-2">
                                    <DotsThreeVertical size={24} weight="bold" color="#000" />
                                </button>
                            </Popover.Trigger>
                            <Popover.Portal>
                                <Popover.Content>
                                    <button
                                        className="transition-all rounded-lg p-3 text-red-500 hover:bg-red-error-100 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
                                    >
                                        Apagar
                                    </button>
                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root>
                    </>

                )
            }
            <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={`${import.meta.env.VITE_URL}/files/${logoVet}`} alt={`Logo ${clinicName}`} className="object-cover w-full h-full" />
            </div>

            <div className="flex flex-col gap-3">
                <strong className="text-base text-start">{clinicName}</strong>
                <div className="flex flex-col gap-2 items-start">
                    <div className="flex gap-3 text-sm">
                        <span>{scheduleDate}</span>
                        <span className="font-bold">{scheduleHour}</span>
                    </div>
                    <span className="font-bold text-sm capitalize">{scheduleType}</span>

                    <p className="text-sm text-primary underline capitalize">{vetName}</p>
                    <p className="text-sm text-zinc-500 font-light capitalize">{petName}</p>
                </div>
            </div>
        </div>
    )
}

export function CardClinics({ clinica, onSelectClinic }) {
    const { Id, Nome, Imagem, Endereco } = clinica;

    return (
        <button
            className="flex relative gap-6 shadow-md rounded-lg p-3 sm:w-full bg-[#f8fffc]"
            onClick={() => onSelectClinic(Id)}
        >
            <div
                    className="min-w-[4rem] w-16 h-16 overflow-hidden rounded-full border border-primary"
            >     
                <img src={`${import.meta.env.VITE_URL}/files/${Imagem}`} alt={`Logo`} className="object-cover w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col gap-3">
                <strong className="text-base text-start">{Nome}</strong>
                <div className="flex flex-col gap-2 items-start">
                    <p className="text-sm">{Endereco}</p>
                </div>
            </div>
        </button>
    );
}