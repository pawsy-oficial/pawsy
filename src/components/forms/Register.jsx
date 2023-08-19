import { Camera } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useState } from "react";

export default function RegisterForm({ userType }) {

    const [ valueInput, setValueInput ] = useState('')
    const [ eight, setEight ] = useState(false)
    const [ symbol, setSymbol ] = useState(false)
    const [ number, setNumber ] = useState(false)
    const [ levelPass, setLevelPass ] = useState(0)


    useEffect(()=>{
        handleLevelPass()
        if(valueInput.length >= 8){
            setEight(true)
        }
        else{
            setEight(false)
        }

        if(/[0-9]/.test(valueInput) && /[a-zA-Z]/.test(valueInput)){
            setNumber(true)
        }
        else{
            setNumber(false)
        }

        if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(valueInput)){
            setSymbol(true)
        }
        else{
            setSymbol(false)
        }

    },[valueInput])
    
    

    function handleLevelPass(){
        if((eight && !number && !symbol) || (!eight && number && !symbol) || (!eight && !number && symbol)){
            setLevelPass(1)
        }
        else if((eight && number && !symbol) || (eight && !number && symbol) || (!eight && number && symbol) ){
            setLevelPass(2)
        }
        else if(eight && number && symbol){
            setLevelPass(3)
        }
        else{
            setLevelPass(0)
        }
    }

    return (
        <section
            className="bg-white rounded-lg py-8 px-5 flex flex-col gap-8 max-w-2xl"
        >
            <h2
                className="font-sora text-[2rem] font-semibold"
            >
                Criar nova conta
            </h2>

            <form action="">
                <section
                    className="flex  flex-col items-center gap-2"
                >
                    <label
                        className="w-28 h-28 border border-primary bg-primary/20 rounded-full flex flex-col items-center justify-center cursor-pointer"
                        title="Imagem de perfil"
                    >
                        <Camera size={48} color="#22937E" />

                        <input type="file" multiple={false} className="hidden" />
                    </label>
                    <small
                        className="w-28 text-center text-xs text-zinc-400"
                    >
                        Formato 1:1, com tamanho máximo de 5MB e nos formatos .png e .jpg
                    </small>
                </section>

                <section>
                    <legend>Dados pessoais</legend>

                    <div 
                        className="grid grid-cols-2 gap-8 mt-6"
                    >

                        <input
                            type="text"
                            placeholder={"Nome"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"Sobrenome"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"CPF"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"Data de nascimento"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"Email"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"Celular"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <div>
                            <input
                                type="text"
                                placeholder={"Senha"}
                                className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                                onChange={e => {
                                    setValueInput(e.target.value)
                                    handleLevelPass()
                                }}
                                value={valueInput}
                            />
                            <div
                                className="w-full h-1 bg-zinc-200 mt-1"
                            >
                                <div
                                    className={`
                                        h-full bg-red-400
                                        ${
                                            levelPass == 1 && "w-1/4"
                                        }
                                    `}
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
                        </div>
                        <input
                            type="text"
                            placeholder={"Confirmar senha"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                    </div>
                </section>
            </form>

        </section>
    )
}
