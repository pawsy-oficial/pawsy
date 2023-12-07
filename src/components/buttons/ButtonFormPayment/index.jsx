import { SmileyXEyes } from "@phosphor-icons/react";
import styles from "./index.module.css"

export default function ButtonFormPayment({ icon = <SmileyXEyes size={32} />, typeForm = "not found", typePayment }) {
    const dateTime = Math.random()*new Date().getTime()
    return (
        <>
            <input 
                type="radio" 
                name="paymentOption" 
                className="hidden" 
                id={dateTime}
            />
            <label
                className={`flex gap-3 cursor-pointer items-center p-6 border-2 transition-all duration-500 border-pawsy-green rounded-lg w-full ${styles.box} ${styles.light}`}
                htmlFor={dateTime}
                onClick={()=>typePayment(typeForm)}
            >
                {
                    icon
                }
                <span
                    className="text-2xl font-sora font-semibold"
                >
                    { typeForm }
                </span>
            </label>
        </>
    )
}