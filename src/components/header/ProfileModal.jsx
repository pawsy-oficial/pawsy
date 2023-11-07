import * as Popover from '@radix-ui/react-popover';
import { Camera, CaretDown, CheckCircle, CloudSlash, Gear, Pen, SignOut, Trash, UserCircle, Warning, XCircle } from '@phosphor-icons/react';
// import profilePerson from "../../img/profilePerson.jpeg"
import Cookies from 'js-cookie';
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import FormsAddresProfile from '../forms/FormsAddres';
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonSignOut from '../buttons/ButtonSignOut';

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
                    idTutor: e.data.storedIdTutor ?? e.data.storedIdMedic ?? e.data.storedIdClinica,
                    cep: e.data.CEP,
                    city: e.data.Cidade,
                    cpf: e.data.storedCPF ?? e.data.storedCRMVMedic,
                    email: e.data.storedEmailTutor ?? e.data.storedEmailMedic,
                    lastName: e.data.storedSBTutor ?? e.data.storedLastName,
                    name: e.data.storedNameTutor ?? e.data.storedNameMedic ?? e.data.storedNameClinica,
                    neighborhood: e.data.Bairro,
                    state: e.data.Estado,
                    numberHome: e.data.Numero,
                    complement: e.data.Complemento,
                    street: e.data.Rua,
                    tell: e.data.storedCelTutor ?? e.data.storedCel,
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
                            {/* {
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
                                            >
                                                Perfil
                                            </span>
                                        </button>
                                    </li>
                                )
                            } */}
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
                                    >
                                        Perfil
                                    </span>
                                </button>
                            </li>
                            {/* <li className='flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all'>
                                <Gear size={24} color="#22B77E" />
                                <span>Configurações</span>
                            </li> */}
                            <li
                                className='flex gap-3 items-center cursor-pointer hover:bg-primary/10 transition-all'
                            >
                                <ButtonSignOut/>
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
const schemaSecurity = Yup.object({
    confirmNewPass: Yup.string().required("Campo obrigatório").oneOf([Yup.ref('newPass'), null], 'As senhas devem ser iguais').min(8, "Minimo 8 caracteres"),
    newPass: Yup.string().required("Campo obrigatório").min(8, "Minimo 8 caracteres"),
    currentPass: Yup.string().required("Campo obrigatório")
})

