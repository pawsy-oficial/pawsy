import { CaretLeft } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"


export default function GoBack({ theme = "light" }) {
    const navigation = useNavigate()
    return (
        <a
            className={`select-none flex items-center text-lg ${theme == "light" ? "text-white" : "text-black"} cursor-pointer my-5 group w-fit`}
            onClick={() => navigation(-1)}
        >
            <CaretLeft className="group-hover:text-primary" />
            voltar
        </a>
    )
}