import { Star } from "@phosphor-icons/react";
import { memo, useState } from "react";

function CommentsClinic() {
    const [valueTextArea, setValueTextArea] = useState("");
    return (
        <section className="w-96 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5 h-max">
            <h2 className="font-bold text-lg">Comentários</h2>
            <div
                className="flex flex-col gap-2 h-96 overflow-y-auto"
            >
                <BoxComments />
                <BoxComments />
                <BoxComments />
                <BoxComments />
                <BoxComments />
            </div>
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
                    <div
                        className="flex gap-1"
                    >
                        <Star color="#22B77E" />
                        <Star color="#22B77E" />
                        <Star color="#22B77E" />
                        <Star color="#22B77E" />
                        <Star color="#22B77E" />
                    </div>
                    <button
                        title="publicar comentário"
                        className="bg-primary rounded-lg text-white px-6 py-1 hover:bg-primary/80"
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </section>
    )
}

function BoxComments() {
    return (
        <div
            className="p-2 rounded bg-[#F5FFFE] flex gap-3"
        >
            <div
                className="min-w-[2rem] h-8 rounded-full overflow-hidden border border-primary"
            >
                <img
                    src="https://github.com/rom013.png"
                    alt=""
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
                    rom013
                </span>
                <p
                    className="leading-relaxed font-lato text-sm"
                >
                    Belo atendimentoBelo atendimentoBelo atendimentoBelo atendimentoBelo atendimentoBelo atendimentoBelo atendimentoBelo atendimento
                </p>
            </div>
        </div>
    )
}

export default memo(CommentsClinic)