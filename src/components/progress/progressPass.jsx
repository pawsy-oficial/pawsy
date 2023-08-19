import React, { useEffect, useState } from 'react'

export default function ProgressPass({ password }) {

    const [eight, setEight] = useState(false);
    const [number, setNumber] = useState(false);
    const [symbol, setSymbol] = useState(false);

    useEffect(() => {
        if (password.length >= 8) {
            setEight(true);
        } else {
            setEight(false);
        }

        if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) {
            setNumber(true);
        } else {
            setNumber(false);
        }

        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            setSymbol(true);
        } else {
            setSymbol(false);
        }
    }, [password]);

    let numberPorcentage = 0;
    let colorState = "#F44336";

    if ((eight && !number && !symbol) || (!eight && number && !symbol) || (!eight && !number && symbol)) {
        numberPorcentage = 1 * 100 / 3;
        colorState = "#ff9800"
    } else if ((eight && number && !symbol) || (eight && !number && symbol) || (!eight && number && symbol)) {
        numberPorcentage = 2 * 100 / 3;
        colorState = "#8bc34a"
    } else if (eight && number && symbol) {
        numberPorcentage = 3 * 100 / 3;
        colorState = "#44ff6f"
    } else {
        numberPorcentage = 0 * 100 / 3;
        colorState = "#F44336"
    }

    const handleLevelPass = () => (
        {
            width: `${numberPorcentage}%`,
            background: `${colorState}`
        }
    )

    return (
        <>
            <div
                className="w-full h-1 bg-zinc-200 mt-1"
            >
                <div
                    className={`h-full transition-all`}
                    style={handleLevelPass()}
                />
            </div>

            <ul
                className="text-xs mt-2"
            >
                <li
                    className={`${eight && "text-sky-400"} font-semibold`}
                >
                    Mínimo 8 caracteres
                </li>
                <li
                    className={`${symbol && "text-sky-400"} font-semibold`}
                >
                    Mínimo 1 símbolo
                </li>
                <li
                    className={`${number && "text-sky-400"} font-semibold`}
                >
                    Deve haver letras e números
                </li>
            </ul>
        </>
    )
}
