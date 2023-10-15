import { CheckCircle } from "@phosphor-icons/react"
import { memo } from "react"

function BoxFeatures({title = "Title", icon=":(", description="description"}) {
    return (
        <div
            className="max-w-xs flex flex-col gap-6 group"
        >
            <div
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary border border-transparent transition-all duration-5000 group-hover:scale-105 group-hover:shadow-[4px_4px_0_#22b77e] group-hover:-skew-x-12 group-hover:skew-y-6 group-hover:rotate-6"
            >
                <img src={icon} draggable="false" />
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

function BoxFetureSections({title = "Title", list = [], description = "..."}){
    return(
        <div
            className="w-full flex flex-col gap-8"
        >
            <div
                className="flex flex-col gap-2"
            >
                <strong
                    className="w-full inline-block text-center font-baloo2 text-2xl"
                >
                    {title}
                </strong>
                <p
                    className="font-lato text-base text-zinc-500"
                >
                    {description}
                </p>
            </div>
            <ul
                className="grid grid-cols-2 gap-x-5"
            >
                {
                    list.map(l => {
                        return(
                            <li
                                className="flex gap-6 items-center"
                            >   
                                <div
                                    className="min-w-[24px]"
                                >
                                    <CheckCircle size={24} color="#22B77E" />
                                </div>
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