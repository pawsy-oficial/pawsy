import { Star } from "@phosphor-icons/react";
import axios from "axios";
import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";
import style from "./style.module.css"

function CommentsClinic({ idClinic }) {
    const isOwner = (Cookies.get().jwtTokenClinic) && true
    const [valueTextArea, setValueTextArea] = useState("");
    const [comments, setComments] = useState([])
    let token
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                })
                .catch(err => console.log(err))
        )


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
                    <div
                        className="mt-6"
                    >
                        <div className="w-full relative">
                            <textarea
                                className="bg-[#F5FFFE] w-full h-24 border border-primary rounded-lg resize-none p-2 focus:border-primary focus-visible:outline-none"
                                placeholder="Fazer um comentário"
                                onInput={(e) => {
                                    const count = e.target.value.length;
                                    count <= 300 && setValueTextArea(e.target.value);
                                }}
                                value={valueTextArea}
                            />
                            <span className="absolute right-2 bottom-2 font-lato text-zinc-400">
                                {valueTextArea.length}/300
                            </span>
                        </div>
                        <div className="flex gap-4 justify-between items-center mt-3">
                            <AvaliationStars />
                            <button
                                title="publicar comentário"
                                className="bg-primary rounded-lg text-white px-6 py-1 hover:bg-primary/80"
                            >
                                Publicar
                            </button>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

function BoxComments({ nameTutor, imgTutor, msg, date }) {
    return (
        <div
            className="p-2 rounded bg-[#F5FFFE] flex gap-3"
        >
            <div
                className="min-w-[2rem] h-8 rounded-full overflow-hidden border border-primary"
            >
                <img
                    src={`${import.meta.env.VITE_URL}/files/${imgTutor}`}
                    alt={`@${nameTutor}`}
                    draggable={false}
                    className="w-full h-full object-cover"
                />
            </div>

            <div
                className="flex flex-col gap-2"
            >
                <span
                    className="font-lato font-bold capitalize"
                >
                    {nameTutor}
                </span>
                <p
                    className="leading-relaxed font-lato text-sm"
                >
                    {msg}
                </p>
            </div>
        </div>
    )
}

function AvaliationStars() {
    const [stars, setStars] = useState(["", "", "", "", ""])
    const [avaliation, setAvaliation] = useState(3)

    return (
        <div
            className={`flex gap-1 flex-row-reverse`}
        >
            {
                console.log("oook")
            }
            {
                stars.map((a, i) => {
                    return(
                        <label
                            className={`${style.hover_effect_star} cursor-pointer`}
                            key={i}
                            onClick={()=>setAvaliation(i+1)}
                        >
                            <input
                                type="radio"
                                name="star"
                                className={`hidden`}
                            />
                            {i}
                            <Star color="#8fceb6" weight="fill" size={18} className={`${i+1 >= avaliation && "!fill-[#22B77E]"}`}/>
                        </label>
                    )
                })
            }
        </div>
    )
}

export default memo(CommentsClinic)