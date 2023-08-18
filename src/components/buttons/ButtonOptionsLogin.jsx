import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../style/animate.css"

export default function ButtonOptionsLogin({ title, description, imageName, slug, click }) {

    const navigate = useNavigate()
    
    const [ animate, setAnimate ] = useState(false)
    useEffect(()=>{
        
        let timer
        if(animate){
            timer = setTimeout(()=>{
                navigate("/login", { state: { slug: slug } })
            }, 600)
        }

        return ()=>{
            clearTimeout(timer)
        }
    },[animate])


    const type = {
        title,
        description,
        imageName
    }

    return (
        <button
            className={`px-6 py-4 rounded-lg flex gap-6 justify-between items-center bg-white hover:bg-sky-50 transition-colors ${animate && "animate-transition"}`}
            onClick={()=> {
                click(true)
                setAnimate(true)
            }}
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
