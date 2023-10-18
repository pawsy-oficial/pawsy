import { Target } from "@phosphor-icons/react"
import { memo, useState, useEffect } from "react"
import InputMask from "react-input-mask"

function Switch({ state, defaultState }) {
    const [handleSwitch, setHandleSwitch] = useState(defaultState || false)

    useEffect(() => {
        state(handleSwitch)
    }, [handleSwitch])

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

import styles from "./style.module.css"

function InputDropDown({ listData }) {
    const id = `${listData}_pawsy_${Math.random()*(new Date().getTime())}`
    return (
        <>
            <input
                type="checkbox"
                id={id}
                className="hidden"
                value={listData}
            />
            <label
                htmlFor={id}
                className={styles.weekDay}
            >
                {
                    listData.slice(0,3)
                }
                .
            </label>

        </>
    )
}

function InputFormRegister({ value, onChange, register, mask, type = "text", placeholder, nameRegister }) {

    return (
        <InputMask
            mask={mask}
            maskChar={null}
            type={type}
            placeholder={placeholder}
            className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all`}
            {...register(nameRegister)}
            value={value}
            onChange={onChange}
        />
    )
}

// ${errors.cep && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}

function InputFormRegisterCEP({ value, onChange, loading, register }) {
    return (
        <InputMask
            mask={"99999-999"}
            maskChar={null}
            placeholder={"CEP"}
            className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed `}
            disabled={loading}

            {...register('cep')}

            value={value}
            onChange={onChange}
        />
    )
}

const memoInputFormRegisterCEP = memo(InputFormRegisterCEP)
const memoInputFormRegister = memo(InputFormRegister)
const memoInputDropDown = memo(InputDropDown)
const memoSwitch = memo(Switch)

export { memoInputFormRegisterCEP as InputFormRegisterCEP }
export { memoInputDropDown as InputDropDown }
export { memoSwitch as Switch }
export { memoInputFormRegister as InputFormRegister }
