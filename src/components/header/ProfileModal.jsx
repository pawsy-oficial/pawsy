import * as Popover from '@radix-ui/react-popover';
import { CaretDown, Gear, Pen, SignOut, Trash, UserCircle, XCircle } from '@phosphor-icons/react';
// import profilePerson from "../../img/profilePerson.jpeg"
import Cookies from 'js-cookie';
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import FormsAddresProfile from '../forms/FormsAddres';
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';

function ProfileModal({ userType }) {
    const [showModal, setShowModal] = useState({
        show: false,
        type: null
    })
    const [info, setInfo] = useState({
        name: "",
        lastName: "",
        street: "",
        city: "",
        cep: "",
        neighborhood: "",
        email: "",
        cpf: "",
        tell: "",
        image: ""
    })
    const [edit, setEdit] = useState(false)
    const [editProfile, setEditProfile] = useState(true)

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
                    idTutor: e.data.storedIdTutor ?? e.data.storedIdMedic,
                    cep: e.data.CEP,
                    city: e.data.Cidade,
                    cpf: e.data.storedCPF ?? e.data.storedCRMVMedic,
                    email: e.data.storedEmailTutor ?? e.data.storedEmailMedic,
                    lastName: e.data.storedSBTutor, // falta medico
                    name: e.data.storedNameTutor ?? e.data.storedNameMedic,
                    neighborhood: e.data.Bairro,
                    state: e.data.Estado,
                    numberHome: e.data.Numero,
                    complement: e.data.Complemento,
                    street: e.data.Rua,
                    tell: e.data.storedCelTutor,
                    image: e.data.storedImg,
                    typeUser: e.data.storedType
                });
            }
        ).catch(
            err => console.log(err)
        )
    }, [edit, editProfile])

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
                                src={`${import.meta.env.VITE_URL}/files/${info.image}`}
                                alt={`imagem de perfil @${info.name}`}
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
                        <ModalProfile
                            info={info}
                            userType={userType}
                            setShowModal={setShowModal}
                            showModal={showModal}
                            editAddress={edit}
                            setEditAddress={setEdit}
                            token={tutorToken}
                            edit={editProfile}
                            setEdit={setEditProfile}
                        />,
                        document.body
                    )
                )
            }
        </>
    )
}

const schemaNameUser = Yup.object({
    name: Yup.string().required("campo obrigatório").min(2, "minimo 2 caracteres").max(24, "limite atingido"),
    lastName: Yup.string().required("campo obrigatório").min(2, "minimo 2 caracteres").max(24, "limite atingido")
})

