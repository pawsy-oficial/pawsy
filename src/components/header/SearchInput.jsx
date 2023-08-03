import { MagnifyingGlass } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"

export default function SearcInput() {

    const navigate = useNavigate()

    return (
        <div className="lg:flex mx-auto h-6 hidden">
            <input
                type="search"
                placeholder="Pesquisar"
                className="hidden md:block py-1 px-3 w-80 border-b-2 text-xs border-primary"
            />
            <button
                className="rounded-r-md md:bg-primary py-1 w-14 flex justify-center items-center"
                title="pesquisa"
                onClick={()=> navigate("/resultado-pesquisa", { state: { idPet: 705 } })}
            >
                <MagnifyingGlass size={16} className="fill-black md:fill-white" weight="bold" />
            </button>
        </div>
    )
}