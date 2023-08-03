import { DotsThreeVertical } from "@phosphor-icons/react"


export default function CardSchedule({ deleteButton, logoVet, clinicName, scheduleDate, scheduleHour, scheduleType, vetName }) {
    return (
        <div className={`flex relative gap-6 shadow-md rounded-lg p-3 sm:w-full ${!deleteButton && "cursor-pointer"} bg-[#f8fffc]`}>
            {
                deleteButton && (
                    <button className="absolute right-2 top-2">
                        <DotsThreeVertical size={24} weight="bold" color="#000" />
                    </button>
                )
            }
            <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={logoVet} alt={`Logo ${clinicName}`} className="object-cover w-full h-full" />
            </div>

            <div className="flex flex-col gap-3">
                <strong className="text-base text-start">{clinicName}</strong>
                <div className="flex flex-col gap-2 items-start">
                    <div className="flex gap-3 text-sm">
                        <span>{scheduleDate}</span>
                        <span className="font-bold">{scheduleHour}</span>
                    </div>
                    <span className="font-bold text-sm capitalize">{scheduleType}</span>

                    <p className="text-sm text-primary underline capitalize">{vetName}</p>
                </div>
            </div>
        </div>
    )
}