function ModalProfile({ info, userType, setShowModal, showModal, setEditAddress, editAddress, token, edit, setEdit }) {
    const [select, setSelect] = useState("")
    const [showModalAlert, setShowModalAlert] = useState(false)

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
                    setShowModalAlert={setShowModalAlert}
                />
            case "security":
                return <div>
                    <SecurityProfile
                        info={info}
                        userType={userType}
                        setShowModalAlert={setShowModalAlert}
                    />
                </div>
            default:
                return <InfoProfile
                    info={info}
                    userType={userType}
                    edit={editAddress}
                    setEdit={setEditAddress}
                    setShowModalAlert={setShowModalAlert}
                />
        }
    }

    function handleDeleteAcount() {
        if (info.typeUser == "Tutor") {
            axios.delete(`${import.meta.env.VITE_URL}/tutor/${info.idTutor}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);

                Cookies.remove("jwtTokenTutor")
                window.location.reload()
            })
                .catch(err => console.log(err))
        }
        else if (info.typeUser == "Medico") {
            axios.delete(`${import.meta.env.VITE_URL}/medic/${info.idTutor}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);

                Cookies.remove("jwtTokenMedic")
                window.location.reload()
            })
                .catch(err => console.log(err))
        }
        else if (info.typeUser == "Clinica") {
            axios.delete(`${import.meta.env.VITE_URL}/clinic/${info.idTutor}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);

                Cookies.remove("jwtTokenClinic")
                window.location.reload()
            })
                .catch(err => console.log(err))
        }



    }

    // form

    const [lastName, setLastName] = useState(info.lastName)
    const [name, setName] = useState(info.name)
    const [selectImage, setSelectImage] = useState(null)
    const [urlImage, setUrlImage] = useState(null)

    const { handleSubmit, register, formState, control } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schemaNameUser)
    })

    const { errors } = formState

    const [p, setP] = useState(false)
    const onSubmit = (data) => {
        if (p) {
            const currentTime = new Date().getTime()
            let nameFile
            (selectImage) ? nameFile = `${currentTime}_pawsy_${selectImage.name}` : nameFile = info.image
            data.urlImage = nameFile

            if (info.typeUser == "Tutor") {
                data.idTutor = info.idTutor

                axios.put(`${import.meta.env.VITE_URL}/tutor`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    // console.log(res, data);
                    selectImage
                        ? uploadImage(nameFile, selectImage)
                        : (
                            setEdit(!edit),
                            setP(!p)
                        )
                }).catch(err => console.log(err))
            }
            else if (info.typeUser == "Medico") {
                data.idMedic = info.idTutor
                // console.log(data);

                axios.put(`${import.meta.env.VITE_URL}/medic`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    selectImage
                        ? uploadImage(nameFile, selectImage)
                        : (
                            setEdit(!edit),
                            setP(!p)
                        )
                })
                    .catch(err => console.log(err))

            }

        }
    }

    // section image


    useEffect(() => {
        if (selectImage) {
            if (selectImage.size > 5242880 || selectImage.type != "image/png" && selectImage.type != "image/jpg" && selectImage.type != "image/jpeg") {
                console.log("A imagem não atende os requisitos ");
            }
            else {
                setUrlImage(URL.createObjectURL(selectImage))
            }
        }
    }, [selectImage])

    function uploadImage(nameFile, selectImage) {
        let form = new FormData();
        form.append("name", nameFile)
        form.append('file', selectImage, selectImage.name)
        axios.post(`${import.meta.env.VITE_URL}/upload-files`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                // loading(false)
                setEdit(!edit)
                setP(!p)
            }).catch(err => {
                console.error(err)
            })
    }
    // end section image

    return (
        <>
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
                        className='bg-emerald-50 py-8 px-2 flex flex-col justify-between max-w-[180px]'
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
                                                    <label
                                                        className={`w-full h-full relative sm:w-40 group sm:h-40 overflow-hidden bg-primary/20 cursor-pointer`}
                                                    >
                                                        <img
                                                            src={urlImage ? urlImage : `${import.meta.env.VITE_URL}/files/${info.image}`}
                                                            alt={`imagem de perfil @${name}`}
                                                            className="h-full w-full object-cover group-hover:brightness-50 transition-all"
                                                            draggable={false}
                                                        />
                                                        <Controller
                                                            name="urlImage"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input
                                                                    type="file"
                                                                    multiple={false}
                                                                    className="hidden"
                                                                    onChange={event => {
                                                                        field.onChange(event.target.files[0]);
                                                                        setSelectImage(event.target.files[0]);
                                                                    }}
                                                                    accept="image/png, image/jpg, image/jpeg"
                                                                />
                                                            )}
                                                        />
                                                        <Camera
                                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-all"
                                                            color="#ffffff"
                                                            size={32}
                                                        />
                                                    </label>
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
                                                        alt={`imagem de perfil @${name}`}
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
                                    userType != "clinica" && (
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
                                    )
                                }
                            </form>

                            <ul
                                className='flex flex-col gap-3'
                            >
                                {
                                    userType != "clinica"
                                    && (
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
                                    )
                                }
                            </ul>
                        </div>

                    </article>

                    <article
                        className='flex-1 py-8 pr-10 flex flex-col gap-10'
                    >
                        {
                            userType == "clinica" ? <SecurityProfile info={info} userType={userType} setShowModalAlert={setShowModalAlert} /> : <SelectOption />
                        }

                    </article>
                </main>
            </section>

            {
                showModalAlert && ReactDOM.createPortal(
                    <section
                        className='fixed inset-0 bg-red-error/60 z-[800] flex justify-center items-center backdrop-blur-sm'
                    >
                        <main
                            className='flex flex-col items-center gap-5 bg-white rounded-2xl w-1/2 max-w-2xl p-6'
                        >
                            <div
                                className='flex flex-col items-center'
                            >
                                <Warning color='#dc3545' size={64} />
                                <h2
                                    className='font-bold text-3xl'
                                >
                                    Atenção!
                                </h2>
                            </div>
                            <p
                                className='text-center'
                            >
                                Você está prestes a desativar a sua conta. Ao fazer isso, você não poderá mais acessar os seus dados, mensagens, contatos e serviços associados a esta conta. Tem certeza de que deseja continuar?
                            </p>


                            <div
                                className='flex gap-6 justify-center'
                            >
                                <button
                                    className='bg-primary rounded-lg text-white font-bold px-4 py-1'
                                    onClick={() => setShowModalAlert(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className='border-2 border-red-error rounded-lg text-red-error font-bold px-4 py-1 hover:bg-red-error hover:text-white'
                                    onClick={handleDeleteAcount}
                                >
                                    Desativar
                                </button>
                            </div>
                        </main>
                    </section>,
                    document.body
                )
            }
        </>
    )
}

function InfoProfile({ info, userType, edit, setEdit, setShowModalAlert }) {

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
            <ul
                className='w-full'
            >
                <li
                    className=''
                >
                    <button
                        className='flex gap-2 items-center'
                        onClick={() => setShowModalAlert(true)}
                    >
                        <CloudSlash color='#DC3545' weight='bold' size={16} />
                        <span
                            className='text-red-error font-semibold'
                        >
                            DESATIVAR CONTA
                        </span>
                    </button>
                </li>
            </ul>
        </>
    )
}

function SecurityProfile({ info, userType, setShowModalAlert }) {
    const [ msgError, setMsgError ] = useState("")
    const [ showModalSuccess, setShowModalSuccess ] = useState(false)

    const { register, handleSubmit, formState } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schemaSecurity)
    })

    const { errors } = formState

    const onSubmit = (data) => {
        data["id"] = info.idTutor
        console.log(data);
        axios.put(`${import.meta.env.VITE_URL}/password?userType=${userType}`, data)
        .then(res => {
            setShowModalSuccess(true)
        })
        .catch(err => {
            setMsgError(err.response.data.message)
        
        })
    }

    return (
        <>
            {
                showModalSuccess && ReactDOM.createPortal(
                    <main
                        className='fixed inset-0 bg-primary/40 backdrop-blur-sm flex justify-center items-center z-[900]'
                    >
                        <div
                            className='bg-white rounded-md p-4 flex flex-col items-center max-w-lg gap-3'
                        >
                            <CheckCircle size={64} color='#22B77E' weight='bold' />
                            <p
                                className='text-zinc-600 leading-relaxed text-center'
                            >
                                Para confirmar a alteração da sua senha, precisamos encerrar a sua seção atual. Por favor, faça o login novamente com a sua nova senha.
                            </p>

                            <button 
                                type="button"
                                className='bg-red-error py-1 px-6 rounded-lg text-white font-bold'
                                onClick={()=>{
                                    Cookies.remove("jwtTokenClinic") ?? Cookies.remove("jwtTokenMedic") ?? Cookies.remove("jwtTokenTutor")
                                    window.location.reload()
                                }}
                            >
                                Sair
                            </button>
                        </div>
                    </main>, document.body
                )
            }
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3
                    className='text-zinc-900 font-bold mb-2'
                >
                    Trocar senha
                </h3>
                {
                    msgError && (
                        <span 
                            className='text-red-error text-sm flex items-center gap-1'
                        >
                            <XCircle size={18} />
                            {msgError}
                        </span>
                    )
                }
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
                            {
                                errors.currentPass && <span className='text-red-error text-sm flex items-center gap-1'><XCircle size={18} />{errors.currentPass.message}</span>
                            }
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
                            {
                                errors.newPass && <span className='text-red-error text-sm flex items-center gap-1'><XCircle size={18} />{errors.newPass.message}</span>
                            }

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
                            {
                                errors.confirmNewPass && <span className='text-red-error text-sm flex items-center gap-1'><XCircle size={18} />{errors.confirmNewPass.message}</span>
                            }
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
            {
                userType == "clinica" && (
                    <ul
                        className='w-full'
                    >
                        <li
                            className=''
                        >
                            <button
                                className='flex gap-2 items-center'
                                onClick={() => setShowModalAlert(true)}
                            >
                                <CloudSlash color='#DC3545' weight='bold' size={16} />
                                <span
                                    className='text-red-error font-semibold'
                                >
                                    DESATIVAR CONTA
                                </span>
                            </button>
                        </li>
                    </ul>
                )
            }
        </>
    )
}

export default memo(ProfileModal)