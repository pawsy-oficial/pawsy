import { CaretLeft } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"


export default function GoBack() {
    const navigation = useNavigate()
    return (
        <a
            className="flex items-center text-lg text-white cursor-pointer my-5 group"
            onClick={() => navigation(-1)}
        >
            <CaretLeft className="group-hover:text-white" />
            voltar
        </a>
    )
}