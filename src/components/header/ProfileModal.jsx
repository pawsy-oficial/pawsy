import * as Popover from '@radix-ui/react-popover';
import { CaretDown, Gear, SignOut, Trash, UserCircle } from '@phosphor-icons/react';
// import profilePerson from "../../img/profilePerson.jpeg"
import Cookies from 'js-cookie';
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function ProfileModal({ userType }) {
    const [showModal, setShowModal] = useState({
        show: false,
        type: null
    })
    const [img, setImg] = useState("")
    const [ info, setInfo ] = useState({
        name: "",
        lastName: "",
        street: "",
        city: "",
        cep: "",
        neighborhood: "",
        email: "",
        cpf: "",
        tell: ""
    })

    let tutorToken
    let url

    if (userType == "tutor") {
        tutorToken = Cookies.get("jwtTokenTutor")
        url = `${import.meta.env.VITE_URL}/profileTutor`;
    }
    else if (userType == "clinica") {
        tutorToken = Cookies.get("jwtTokenClinic")
        url = `${import.meta.env.VITE_URL}/profileClinic`;
    }
    else if (userType == "medico") {
        tutorToken = Cookies.get("jwtTokenMedic")
        url = `${import.meta.env.VITE_URL}/profileMedic`;
    }

    useEffect(() => {
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${tutorToken}`
            }
        }).then(
            e => {
                setInfo({
                    cep: e.data.CEP,
                    city: e.data.Cidade,
                    cpf: e.data.CPF ?? e.data.storedCRMVMedic,
                    email: e.data.storedEmailTutor ?? e.data.storedEmailMedic,
                    lastName: e.data.storedSBTutor, // falta medico
                    name: e.data.storedNameTutor ?? e.data.storedNameMedic,
                    neighborhood: e.data.Bairro,
                    street: e.data.Rua,
                    tell: e.data.storedCelTutor
                });
                setImg(e.data.storedImg)
            }
        ).catch(
            err => console.log(err)
        )
    }, [])

    const handleModalProfile = () => {
        setShowModal({
            show: true,
            type: userType
        })
    }

    const handleButtonClickSignOut = () => {
        const allCookies = Cookies.get();
        for (let cookie in allCookies) {
            Cookies.remove(cookie);
        }

        window.location.reload();
    };

    return (
        <>
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
                                (userType == "tutor" || userType == "medico") && (
                                    <li
                                        className=' px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'
                                    >
                                        <button
                                            className='flex gap-3 items-center w-full h-full'
                                            onClick={handleModalProfile}
                                        >
                                            <UserCircle size={24} color="#22B77E" />
                                            <span 
                                                className='text-sm'   
                                            >Perfil</span>
                                        </button>
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

            {
                showModal.show && (
                    document.body.style.overflow = "hidden",
                    ReactDOM.createPortal(
                        <section
                            className='fixed z-[300] inset-0 bg-primary/40 flex justify-center items-center'
                            onClick={e => {
                                e.target.localName == "section" && (
                                    document.body.style.overflow = "auto",
                                    setShowModal(!showModal)
                                )
                            }}
                        >
                            <main
                                className='flex gap-5 bg-white rounded-2xl w-1/2 max-w-2xl  overflow-hidden'
                            >
                                <article
                                    className='bg-emerald-50 py-8 flex flex-col justify-between'
                                >
                                    <div
                                        className='flex flex-col gap-1 items-center'
                                    >
                                        <div className="rounded-full w-32 h-32 overflow-hidden border-4 border-secundary">
                                            <img
                                                className="object-cover h-full w-full"
                                                src={`${import.meta.env.VITE_URL}/files/${img}`}
                                                alt="imagem de perfil @user"
                                                draggable={false}
                                            />
                                        </div>
                                        <strong className='capitalize'>
                                            {info.name}{" "}{info.lastName}
                                        </strong>
                                    </div>

                                    <button
                                        className='flex gap-2 w-full py-1 hover:bg-red-200 items-center px-4'
                                    >
                                        <Trash  color='#DC3545' weight='bold' />
                                        <span
                                            className='text-red-error font-semibold'
                                        >
                                            APAGAR CONTA
                                        </span>
                                    </button>
                                </article>

                                <article
                                    className='flex-1 py-8 pr-10 flex flex-col gap-10'
                                >
                                    <div>
                                        <h3
                                            className='text-zinc-900 font-bold mb-2'
                                        >
                                            Informações pessoais
                                        </h3>
                                        <ul
                                            className='flex flex-col gap-2'
                                        >
                                            <li>
                                                <label
                                                    className='flex flex-col gap-1'
                                                >
                                                    <span 
                                                        className='text-sm'   
                                                    >
                                                        {
                                                            userType == "tutor" ? "CPF" : "CRMV"
                                                        }
                                                    </span>
                                                    <input 
                                                        type="text"
                                                        value={info.cpf}
                                                        className='border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                        disabled
                                                    />
                                                </label>
                                            </li>
                                            <li>
                                                <label
                                                    className='flex flex-col gap-1'
                                                >
                                                    <span 
                                                        className='text-sm'   
                                                    >
                                                        Email
                                                    </span>
                                                    <input 
                                                        type="text"
                                                        value={info.email}
                                                        className='border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                        disabled
                                                    />
                                                </label>
                                            </li>
                                            <li>
                                                <label
                                                    className='flex flex-col gap-1'
                                                >
                                                    <span 
                                                        className='text-sm'   
                                                    >
                                                        Telefone
                                                    </span>
                                                    <input 
                                                        type="text"
                                                        value={info.tell}
                                                        className='border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                        disabled
                                                    />
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        userType == "tutor" && (
                                            <div>
                                                <h3
                                                    className='text-zinc-900 font-bold mb-2'
                                                >
                                                    Endereço
                                                </h3>
                                                <ul
                                                    className='flex flex-col gap-2'
                                                >
                                                    <li>
                                                        <label
                                                            className='flex flex-col gap-1'
                                                        >
                                                            <span 
                                                                className='text-sm'   
                                                            >
                                                                CEP
                                                            </span>
                                                            <input 
                                                                type="text"
                                                                value={info.cep}
                                                                className='border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                                disabled
                                                            />
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label
                                                            className='flex flex-col gap-1'
                                                        >
                                                            <span 
                                                                className='text-sm'   
                                                            >
                                                                Endereço
                                                            </span>
                                                            <input 
                                                                type="text"
                                                                value={info.street}
                                                                className='border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                                disabled
                                                            />
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label
                                                            className='flex flex-col gap-1'
                                                        >
                                                            <span 
                                                                className='text-sm'   
                                                            >
                                                                Cidade
                                                            </span>
                                                            <input 
                                                                type="text"
                                                                value={info.city}
                                                                className='border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                                disabled
                                                            />
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label
                                                            className='flex flex-col gap-1'
                                                        >
                                                            <span 
                                                                className='text-sm'   
                                                            >
                                                                Bairro
                                                            </span>
                                                            <input 
                                                                type="text"
                                                                value={info.neighborhood}
                                                                className='border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                                disabled
                                                            />
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </article>
                            </main>
                        </section>,
                        document.body
                    )
                )
            }
        </>
    )
}

export default memo(ProfileModal)