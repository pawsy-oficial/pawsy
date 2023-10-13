import { CheckCircle } from "@phosphor-icons/react"
import { memo } from "react"

function BoxFeatures({title = "Title", icon=":(", description="description"}) {
    return (
        <div
            className="max-w-xs flex flex-col gap-6 group"
        >
            <div
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary border border-transparent transition-colors duration-400"
            >
                <img src={icon} />
            </div>
            <div
                className=""
            >
                <h3
                    className="font-sora font-semibold text-lg"
                >
                    {title}
                </h3>
                <p
                    className="font-lato text-sm leading-relaxed text-zinc-800"
                >
                    {description}
                </p>
            </div>
        </div>
    )
}

function BoxFetureSections({title = "Title", list = []}){
    return(
        <div
            className="bg-[#D4FFEE] rounded-xl p-8 flex flex-col gap-8 w-full"
        >
            <p
                className="w-full text-center font-bold font-lato text-2xl uppercase"
            >
                {title}
            </p>

            <ul
                className="flex flex-col gap-6"
            >
                {
                    list.map(l => {
                        return(
                            <li
                                className="flex gap-6 items-center"
                            >
                                <CheckCircle size={24} color="#22B77E" />
                                <span
                                    className="font-lato text-base"
                                >
                                    {l}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const memoBoxFeturesSections = memo(BoxFetureSections)
export { memoBoxFeturesSections as BoxFetureSections }
const memoBoxFetures = memo(BoxFeatures)
export { memoBoxFetures as BoxFeatures }