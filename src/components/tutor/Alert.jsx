import * as HoverCard from '@radix-ui/react-hover-card';
import { WarningCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export function Alert(){
    const navigate = useNavigate()
    return(
        <>
            <HoverCard.Root openDelay={0}>
                <HoverCard.Trigger>
                    <WarningCircle size={24} className="fill-red-error" weight="bold"/>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content className="HoverCardContent" side='start' sideOffset={32}>
                        <div className='p-4 border-l-2 border-red-error bg-[#FFD0CB] w-[350px] rounded-r-lg flex flex-col gap-2'>
                            <p>Oreo está precisando de mais <strong>atenção!</strong></p>
                            <a 
                                onClick={()=>{navigate("/bem-estar")}} 
                                className='underline cursor-pointer'
                            >
                                Ver status de bem-estar
                            </a>  
                        </div>
                    <HoverCard.Arrow className="fill-red-error -left-2 rotate-90 absolute"/>
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </>
    )
}

export function WarningVaccine(){
    const navigate = useNavigate()
    return(
        <>
            <HoverCard.Root openDelay={0}>
                <HoverCard.Trigger>
                    <WarningCircle size={24} className="fill-red-error" weight="bold"/>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content className="HoverCardContent" side='start' sideOffset={32}>
                        <div className='p-4 border-red-error bg-[#FFE8C3] w-[350px] rounded-lg flex flex-col gap-2'>
                            <p><strong>Atenção!</strong></p>
                            <p>Seu animal de estimação ainda não recebeu a vacina Viratec 10 CVL obrigatória.</p>
                        </div>
                    <HoverCard.Arrow className="fill-red-error -left-2 rotate-90 absolute"/>
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </>
    )
}