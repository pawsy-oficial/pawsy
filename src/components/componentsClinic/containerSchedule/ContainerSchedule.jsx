import React from 'react'

export default function ContainerSchedule({date}) {
    return (
        <div className="flex flex-col gap-6 mt-6">
            <span className="text-2xl">{date}</span>
            <div className="flex gap-4 flex-col">
                <ContainerScheduleInfo yesterday={false}/>
            </div>
        </div>
    )
}
function ContainerScheduleInfo({yesterday}){
    return(
        <div className={`bg-white w-full flex justify-between px-5 py-4 ${yesterday && "line-through text-zinc-400"}`}>
            <div className="flex gap-10">
                <p>09:30</p>
                <p>Marcos Texeira</p>
            </div>
            <p>Dr. Vanessa Santos</p>
        </div>
    )
}