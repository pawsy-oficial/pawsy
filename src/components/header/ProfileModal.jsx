import * as Popover from '@radix-ui/react-popover';
import { CaretDown, Gear, SignOut, UserCircle } from '@phosphor-icons/react';
// import profilePerson from "../../img/profilePerson.jpeg"
import Cookies from 'js-cookie';
import axios from 'axios';
import { memo, useState } from 'react';

function ProfileModal({ userType }) {

    const [ img, setImg ] = useState("")
    let tutorToken
    let url

    if(userType == "tutor"){
        tutorToken = Cookies.get("jwtTokenTutor")
        url = `${import.meta.env.VITE_URL}/profileTutor`;
    }
    else if(userType == "clinica"){
        tutorToken = Cookies.get("jwtTokenClinic")
        url = `${import.meta.env.VITE_URL}/profileClinic`;
    }
    else if(userType == "medico"){
        tutorToken = Cookies.get("jwtTokenMedic")
        url = `${import.meta.env.VITE_URL}/profileMedic`;
    }


    const response = axios.get(url, {
        headers: {
            Authorization: `Bearer ${tutorToken}`
        }
    }).then(
        e => {
            setImg(e.data.storedImg)
        }
    ).catch(
        err => console.log(err)
    )

    const handleButtonClickSignOut = () => {
		const allCookies = Cookies.get();
		for (let cookie in allCookies) {
				Cookies.remove(cookie);
		}

		window.location.reload();
	};

    return (
        <Popover.Root>
            <Popover.Trigger 
                className='group' aria-label="Informações do perfil"
            >
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
                    className="rounded-lg py-3 z-[600] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
                    sideOffset={5}
                >
                    <ul className="flex flex-col gap-3">
                        {
                            userType == "tutor" && (
                                <li className='flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'>
                                    <UserCircle size={24} color="#22B77E" />
                                    <span>Perfil</span>
                                </li>
                            )
                        }
                        <li className='flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'>
                            <Gear size={24} color="#22B77E" />
                            <span>Configurações</span>
                        </li>
                        <li 
                            className='flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'
                            onClick={handleButtonClickSignOut}
                        >
                            <SignOut size={24} color="#22B77E" />
                            <span>Sair</span>
                        </li>
                    </ul>
                    <Popover.Arrow className='fill-white' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default memo(ProfileModal)