function ModalProfile({ info, userType, setShowModal, showModal, setEditAddress, editAddress, token, edit, setEdit }) {
    const [select, setSelect] = useState("")
    

    const typeOptons = [
        {
            option: "profile",
            titleName: "Perfil"
        },
        {
            option: "security",
            titleName: "Segurança"
        }
    ]

    function SelectOption() {
        switch (select) {
            case "profile":
                return <InfoProfile
                    info={info}
                    userType={userType}
                    edit={editAddress}
                    setEdit={setEditAddress}
                />
            case "security":
                return <div>
                    <SecurityProfile />
                </div>
            default:
                return <InfoProfile
                    info={info}
                    userType={userType}
                    edit={editAddress}
                    setEdit={setEditAddress}
                />
        }
    }

    function handleDeleteAcount() {
        console.log("Deletar conta");
    }

    // form

    const [lastName, setLastName] = useState(info.lastName)
    const [name, setName] = useState(info.name)

    const { handleSubmit, register, formState } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schemaNameUser)
    })

    const { errors } = formState

    const [p, setP] = useState(false)
    const onSubmit = (data) => {
        if(p) {
            if(info.typeUser == "Tutor"){
                data.idTutor = info.idTutor
                data.urlImage = "2131321_pawsy_12313.png"
                
                axios.put(`${import.meta.env.VITE_URL}/tutor`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    console.log(res, data);
                    setEdit(!edit)
                    setP(!p)
                }).catch(err => console.log(err))
            }
            else if(info.typeUser == "Medico"){
                data.idTutor = info.idTutor
                data.urlImage = "2131321_pawsy_12313.png"
                console.log(data);

                setEdit(!edit)
                setP(!p)
            }

        }
    }

    return (
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
                className='flex gap-5 bg-white rounded-2xl w-1/2 max-w-2xl min-h-[400px] overflow-hidden'
            >
                <article
                    className='bg-emerald-50 py-8 flex flex-col justify-between max-w-[180px]'
                >
                    <div
                        className='flex flex-col gap-8'
                    >
                        <form
                            className='flex flex-col gap-1 items-center'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {
                                !edit
                                    ? (
                                        <>
                                            <div className="rounded-full w-32 h-32 overflow-hidden border-4 border-secundary">
                                                <img
                                                    className="object-cover h-full w-full"
                                                    src={`${import.meta.env.VITE_URL}/files/${info.image}`}
                                                    alt="imagem de perfil @user"
                                                    draggable={false}
                                                />
                                            </div>
                                            <div
                                                className='flex flex-col gap-1'
                                            >
                                                <input
                                                    className='border border-primary rounded-lg px-2 py-1 max-w-[120px] mx-auto'
                                                    type="text"
                                                    value={name}
                                                    {...register("name", {
                                                        onChange: e => setName(e.target.value)
                                                    })}
                                                />
                                                {
                                                    errors.name && (
                                                        <span className='capitalize' >{errors.name.message}</span>
                                                    )
                                                }
                                                <input
                                                    className='border border-primary rounded-lg px-2 py-1 max-w-[120px] mx-auto'
                                                    type="text"
                                                    value={lastName}
                                                    {...register("lastName", {
                                                        onChange: e => setLastName(e.target.value)
                                                    })}
                                                />
                                                {
                                                    errors.lastName && (
                                                        <span className='capitalize'>{errors.lastName.message}</span>
                                                    )
                                                }
                                            </div>
                                        </>
                                    )
                                    : (
                                        <>
                                            <div className="rounded-full w-32 h-32 overflow-hidden border-4 border-secundary">
                                                <img
                                                    className="object-cover h-full w-full"
                                                    src={`${import.meta.env.VITE_URL}/files/${info.image}`}
                                                    alt="imagem de perfil @user"
                                                    draggable={false}
                                                />
                                            </div>
                                            <strong className='capitalize w-full text-limit px-4 text-center'>
                                                {info.name}{" "}{info.lastName}
                                            </strong>
                                        </>
                                    )
                            }
                            {
                                edit
                                    ? (
                                        <button
                                            className='p-1 rounded-lg bg-primary text-white flex gap-2 items-center text-sm h-fit transition-all duration-1000'
                                            type={"button"}
                                            onClick={() => {
                                                edit && setEdit(!edit)
                                            }}
                                        >
                                            <Pen size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            className='p-1 rounded-lg bg-primary text-white flex gap-2 items-center text-sm h-fit transition-all duration-1000'
                                            type={"subimit"}
                                            onClick={() => setP(!p)}
                                        >
                                            <Pen size={16} /> Confirmar
                                        </button>
                                    )
                            }
                        </form>

                        <ul
                            className='flex flex-col gap-3'
                        >
                            {
                                typeOptons.map(op => {
                                    return (
                                        <li
                                            className='w-full'
                                        >
                                            <button
                                                className={`px-4 py-1 w-full text-start`}
                                                onClick={() => setSelect(op.option)}
                                            >
                                                {
                                                    op.titleName
                                                }
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <button
                        className='flex gap-2 w-full py-1 hover:bg-red-200 items-center px-4'
                        onClick={handleDeleteAcount}
                    >
                        <Trash color='#DC3545' weight='bold' size={16} />
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
                    <SelectOption />

                </article>
            </main>
        </section>
    )
}

function InfoProfile({ info, userType, edit, setEdit }) {

    return (
        <>
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
                    <>
                        {
                            edit
                                ? <FormsAddresProfile
                                    edit={edit}
                                    setEdit={setEdit}
                                    info={info}
                                />
                                : (
                                    <section>
                                        <div
                                            className='flex gap-2 items-center mb-2'
                                        >
                                            <h3
                                                className='text-zinc-900 font-bold'
                                            >
                                                Endereço
                                            </h3>
                                            <button
                                                className='p-1 rounded-lg bg-primary text-white flex gap-2 items-center text-sm h-fit transition-all duration-1000'
                                                onClick={() => setEdit(!edit)}
                                                type='submit'
                                            >
                                                <Pen size={16} />
                                                {
                                                    edit && "Confirmar"
                                                }
                                            </button>
                                        </div>

                                        <div
                                            className='flex gap-8 mt-4'
                                        >

                                            <label
                                                className='flex flex-col gap-1 w-full'
                                            >
                                                <span
                                                    className='text-sm'
                                                >
                                                    CEP
                                                </span>
                                                <input
                                                    type="text"
                                                    value={info.cep}
                                                    className='w-full border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                    disabled
                                                />
                                            </label>
                                            <label
                                                className='flex flex-col gap-1 w-full'
                                            >
                                                <span
                                                    className='text-sm'
                                                >
                                                    Cidade
                                                </span>
                                                <input
                                                    type="text"
                                                    value={info.city}
                                                    className='w-full border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                    disabled
                                                />
                                            </label>
                                            <label
                                                className='w-full flex flex-col gap-1'
                                            >
                                                <span
                                                    className='text-sm'
                                                >
                                                    Estado
                                                </span>
                                                <input
                                                    type="text"
                                                    value={info.state}
                                                    className='w-full border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                    disabled
                                                />
                                            </label>
                                        </div>
                                        <div
                                            className='flex gap-8 mt-4'
                                        >
                                            <label
                                                className='flex flex-col gap-1 w-full'
                                            >
                                                <span
                                                    className='text-sm'
                                                >
                                                    Endereço
                                                </span>
                                                <input
                                                    type="text"
                                                    value={info.street}
                                                    className='w-full border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                    disabled
                                                />
                                            </label>
                                            <label
                                                className='flex flex-col gap-1 w-40'
                                            >
                                                <span
                                                    className='text-sm'
                                                >
                                                    Número
                                                </span>
                                                <input
                                                    type="text"
                                                    value={info.numberHome}
                                                    className='w-full border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                    disabled
                                                />
                                            </label>
                                        </div>
                                        <div
                                            className='flex gap-8 mt-4'
                                        >

                                            <label
                                                className='flex flex-col gap-1 w-full'
                                            >
                                                <span
                                                    className='text-sm'
                                                >
                                                    Complemento
                                                </span>
                                                <input
                                                    type="text"
                                                    value={info.complement}
                                                    className='w-full border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                    disabled
                                                />
                                            </label>
                                            <label
                                                className='w-full flex flex-col gap-1'
                                            >
                                                <span
                                                    className='text-sm'
                                                >
                                                    Bairro
                                                </span>
                                                <input
                                                    type="text"
                                                    value={info.neighborhood}
                                                    className='w-full border border-primary px-4 py-2 disabled:cursor-not-allowed text-zinc-800 rounded'
                                                    disabled
                                                />
                                            </label>
                                        </div>
                                    </section>
                                )
                        }
                    </>

                )
            }
        </>
    )
}

function SecurityProfile() {
    const { register, handleSubmit } = useForm({
        mode: "onSubmit"
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <h3
                className='text-zinc-900 font-bold mb-2'
            >
                Trocar senha
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
                            Senha atual
                        </span>
                        <input
                            type="password"
                            className='border border-primary px-4 py-2 text-zinc-800 rounded'
                            {...register("currentPass")}
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
                            Nova senha
                        </span>
                        <input
                            type="password"
                            className='border border-primary px-4 py-2 text-zinc-800 rounded'
                            {...register("newPass")}
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
                            Confirmar nova senha
                        </span>
                        <input
                            type="password"
                            className='border border-primary px-4 py-2 text-zinc-800 rounded'
                            {...register("confirmNewPass")}
                        />
                    </label>
                </li>
            </ul>

            <div
                className='w-full flex justify-end mt-8'
            >
                <button
                    type="submit"
                    className='py-1 px-4 bg-primary hover:bg-primary/80 rounded-lg text-white font-bold'
                >
                    Alterar
                </button>
            </div>
        </form>
    )
}

export default memo(ProfileModal)