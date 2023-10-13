import { memo } from "react"

function BoxFeatures({title = "Title", icon=":(", description="description"}) {
    return (
        <div
            className="max-w-xs flex flex-col gap-6"
        >
            <div
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
            >
                <img src={icon} alt="" />
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

export default memo(BoxFeatures)