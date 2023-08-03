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

function InputDropDown({listData}) {
    const [statusDropDown, setStatusDropDown] = useState(false)

    function heandleDropDown(bool){
        setStatusDropDown(bool)
    }

    return (
        <div className="relative">
            <label className="flex flex-col gap-1">
                <strong className="text-base font-lato font-normal">Dias disponíves</strong>
                <input
                    type="text"
                    className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]"
                    placeholder="__/__/____"
                    onClick={()=>heandleDropDown(!statusDropDown)}
                />
            </label>
            {
                statusDropDown && (
                    <section 
                        className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 bg-white rounded-lg absolute w-max -translate-x-1/2 left-1/2 top-16 shadow-md z-30" 
                    >
                        {
                            listData.map((e,i)=>{
                                return(
                                    <div className="container-dropdown-input flex cursor-pointer">
                                        <input type="checkbox" name="" id={`${i}-week`} className="hidden" required/>
                                        <label htmlFor={`${i}-week`} className="py-1 px-3 border border-primary rounded">
                                            {e}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </section>
                )
            }
        </div>
    )
}


const memoInputDropDown = memo(InputDropDown)
const memoSwitch = memo(Switch)

export { memoInputDropDown as InputDropDown }
export { memoSwitch as Switch }
