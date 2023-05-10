import * as HoverCard from '@radix-ui/react-hover-card';
import { WarningCircle } from '@phosphor-icons/react';

export function Alert(){
    return(
        <>
            <HoverCard.Root openDelay={0}>
                <HoverCard.Trigger>
                    <WarningCircle size={24} className="fill-red-error" weight="bold"/>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content className="HoverCardContent" side='start' sideOffset={32}>
                        <div className='p-4 border-l-2 border-red-error bg-red-error/50 w-[350px] rounded-lg flex flex-col gap-2'>
                            <strong>Atenção!</strong>
                            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque sed obcaecati maiores error veritatis facere, beatae tenetur doloremque eum corrupti. Atque ipsum ab ipsa? Beatae veniam omnis molestiae asperiores!</span>
                        </div>
                    <HoverCard.Arrow className="fill-red-error -left-2 rotate-90 absolute"/>
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </>
    )
}