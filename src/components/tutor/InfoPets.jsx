import caramelo from '../../img/caramelo.webp'
import oreo from '../../img/oreo.jpg'
import flor from '../../img/flor.jpg'
import pantera from '../../img/pantera.jpg'
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, memo} from "react"
import { GenderFemale, GenderMale } from '@phosphor-icons/react';
import { Alert } from './Alert';
import dayjs from 'dayjs';

function ProfileTutor({ showPet }) {
    const pets =
        [
            { name: "caramelo", image: caramelo, status: false, id: "0001", birthday: "2022-05-05", breed: "Sem raça definida", gender: "mas", observations: "Meu Caramelo é territorial e protetor, mas carinhoso e brincalhão. Avista com latidos e rosnados, mas uma carícia ou brincadeira o acalma. Adora correr atrás de brinquedos e é muito inteligente. Cuido com amor e atenção, recebendo amor e alegria em troca." },
            { name: "oreo", image: oreo, status: true, id: "0002", birthday: "2022-05-03", breed: "Husky siberiano", gender: "mas", observations: "Oreo é um verdadeiro artista do uivo! Seus vocais noturnos podem até incomodar os vizinhos, mas não há como negar que ele sabe como expressar sua paixão pela música... ops, quer dizer, pela vida selvagem!" },
            { name: "flor", image: flor, status: false, id: "0003", birthday: "2022-05-06", breed: "persa", gender: "fem", observations: "Não possui observações" },
            { name: "pantera", image: pantera, status: false, id: "0004", birthday: "2022-05-06", breed: "mau egípcio", gender: "fem", observations: "Não possui observações" }
    ]
    const [ loading, setLoading ] = useState(false)
    const [ myPet, setMyPet ] = useState([])
    const tokenTutor = Cookies.get('jwtTokenTutor') 
    useEffect(()=>{
        setLoading(true)
        axios.get(`${import.meta.env.VITE_URL}/get-all-pets/1`, {
            headers:{
                Authorization: `Bearer ${tokenTutor}`
            }
        })
            .then(res => {
                setLoading(false)
                setMyPet(res.data.myPets);
            })
            .catch(err => console.log(err))
    },[])

    const historys =
        [
            { nameClinic: "PetVet", description: "Consulta Veterinária - Acompanhamento de rotina", date: "2023-06-15" },
            { nameClinic: "CliniCão", description: "Banho e Tosa - Serviço completo", date: "2023-06-20" },
            { nameClinic: "VetSaúde", description: "Cirurgia - Castração de gatos", date: "2023-07-01" },
            { nameClinic: "AnimalCare", description: "Consulta Veterinária - Atendimento emergencial", date: "2023-07-10" },
            { nameClinic: "PetHappy", description: "Tratamento Odontológico - Limpeza de tártaro", date: "2023-07-20" }
        ]
    historys.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(myPet);
    return (
        <section className="flex-1 bg-white px-6 py-8 rounded-2xl">
            {
                myPet.length != 0 ? (
                    <>
                        <div className="flex gap-6 mb-6 items-center">

                            <div className="flex flex-col gap-2 items-center">
                                <div className="w-[90px] h-[90px]  sm:w-40 sm:h-40 rounded-full border-4 border-secundary overflow-hidden bg-primary/20">
                                    <img 
                                        src={`${import.meta.env.VITE_URL}/files/${myPet[showPet].url_img}`}
                                        alt={myPet.nm_pet}
                                        className="h-full w-full object-cover" 
                                        draggable={false}
                                    />    
                                </div>
                                <span
                                    className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                                >
                                    #{myPet[showPet].id_pawsy.toString().padStart(4, '0')}
                                </span>
                            </div>
                            <div className="flex flex-col gap-4 self-start">
                                <div className="flex gap-x-4 items-center w-full flex-wrap">
                                    <h3 className="lg:text-[32px] text-2xl font-bold uppercase">
                                        {myPet[showPet].nm_pet}
                                    </h3>
                                    {
                                        myPet[showPet].sexo == "macho" ? <GenderMale size={24} color="#8FB5FF" weight="bold" /> : <GenderFemale size={24} color="#FF8FCB" weight="bold" />
                                    }
                                    {
                                        pets[showPet].status && <Alert />
                                    }
                                </div>
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <span className="font-bold text-xs sm:text-lg">Idade: </span>
                                        <span className="text-sm sm:text-base">{dayjs(myPet[showPet].dt_nascimento).format("DD/MM/YYYY")}</span>
                                    </li>
                                    <li>
                                        <span className="font-bold text-xs sm:text-lg">Raça: </span>
                                        <span className="text-sm sm:text-base">{myPet[showPet].nm_raca}</span>
                                    </li>
                                    <li>
                                        <span className="font-bold text-xs sm:text-lg">Status: </span>
                                        <span className="text-sm sm:text-base">{pets[showPet].status ? "Não saudável" : "Saudável"}</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <section className="max-w-[360px] ml-6 self-start hidden lg:inline-block">
                                <h3 className="text-2xl font-semibold mb-3">Descrição</h3>
                                <p className="text-zinc-800 leading-relaxed text-xs">
                                {
                                    myPet[showPet].resumo.length == 0 ? <p>Não possui uma descrição</p> : (
                                            myPet[showPet].resumo
                                            )
                                        }
                                </p>
                            </section>
                            <button 
                                className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90"
                            >
                                Editar perfil
                            </button>
                        </div>
                        <div className="flex flex-col gap-6">
                            <section>
                                <h3 className="text-2xl font-semibold mb-3">Observações</h3>
                                <ul>
                                    <li>
                                        <span className="font-semibold mr-2">Alergia a medicamentos:</span>
                                        <span>Não</span>
                                    </li>
                                    <li>
                                        <span className="font-semibold mr-2">Castrado(a):</span>
                                        <span>Não</span>
                                    </li>
                                    <li>
                                        <span className="font-semibold mr-2">Comportamento:</span>
                                        <span>Manso</span>
                                    </li>
                                    <li>
                                        <span className="font-semibold mr-2">Tratamento:</span>
                                        <span>Não</span>
                                    </li>
                                </ul>
                            </section>
                            <section>
                                <h3 className="text-2xl font-semibold mb-3">Histórico</h3>
                                <div className="flex flex-col gap-4">
                                    {
                                        historys.map((history, index) => {
                                            return (
                                                <div
                                                    className="w-full bg-[#F5FFFE] rounded py-3 px-6 flex gap-4 justify-between items-center"
                                                    key={index}
                                                >
                                                    <div className="flex-1">
                                                        <strong className="font-bold text-base">{history.nameClinic}</strong>
                                                        <p className="text-xs mt-2">
                                                            {
                                                                history.description
                                                            }
                                                        </p>
                                                    </div>
                                                    <span>
                                                        {/* {dayjs(history.date).format("DD/MM/YYYY")} */}
                                                    </span>
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