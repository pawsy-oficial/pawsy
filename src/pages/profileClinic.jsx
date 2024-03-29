import { Header } from "../components/header/Header";
import { NavbarClinic, NavbarTutor } from "../components/Navbar";
import { ModalSeeMedic } from "../components/ClinicPerfilComponents/ModalSeeMedic";
import { ModalAddMedic } from "../components/ClinicPerfilComponents/ModalAddMedic";
import ClientsPerfil, { SectionScoreClinic, VaccinePets } from "../components/cardsAndBoxes/cardClinicProfile";
import MedicForClinic from "../components/ClinicPerfilComponents/MedicForClinic";
import PostAd from "../components/cardsAndBoxes/cardMarketing";
import { PlusCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UpdateFormClinic } from "../components/forms/UpdateForm";
import GoBack from "../components/buttons/GoBack";
import { useLocation, useNavigate } from "react-router-dom";
import CommentsClinic from "../components/commentsClinic";
import { SwitchClinic } from "../components/inputsComponents";


export default function ProfileClinic() {
    
    const location = useLocation()
    const navigate = useNavigate()
    
    const isOwner = (Cookies.get().jwtTokenClinic) && true
    
    const [see, setSee] = useState(false)
    const [infoClinic, setInfoClinic] = useState([])
    const [stateEdit, setStateEdit] = useState(false)
    const [editAboutUs, setEditAboutUs] = useState(false)
    const [textAboutUs, setTextAboutUs] = useState(null)
    const [adsPosts, setAdsPosts] = useState([])
    const [popUpMessage, setPopUpMessage] = useState({
        active: false,
        message: null,
        messageError: false
    })
    const [statusClinica, setStatusClinica] = useState(false); // "Aberta" ou "Fechada"
    console.log(statusClinica)

    let token

    useEffect(() => {
        token = Cookies.get("jwtTokenClinic") || Cookies.get("jwtTokenTutor")
        isOwner
            ? (
                axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(e => {
                        setInfoClinic(e.data);
                        setTextAboutUs(e.data.storedDescriptionClinica)
                        axios.get(
                            `${import.meta.env.VITE_URL}/getStatus-clinica/${e.data.storedIdClinica}`
                            ).then((e => {
                                setStatusClinica(e.data);
                            }))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            )
            : (
                (location.state == null) && navigate(-1),
                axios.get(`${import.meta.env.VITE_URL}/ClinicPreviews?id=${location.state.id}&all=true`)
                    .then(e => {
                        setInfoClinic(e.data.result[0]);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            )
    }, [stateEdit])

    function handleUpdateAboutUs() {
        if (editAboutUs) {
            const data = {
                description: textAboutUs,
                idClinic: infoClinic.storedIdClinica
            }
            axios.post(`${import.meta.env.VITE_URL}/update-clinic-profile?about=true`, data)
                .then(e => {
                    setPopUpMessage({
                        active: true,
                        message: e.data.result,
                        messageError: false
                    })
                    setEditAboutUs(!editAboutUs)
                })
                .catch(err => console.log(err))
        }
        else {
            setEditAboutUs(!editAboutUs)
        }
    }

    useEffect(() => {
        if (popUpMessage.active) {
            var timer = setTimeout(() => {
                setPopUpMessage({
                    ctive: false,
                    message: null,
                    messageError: false
                })
            }, 8000)
        }

        return () => clearTimeout(timer)
    }, [popUpMessage])


    // eu tenho q achar alguma forma de deixar esse código menos verboso
    useEffect(() => {
        isOwner
            ? (
                axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(e => {
                    axios.get(`${import.meta.env.VITE_URL}/getAllAds/${e.data.storedIdClinica}`)
                        .then(e => setAdsPosts(e.data.Ads))
                        .catch(err => console.log(err))
                })
            ) : (
                axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(e => {
                    axios.get(`${import.meta.env.VITE_URL}/getAllAds/${location.state.id}`)
                        .then(e => {
                            console.log(e);
                            setAdsPosts(e.data.Ads)
                        })
                        .catch(err => console.log(err))
                })
            )
    }, [])


    // useEffect(() => {
    //     const buscarStatusClinica = async (idClinica) => {
    //         try {
    //             const resposta = await axios.get(
    //         `${import.meta.env.VITE_URL}/getStatus-clinica/${idClinica}`
    //         );
    //         setStatusClinica(resposta.data);
    //         console.log(statusClinica)
    //         } catch (erro) {
    //             console.error("Erro ao buscar o status da clínica:", erro);
    //         }
    //     };
    //     buscarStatusClinica(infoClinic.storedIdClinica)
    //     console.log(infoClinic.storedIdClinica)
    // }, [])

    const alternarStatusClinica = async (idClinica) => {
        try {
            const resposta = await axios.post(
            `${import.meta.env.VITE_URL}/openClose-clinica/${idClinica}`
             );
            setStatusClinica(resposta.data === 0 ? true : false);
            window.location.reload();
        } catch (erro) {
            console.error("Erro ao alternar o status da clínica:", erro);
        }
    };
    
return (
        <main className="flex min-h-screen">
            {
                isOwner ? <NavbarClinic page={3} /> : <NavbarTutor page={3} />
            }

            <section className="flex-1">
                <Header userType={isOwner ? "clinica" : "tutor"} />
                {
                    isOwner && (
                        <main className="pl-10 pr-16 py-8 flex gap-5">
                            {
                                infoClinic.storedIdClinica && (
                                    <div className="flex gap-5 w-full justify-between">
                                        <ClientsPerfil idClinc={infoClinic.storedIdClinica} />
                                        <VaccinePets />
                                        <SectionScoreClinic idClinic={infoClinic.storedIdClinica} />
                                    </div>
                                )
                            }
                        </main>
                    )
                }
                {
                    popUpMessage.active && (
                        <div
                            className={`rounded-lg fixed right-6 bottom-6 p-2 capitalize text-white ${popUpMessage.messageError ? "bg-red-error/80" : "bg-emerald-500/80"}`}
                        >
                            <p>
                                {popUpMessage.message}
                            </p>
                        </div>
                    )
                }
                {
                    !isOwner && (
                        <div
                            className="ml-10"
                        >
                            <GoBack theme="dark" />
                        </div>
                    )
                }


                <main className="pl-10 pr-16 pb-8 flex gap-5">
                    <section className={`flex-1 flex flex-col bg-white px-6 py-8 rounded-2xl h-fit`}>
                        {
                            stateEdit && isOwner
                                ? <UpdateFormClinic infoClinic={infoClinic} actionStateEdit={setStateEdit} />
                                : (
                                    <section className="flex justify-between relative">
                                        <div className="flex items-center">
                                            <div className="min-w-[12rem] w-48 h-48 rounded-full overflow-hidden border-2 border-secundary">
                                                <img
                                                    src={`${import.meta.env.VITE_URL}/files/${infoClinic.storedImg}`}
                                                    alt={infoClinic.storedNameClinica}
                                                    className="h-full w-full object-cover"
                                                    draggable={false}
                                                />
                                            </div>
                                            <div className="flex flex-col p-4 gap-2  text-left">
                                                <h3 className="text-[32px] font-bold uppercase flex gap-4 items-center">
                                                    {infoClinic.storedNameClinica}
                                                </h3>
                                                <p>
                                                    {infoClinic.Rua}, {infoClinic.Numero}
                                                </p>
                                                {
                                                    infoClinic.Complemento && <p>{infoClinic.Complemento}</p>
                                                }
                                                <p>
                                                    {infoClinic.storedTellClinica}
                                                </p>
                                                <p>
                                                    {infoClinic.storedEmailClinica}
                                                </p>
                                                <p>
                                                    {/* {infos[0].funcionamento} */}
                                                </p>
                                            </div>
                                        </div>
                                        {
                                            isOwner && (
                                                <button
                                                    className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90 absolute bottom-0 right-0 disabled:cursor-not-allowed disabled:opacity-25 disabled:transition-all"
                                                    onClick={() => setStateEdit(!stateEdit)}
                                                    disabled={stateEdit || editAboutUs}
                                                >
                                                    Editar perfil
                                                </button>
                                            )
                                        }
                                    </section>
                                )
                        }


                        <div className="flex flex-col">
                            <div
                                className="flex mt-4 justify-between w-full items-center"
                            >
                                <h2 className="font-bold text-lg">
                                    Sobre nós
                                </h2>
                                {
                                    isOwner && (
                                        <div
                                            className="flex gap-3 items-center"
                                        >
                                            <label className="text-sm text-gray-600">Abrir a loja:</label>
                                            <SwitchClinic state={statusClinica} onChange={() => alternarStatusClinica(infoClinic.storedIdClinica)} />
                                            <button
                                                className="px-4 py-2 bg-primary rounded text-white font-lato text-xs hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-25 disabled:transition-all"
                                                disabled={stateEdit}
                                                onClick={handleUpdateAboutUs}
                                            >
                                                {editAboutUs ? "Aplicar alterações" : "Editar"}
                                            </button>
                                            {
                                                editAboutUs &&
                                                <button
                                                    className="px-4 py-2 bg-red-error rounded text-white font-lato text-xs hover:bg-red-error/90 disabled:cursor-not-allowed disabled:opacity-25 disabled:transition-all"
                                                    disabled={stateEdit}
                                                    onClick={() => setEditAboutUs(!editAboutUs)}
                                                >
                                                    Cancelar
                                                </button>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            {
                                editAboutUs && isOwner
                                    ? (
                                        <div
                                            className="relative w-full"
                                        >
                                            <textarea
                                                className="w-full border rounded-lg mt-4 resize-none h-52 border-primary focus-within:outline-secundary p-4 bg-primary/5 text-base"
                                                value={
                                                    (!infoClinic.storedDescriptionClinica || infoClinic.storedDescriptionClinica.length != 0)
                                                        ? textAboutUs
                                                        : ""
                                                }
                                                onInput={(e) => {
                                                    const count = e.target.value.length
                                                    count <= 680 && setTextAboutUs(e.target.value)
                                                }}
                                            />
                                            <span
                                                className={`absolute right-0 -bottom-4 ${textAboutUs && (textAboutUs.length == 680 && "text-emerald-500")}`}
                                            >
                                                {
                                                    textAboutUs == null ? "0/680" : `${textAboutUs.length} / 680`
                                                }
                                            </span>
                                        </div>
                                    )
                                    : (
                                        <p className="text-sm font-normal text-limit max-w-3xl">
                                            {
                                                !infoClinic.storedDescriptionClinica || infoClinic.storedDescriptionClinica.length == 0
                                                    ? `${isOwner ? "A sua clínica ainda não possui uma descrição, crie uma agora mesmo!" : "A clínica não possui uma descrição"}`
                                                    : infoClinic.storedDescriptionClinica
                                            }
                                        </p>
                                    )
                            }
                        </div>
                        <div className="mnegative flex flex-col">
                            <h2 className="font-bold text-lg pb-2">
                                Anúncios
                            </h2>

                            <div
                                className="flex flex-col gap-6"
                            >
                                {
                                    adsPosts.length != 0
                                        ? (
                                            adsPosts.map(ad => {
                                                return (
                                                    <PostAd
                                                        title={ad.title}
                                                        description={ad.description}
                                                        image={ad.urlImage}
                                                        limit={ad.limitDay}
                                                        typeAd={ad.typeAd}
                                                        isOwner={false}
                                                    />
                                                )
                                            })
                                        ) : (
                                            isOwner
                                                ? (
                                                    <p className="text-sm font-normal">
                                                        Você não criou nenhum anúncio {" "}
                                                        <a 
                                                            className="text-[#22937E] underline cursor-pointer" 
                                                            onClick={()=>navigate("/marketing")}
                                                        >
                                                            criar anúncio
                                                        </a>
                                                    </p>
                                                ) : (
                                                    <p className="text-sm font-normal">
                                                        Essa clínica não possui anúncios
                                                    </p>
                                                )
                                        )
                                }
                            </div>
                        </div>

                        {
                            isOwner && (
                                <CommentsClinic
                                    idClinic={infoClinic.storedIdClinica}
                                    // temp={setTemp}
                                />
                            )
                        }
                    </section>

                    <aside className="flex flex-col gap-10">
                        {
                            isOwner
                                ? <SectionMedicsClinic
                                    see={see}
                                    setSee={setSee}
                                    idClinic={infoClinic.storedIdClinica}
                                    editAboutUs={editAboutUs}
                                    stateEdit={stateEdit}
                                />
                                : (
                                    <>
                                        <SectionScoreClinic
                                            idClinic={infoClinic.storedIdClinica}
                                        />
                                        <SectionMedicsClinic
                                            see={see}
                                            setSee={setSee}
                                            tutor={true}
                                            idClinic={infoClinic.storedIdClinica}
                                            editAboutUs={editAboutUs}
                                            stateEdit={stateEdit}
                                        />
                                        <CommentsClinic
                                            idClinic={infoClinic.storedIdClinica}
                                            // temp={setTemp}
                                        />
                                    </>
                                )
                        }

                    </aside>
                </main>
            </section>
        </main>
    )
}

function SectionMedicsClinic({  tutor = false, editAboutUs, stateEdit, idClinic = 0 }) {
    const [open, setOpen] = useState(false)
    const [see, setSee] = useState(false)
    const [medics, setMedics] = useState([])
    const [infoMedicSelect, setInfoMedicSelect] = useState()
    const token = Cookies.get("jwtTokenClinic")
    
    useEffect(() => {
        setMedics([]) // nn sei pq mas assim atualiza :)
        tutor
            ? (
                axios.get(`${import.meta.env.VITE_URL}/get-medicosIntegrados?idClinica=${idClinic}&all=true`)
                    .then(e => {
                        setMedics(e.data)
                    })
                    .catch(err => console.log(err))

            )
            : (
                axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(e => {
                        axios.get(`${import.meta.env.VITE_URL}/get-medicosIntegrados?idClinica=${e.data.storedIdClinica}&all=true`)
                            .then(e => {
                                setMedics(e.data)
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            )

    }, [idClinic, open, see])

    return (
        <section className="w-96 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5 h-max">
            <h2 className="font-bold text-lg">Médicos veterinários</h2>
            <div
                className="flex flex-col gap-2"
            >
                {
                    medics.map((medic, key) => {
                        return <>
                            <button
                                key={key}
                                onClick={() => {
                                    setInfoMedicSelect(medic)
                                    setSee(!see)
                                }}
                                type=""
                                className="border-transparent border-r-2 hover:border-primary hover:bg-secundary/5 transition-all rounded-l-full p-1"
                            >
                                <MedicForClinic nameMedic={medic.nomeMedico} imageMedic={medic.imagemPerfil} />
                            </button>
                        </>
                    })
                }
                {
                    see && <ModalSeeMedic 
                            isSee={see} 
                            setSee={setSee} 
                            infoMedic={infoMedicSelect} 
                            tutor={tutor} 
                            idClinic={idClinic}
                            token={token}
                        />
                }
            </div>
            {
                !tutor && (
                    <div className="flex w-full justify-center">
                        <button
                            onClick={() => setOpen(!open)}
                            type=""
                            className="flex gap-2 disabled:opacity-20 disabled:cursor-not-allowed"
                            disabled={editAboutUs || stateEdit}
                        >
                            <PlusCircle size={24} color="#22B77E" />
                            <p className="text-primary font-bold">Adicionar</p>
                        </button>
                        <ModalAddMedic isOpen={open} setOpen={setOpen} />
                    </div>
                )
            }
        </section>

    )
}