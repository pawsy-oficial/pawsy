import { memo, useState, useEffect } from "react"

function Switch({state, defaultState}) {
    const [handleSwitch, setHandleSwitch] = useState(defaultState || false)

    useEffect(()=>{
        state(handleSwitch)
    },[handleSwitch])    

    return (
        <>
            <label
                className={`p-1 ${handleSwitch ? "bg-primary" : "bg-zinc-200"} rounded-full relative w-16 md:w-10 cursor-pointer`}
            >
                <input type="checkbox" className="hidden" onChange={e => setHandleSwitch(!handleSwitch)} />
                <div className={`md:w-4 md:h-4 w-6 h-6 rounded-full bg-white relative duration-500 ${handleSwitch ? "md:left-[calc(100%-16px)] left-[calc(100%-24px)]" : "left-0"}`} />
            </label>
        </>
    )
}

const memoSwitch = memo(Switch)
export { memoSwitch as Switch }
