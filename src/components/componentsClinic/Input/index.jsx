import { useState } from "react"

export function InputDropDown({listData}) {
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
