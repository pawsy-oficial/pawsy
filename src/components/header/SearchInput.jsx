import { MagnifyingGlass } from "@phosphor-icons/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearcInput() {
    const [ inputValue, setInputValue ] = useState("")
    const navigate = useNavigate()

    return (
        <div className="lg:flex mx-auto  hidden">
            <input
                type="search"
                placeholder="Pesquisar"
                className="hidden md:block py-1 px-3 w-80 border-2  text-sm border-b-primary border-transparent focus:border-primary focus:rounded-l-lg"
                onChange={event => setInputValue(event.target.value)}
                value={inputValue}
                onKeyUp={e => e.key == "Enter" && navigate("/resultado-pesquisa", { state: { clinicName: inputValue } }) }
            />
            <button
                className="rounded-r-md md:bg-primary py-1 w-14 flex justify-center items-center"
                title="pesquisa"
                onClick={()=> navigate("/resultado-pesquisa", { state: { clinicName: inputValue } })}
            >
                <MagnifyingGlass size={16} className="fill-black md:fill-white" weight="bold" />
            </button>
        </div>
    )
}