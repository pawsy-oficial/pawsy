import * as Popover from "@radix-ui/react-popover";
import { Bell } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function Notification(){
    const [notifify, setNotify] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotify(true);
        }, 10000);
        return () => {
          clearTimeout(timer);
        };
    }, [notifify]);
    return(
        <Popover.Root>
            <Popover.Trigger 
                className={`group relative ${notifify && "new-notifify"}`}
                onClick={()=>{
                    setNotify(false)
                }}
            >
                <Bell size={24} weight="bold" className="group-data-[state=open]:fill-primary group-data-[state=open]:rotate-12 transition-all"/>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className="rounded-lg w-[350px] max-h-96 flex flex-col p-6 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
                    sideOffset={5}
                >
                    <div className="max-h-full overflow-y-auto">
                        <ul className="h-full">
                            <li className="py-2">
                                <h3 className="font-bold text-base">
                                    Campanha de vacinação próxima de você</h3>
                                <p className="text-zinc-700 text-xs">
                                    Não esqueça que a campanha de vacinação está chegando à sua região! Confira as datas e locais disponíveis na plataforma e proteja seu(s) pet(S).
                                </p>
                            </li>
                            <hr />
                            <li className="py-2">
                                <h3 className="font-bold text-base">
                                    Promoção de clínica veterinária
                                </h3>
                                <p className="text-zinc-700 text-xs">
                                    A clínica X está oferecendo descontos especiais em consultas e serviços de saúde animal esta semana! Não perca a oportunidade de cuidar do seu pet com a melhor qualidade.
                                </p>
                            </li>
                            <hr />
                            <li className="py-2">
                                <h3 className="font-bold text-base">
                                    Lembrete de vacinação    
                                </h3>
                                <p className="text-zinc-700 text-xs">
                                    A vacinação do seu pet está próxima de vencer. Agende uma consulta com o veterinário para garantir a saúde do seu pet. Acesse a área "carteira de vacinação" para conferir as datas de vacinação e agendar uma consulta.
                                </p>
                            </li>
                            <li className="py-2">
                                <h3 className="font-bold text-base">
                                    Alerta de pulgas e carrapatos   
                                </h3>
                                <p className="text-zinc-700 text-xs">
                                    As pulgas e carrapatos são um risco para a saúde do seu pet. Certifique-se de manter seu animal de estimação protegido com medicamentos preventivos.
                                </p>
                            </li>
                            
                        </ul>
                    </div>
                    <Popover.Arrow className="fill-white"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}