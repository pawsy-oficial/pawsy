import * as Popover from '@radix-ui/react-popover';
import { CaretDown, Gear, Lock, UserCircle } from '@phosphor-icons/react';
import profilePerson from "../../img/profilePerson.jpeg"
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';

export default function ProfileModal({ userType }) {

    const [ img, setImg ] = useState("")

    const tutorToken = Cookies.get('jwtTokenTutor');
    const url = `${import.meta.env.VITE_URL}/profileTutor`;

    const response = axios.get(url, {
        headers: {
            Authorization: `Bearer ${tutorToken}`
        }
    }).then(e => setImg(e.data.storedImg))

    return (
        <Popover.Root>
            <Popover.Trigger className='group' aria-label="Informações do perfil">
                <div className='flex items-center gap-3'>
                    <div className="rounded-full w-10 h-10 overflow-hidden border-2 border-primary">
                        <img
                            className="object-cover h-full w-full"
                            src={`${import.meta.env.VITE_URL}/files/${img}`}
                            alt="imagem de perfil @user"
                            draggable={false}
                        />
                    </div>
                    <CaretDown size={16} className='hidden md:block group-data-[state=open]:-rotate-180 transition-all' />
                </div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="rounded-lg py-3 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
                    sideOffset={5}
                >
                    <ul className="flex flex-col gap-3">
                        <li className='flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'>
                            <UserCircle size={24} color="#22B77E" />
                            <span>Perfil</span>
                        </li>
                        <li className='flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'>
                            <Lock size={24} color="#22B77E" />
                            <span>Segurança</span>
                        </li>
                        <li className='flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'>
                            <Gear size={24} color="#22B77E" />
                            <span>Configurações</span>
                        </li>
                    </ul>
                    <Popover.Arrow className='fill-white' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}