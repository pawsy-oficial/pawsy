import { Star } from "@phosphor-icons/react";
import axios from "axios";
import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";
import style from "./style.module.css"
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

function CommentsClinic({ idClinic, temp }) {
    const isOwner = (Cookies.get().jwtTokenClinic) && true
    const [valueTextArea, setValueTextArea] = useState("");
    const [comments, setComments] = useState([])
    let token = Cookies.get("jwtTokenClinic") || Cookies.get("jwtTokenTutor")
    const [loading, setLoading] = useState(true);
    const [avaliation, setAvaliation] = useState(1)
    const [error, setError] = useState({
        active: false,
        msg: ""
    })
    
    const [ idTutor, setIdTutor ] = useState(0)

    useEffect(()=>{
        isOwner
            ? (
                axios.get(`${import.meta.env.VITE_URL}/comment/${idClinic}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(r => {
                        setComments(r.data.comments)
                        setLoading(false);
                    })
                    .catch(err => console.log(err))
            )
            : (
    
                axios.get(`${import.meta.env.VITE_URL}/comment/${idClinic}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(r => {
                        setComments(r.data.comments)

                        axios.get(`${import.meta.env.VITE_URL}/profileTutor`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            setIdTutor(res.data.storedIdTutor);
                            setLoading(false);
                        }).catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            )
    },[idClinic])

    const { handleSubmit, register } = useForm({
        mode: "onSubmit"
    })

    const onChange = (data)=>{
        const dataComments = {
            textComment: data.comment,
            scoreEvaluation: avaliation,
            idClinic,
            idTutor: idTutor
        }
        
        valueTextArea.length > 0 
        ? (
            axios.post(`${import.meta.env.VITE_URL}/comment`, dataComments, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setAvaliation(1)
                setValueTextArea("")
                dataComments.textComment = ""
                setError({
                    active: false,
                    msg: ""
                })
                temp("")
            })
            .catch(err => {
                setError({
                    active: true,
                    msg: err
                })
            })
        )
        :(
            setError({
                active: true,
                msg: "comentário muito curto"
            })
        )
    }

    return (
        <section
            className={`${isOwner ? "w-full mt-4" : "w-96 px-4 py-8"} bg-white rounded-2xl flex flex-col gap-5 h-max`}
        >
            <h2 className="font-bold text-lg">Comentários</h2>
            <div
                className="flex flex-col gap-2 max-h-[24rem] overflow-y-auto"
            >
                {
                    loading ? (
                        <p>Carregando comentários...</p>
                    ) : (
                        comments.length === 0 ? (
                            <p
                                className="text-zinc-500 text-sm font-lato"
                            >
                                Sem comentários
                            </p>
                        ) : (
                            comments.map((comment) => (
                                <BoxComments
                                    imgTutor={comment.imageTutor}
                                    msg={comment.comment}
                                    nameTutor={comment.nameTutor}
                                    date={comment.publishedAt}
                                />
                            ))
                        )
                    )
                }
            </div>
            {
                !isOwner && (
                    <form
                        onSubmit={handleSubmit(onChange)}
                        className="mt-6"
                    >
                        <div className="w-full relative">
                            {
                                error.active && (
                                    <span
                                        className="text-red-error text-center w-full block mb-1"
                                    >
                                        {error.msg}
                                    </span>
                                )
                            }
                            <textarea
                                className="bg-[#F5FFFE] w-full h-24 border border-primary rounded-lg resize-none p-2 focus:border-primary focus-visible:outline-none"
                                placeholder="Fazer um comentário"
                                onInput={(e) => {
                                    const count = e.target.value.length;
                                    count <= 300 && setValueTextArea(e.target.value);
                                }}
                                {...register("comment")}
                                value={valueTextArea}
                            />
                            <span className="absolute right-2 bottom-2 font-lato text-zinc-400">
                                {valueTextArea.length}/300
                            </span>
                        </div>
                        <div className="flex gap-4 justify-between items-center mt-3">
                            <AvaliationStars action={setAvaliation} avaliation={avaliation}  />
                            <button
                                type="submit"
                                title="publicar comentário"
                                className="bg-primary rounded-lg text-white px-6 py-1 hover:bg-primary/80"
                            >
                                Publicar
                            </button>
                        </div>
                    </form>
                )
            }
        </section>
    )
}

function BoxComments({ nameTutor, imgTutor, msg, date }) {
    return (
        <div
            className="p-2 rounded bg-[#F5FFFE] flex flex-col gap-3"
        >
            <div
                className="flex justify-between gap-2"
            >
                <div
                    className="flex gap-2 items-center"
                >
                    <div
                        className="max-w-[2rem] w-full h-8 rounded-full overflow-hidden border border-primary"
                    >
                        <img
                            src={`${import.meta.env.VITE_URL}/files/${imgTutor}`}
                            alt={`@${nameTutor}`}
                            draggable={false}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span
                        className="font-lato font-bold capitalize "
                    >
                        {nameTutor}
                    </span>
                </div>
                <span
                    className="text-zinc-500 text-sm"
                >
                    {
                        dayjs(date).format("DD/MM/YYYY")
                    }
                </span>
            </div>

            <div
                className="flex flex-col gap-2"
            >
                
                <p
                    className="leading-relaxed font-lato text-sm"
                >
                    {msg}
                </p>
            </div>
        </div>
    )
}

function AvaliationStars({avaliation, action}) {
    const [stars, setStars] = useState(["", "", "", "", ""])

    return (
        <div
            className={`flex gap-1`}
        >
            {
                stars.map((a, i) => {
                    return (
                        <label
                            className={`cursor-pointer`}
                            key={i}
                            onClick={() => action(i + 1)}
                        >
                            <input
                                type="radio"
                                name="star"
                                className={`hidden`}
                            />
                            <Star color="#8fceb6" weight="fill" size={18} className={`${i + 1 <= avaliation && "!fill-[#22B77E]"}`} />
                        </label>
                    )
                })
            }
        </div>
    )
}

export default memo(CommentsClinic)