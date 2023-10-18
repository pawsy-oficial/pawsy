import { Trash } from "@phosphor-icons/react"
import { memo } from "react"

function AddNewRestriction({ index, register, removeRestriction }) {
    return (
        <div className="flex justify-center gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex">
                    <input
                        type="date"
                        className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]"
                        placeholder="__/__/____"
                        {...register(`restriction.${index}.data`)}
                    />
                    <button
                        type="button"
                        onClick={() => removeRestriction(index)}
                        className="cursor-pointer flex items-center justify-center bg-primary text-white rounded-tr-lg rounded-br-lg px-4 -translate-x-1"
                    >
                        <Trash weight={"bold"} size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(AddNewRestriction)