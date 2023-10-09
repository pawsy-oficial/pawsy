import { useEffect, useState } from "react"

export default function CardPopUpMessage({ message = null, messageError = false }) {
    const [active, setActive] = useState(false)

    useEffect(() => {
        console.log("sadasdasd");
        // const timer = setTimeout(() => {
        //     setActive(false)
        //     console.log(active);
        // }, 2000)
        // return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`rounded-lg fixed right-6 bottom-6 p-2 capitalize text-white ${messageError ? "bg-red-error/80" : "bg-emerald-500/80"}`}
        >
            <p>
                {message}
            </p>
        </div>
    )

}