import caramelo from '../../img/caramelo.webp'
import oreo from '../../img/oreo.jpg'
import flor from '../../img/flor.jpg'
import pantera from '../../img/pantera.jpg'
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, memo } from "react"
import { GenderFemale, GenderMale } from '@phosphor-icons/react';
import { Alert } from './Alert';
import dayjs from 'dayjs';
import { UpdateFormPet } from '../forms/UpdateForm';

function ProfileTutor({ showPet, setStateEdit, stateEdit }) {
    const [loading, setLoading] = useState(false)
    const [myPet, setMyPet] = useState([])
    const tokenTutor = Cookies.get('jwtTokenTutor')

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
            headers: {
                Authorization: `Bearer ${tokenTutor}`
            }
        })
            .then(res => {
                // console.log(res);
                axios.get(`${import.meta.env.VITE_URL}/get-all-pets/${res.data.storedIdTutor}`, {
                    headers: {
                        Authorization: `Bearer ${tokenTutor}`
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        setLoading(false)
                        setMyPet(res.data.myPets)
                    })
                    .catch(err => console.log(err))
            }).catch(err => console.log(err))
    }, [stateEdit])

    useEffect(() => {
        setStateEdit(false)
    }, [showPet])

    return (
        <section className="flex-1 bg-white px-6 py-8 rounded-2xl">
            {
                myPet.length != 0 ? (
                    <>
                        {
                            stateEdit
                                ? (
                                    <UpdateFormPet 
                                        myPet={myPet} 
                                        showPet={showPet} 
                                        stateEdit={setStateEdit} 
                                        setStateEdit={setStateEdit}
                                    />
                                )
                                : (
                                    <div className="flex gap-6 mb-6 items-center relative">
                                        <div className="flex flex-col gap-2 items-center">
                                            <div
                                                className={`w-[90px] h-[90px]  sm:w-40 sm:h-40 rounded-full border-4 border-secundary overflow-hidden bg-primary/20`}
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_URL}/files/${myPet[showPet].pet.url_img}`}
                                                    alt={myPet.nm_pet}
                                                    className="h-full w-full object-cover"
                                                    draggable={false}
                                                />
                                            </div>
                                            <span
                                                className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                                            >
                                                #{myPet[showPet].pet.id_pawsy.toString().padStart(4, '0')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-4 self-start">
                                            <div className="flex gap-x-4 items-center w-full flex-wrap">
                                                <h3 className="lg:text-[32px] text-2xl font-bold uppercase">
                                                    {myPet[showPet].pet.nm_pet}
                                                </h3>
                                                {
                                                    myPet[showPet].pet.sexo == "macho" ? <GenderMale size={24} color="#8FB5FF" weight="bold" /> : <GenderFemale size={24} color="#FF8FCB" weight="bold" />
                                                }
                                                {/* {
                                                    pets[showPet].pet.status && <Alert />
                                                } */}
                                            </div>
                                            <ul className="flex flex-col gap-2">
                                                <li>
                                                    <span className="font-bold text-xs sm:text-lg">Idade: </span>
                                                    <span 
                                                        className="text-sm sm:text-base"
                                                    >
                                                        {
                                                            dayjs().diff(myPet[showPet].pet.dt_nascimento, "year")
                                                        }
                                                        {" "} ano(s)
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="font-bold text-xs sm:text-lg">Raça: </span>
                                                    <span className="text-sm sm:text-base">{myPet[showPet].pet.nm_raca}</span>
                                                </li>
                                                <li>
                                                    <span className="font-bold text-xs sm:text-lg">Status: </span>
                                                    {/* <span className="text-sm sm:text-base">{pets[showPet].pet.status ? "Não saudável" : "Saudável"}</span> */}
                                                </li>
                                            </ul>
                                        </div>

                                        <section className="max-w-[360px] ml-6 self-start hidden lg:inline-block">
                                            <h3 className="text-2xl font-semibold mb-3">Descrição</h3>
                                            <p className="text-zinc-800 leading-relaxed text-xs">
                                                {
                                                    myPet[showPet].pet.resumo.length == 0 ? <p>Não possui uma descrição</p> : (
                                                        myPet[showPet].pet.resumo
                                                    )
                                                }
                                            </p>
                                        </section>

                                        <button
                                            className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90 absolute bottom-0 right-0"
                                            onClick={() => setStateEdit(!stateEdit)}
                                        >
                                            Editar perfil
                                        </button>
                                    </div>
                                )
                        }
                        <div className="flex flex-col gap-6">
                            <section>
                                <h3 className="text-2xl font-semibold mb-3">Observações</h3>
                                <ul>
                                    <li>
                                        <span className="font-semibold mr-2">Alergia a medicamentos:</span>
                                        <span>{myPet[showPet].pet.tx_alergia}</span>
                                    </li>
                                    <li>
                                        <span className="font-semibold mr-2">Castrado(a):</span>
                                        <span>
                                            {
                                                myPet[showPet].pet.bl_castrado ? "Sim" : "Não"
                                            }
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-semibold mr-2">Comportamento:</span>
                                        <span>{myPet[showPet].pet.tx_comportamento}</span>
                                    </li>
                                    <li>
                                        <span className="font-semibold mr-2">Tratamento:</span>
                                        <span>{myPet[showPet].pet.tx_tratamento}</span>
                                    </li>
                                </ul>
                            </section>
                            <section>
                                <h3 className="text-2xl font-semibold mb-3">Histórico</h3>
                                <div className="flex flex-col gap-4">
                                    {
                                        myPet[showPet].history.length == 0 
                                        ? <p className='w-full text-zinc-500 text-center text-sm'>Seu pet merece o melhor cuidado, e um histórico médico bem preenchido é um passo importante.</p>
                                        : myPet[showPet].history.sort((a,b)=> b.id - a.id).map((history, index) => {
                                            return (
                                                <div
                                                    className="w-full bg-[#F5FFFE] rounded py-3 px-6 flex gap-4 justify-between items-center"
                                                    key={index}
                                                >
                                                    <div className="flex-1">
                                                        <strong 
                                                            className="font-bold text-base capitalize"
                                                        >
                                                            {
                                                                history.nameClinic
                                                            }
                                                        </strong>
                                                        <p 
                                                            className="text-xs mt-2"
                                                        >
                                                            {
                                                                history.description
                                                            }
                                                        </p>
                                                    </div>
                                                    <time>
                                                        {
                                                            dayjs(history.dateVisit).format("DD/MM/YYYY")
                                                        }
                                                    </time>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                        </div>
                    </>
                )
                    : <p>carregando...</p>
            }
        </section>
    )
}

export default memo(ProfileTutor)