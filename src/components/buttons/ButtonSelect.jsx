import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import { memo, useState } from "react";

function ButtonSelect({ question = "", answare = "" }) {

    const [ active, setActive ] = useState(false)

    return (
        <button
            onClick={()=>setActive(!active)}
            className="w-full border-b-2 py-6 flex flex-col gap-3"
        >
            <div
                className="flex justify-between gap-4 items-center w-full"
            >
                <strong
                    className="font-lato text-2xl text-start"
                >
                    {question}
                </strong>
                
                <div
                    className="w-8 h-8"
                >
                    {
                        active ? <MinusCircle size={32} color="#22B77E" /> : <PlusCircle size={32} color="#22B77E" />
                    }
                </div>
            </div>
            <p
                className={`font-lato text-sm text-zinc-500 text-start ${!active && "hidden"} leading-relaxed`}
            >
                {
                    answare
                }
            </p>
        </button>
    );
}

export default memo(ButtonSelect);