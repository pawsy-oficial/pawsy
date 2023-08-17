import { useNavigate } from "react-router-dom"


export default function ButtonOptionsLogin({ title, description, imageName, slug }) {

    const navigate = useNavigate()

    const type = {
        title,
        description,
        imageName
    }

    return (
        <button
            className="px-6 py-4 rounded-lg flex gap-6 justify-between items-center bg-white hover:bg-sky-50 transition-colors"
            onClick={()=>navigate("/login", { state: { slug } })}
        >
            <div
                className="flex flex-col items-start gap-3"
            >

                <strong
                    className="font-lato font-bold text-[2em] "
                >
                    {type.title}
                </strong>
                <span
                    className="text-sm font-lato text-zinc-400"
                >
                    {type.description}
                </span>
            </div>

            <img src={type.imageName} alt="" />

        </button>
    )
}
