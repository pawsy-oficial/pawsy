import { Dog, Cat, Star } from '@phosphor-icons/react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { memo, useEffect, useState } from 'react';

function ClientsPerfil({ idClinc }) {
    const [clientClinic, setClientClinic] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/countPatients/${idClinc}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtTokenClinic")}`
            }
        }).then(e => setClientClinic(e.data.client)).catch(err => console.log(err))
    }, [])

    return (
        <div className="w-full max-w-[24rem] bg-white border-l-4 border-[#1F9EAB] rounded-r-lg">
            <h4 className="p-3 text-lg font-medium">
                Clientes
            </h4>
            <div className="flex items-center">
                <Dog className="px-3" size={48} />
                <p className="text-base font-medium">{
                    clientClinic.length > 0 && clientClinic[0].quantidade
                }</p>
                <Cat className="px-3" size={48} />
                <p className="text-base font-medium">{
                    clientClinic.length > 0 && clientClinic[1].quantidade
                }</p>
            </div>
        </div>
    )
}

export function VaccinePets() {
    const clients = ['69', '20'];
    return (
        <div className="w-full max-w-[24rem] bg-white border-l-4 border-[#1F9EAB] rounded-r-lg">
            <h4 className="p-3 text-lg font-medium">
                PetS Vacinados
            </h4>
            <div className="flex items-center">
                <Dog className="px-3" size={48} />
                <p className="text-base font-medium">{clients[0]}</p>
                <Cat className="px-3" size={48} />
                <p className="text-base font-medium">{clients[1]}</p>
            </div>
        </div>
    )
}

export function SectionScoreClinic({ idClinic }) {
    const [star, setStar] = useState([""])
    const [average, setAverage] = useState(0)

    let token
    useEffect(() => {
        // console.log(idClinic);
        token = Cookies.get("jwtTokenClinic") || Cookies.get("jwtTokenTutor")
        axios.get(`${import.meta.env.VITE_URL}/comment/${idClinic}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(r => {
                setAverage(r.data.average.average ?? 0)
                addStarFill(r.data.average.average ?? 0)
                // setLoading(false);
            })
            .catch(err => console.log(err))
    }, [idClinic])

    function addStarFill(value) {
        const stars = []
        for (let i = 0; i < parseInt(value); i++) {
            stars.push({ fill: true })
        }
        for (let i = 0; i < 5 - parseInt(value); i++) {
            stars.push({ fill: false })
        }
        setStar(stars)
    }

    return (
        <section className="w-full max-w-[24rem] bg-white px-4 py-3 rounded-r-lg flex flex-col gap-5 h-full max-h-fit border-l-4 border-secundary">
            <h2 className="text-lg">
                Avaliação
            </h2>

            <div
                className="flex gap-4 items-center"
            >
                <span
                    className="text-sm font-lato font-semibold"
                >
                    {
                        parseFloat(average)
                    }
                </span>
                <div
                    className="flex items-center gap-2"
                >
                    {
                        star.map(s => {
                            return <Star weight={`${s.fill ? "fill" : "regular"}`} color="#FFA800" size={20} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default memo(ClientsPerfil)