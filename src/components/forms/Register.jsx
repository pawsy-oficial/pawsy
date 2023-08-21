import { Camera } from "@phosphor-icons/react";
import { useState } from "react";
import ProgressPass from "../progress/progressPass";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

const schema = Yup.object({
    name: Yup.string().required().min(2, "O nome deve ser maior que 2 caracteres"),
    lastName: Yup.string().required(),
    email: Yup.string().required().email(),
    cpf: Yup.string().length(11),
    cell: Yup.number().required(),

}) 

export default function RegisterForm({ userType }) {

    const [valueInput, setValueInput] = useState('')


    const {register, handleSubmit, formState} = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })
    const onSubmit = (data)=>{
        console.log(data);
    }

    const { errors } = formState

    console.log(errors);

    return (
        <section
            className="bg-white rounded-lg py-8 px-5 flex flex-col gap-8 max-w-2xl"
        >
            <h2
                className="font-sora text-[2rem] font-semibold"
            >
                Criar nova conta
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <section
                    className="flex flex-col items-center gap-2"
                >
                    <label
                        className="w-28 h-28 border border-primary bg-primary/20 rounded-full flex flex-col items-center justify-center cursor-pointer"
                        title="Imagem de perfil"
                    >
                        <Camera size={48} color="#22937E" />

                        <input 
                            type="file" 
                            multiple={false} 
                            className="hidden"
                        />
                    </label>
                    <small
                        className="w-28 text-center text-xs text-zinc-400"
                    >
                        Formato 1:1, com tamanho máximo de 5MB e nos formatos .png e .jpg
                    </small>
                </section>

                <section
                    className="mt-4"
                >
                    <legend>Dados pessoais</legend>

                    <div
                        className="grid grid-cols-2 gap-8 mt-6"
                    >
                        <div>
                            <input
                                type="text"
                                placeholder={"Nome"}
                                className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all ${errors.name && "border-red-500 focus:border-red-500"}`}
                                {...register("name")}
                            />
                            <span>
                                {
                                    errors.name?.message
                                }
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder={"Sobrenome"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                            {...register("lastName")}
                        />
                        <input
                            type="text"
                            placeholder={"CPF"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                            {...register("cpf")}
                        />
                        <input
                            type="text"
                            placeholder={"Data de nascimento"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                            {...register("date")}
                        />
                        <input
                            type="text"
                            placeholder={"Email"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                            {...register("email")}
                        />
                        <input
                            type="text"
                            placeholder={"Celular"}
                            className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                            {...register("cell")}
                        />
                        <div>
                            <input
                                type="password"
                                placeholder={"Senha"}
                                className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                                onChange={e => {
                                    setValueInput(e.target.value)
                                }}
                                value={valueInput}
                                // {...register("pass")}
                            />
                            <ProgressPass password={valueInput} />
                        </div>
                        <input
                            type="password"
                            placeholder={"Confirmar senha"}
                            className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                            {...register("configPass")}
                        />
                    </div>
                </section>

                <section
                    className="mt-4"
                >
                    <legend>
                        Endereço
                    </legend>

                    <div
                        className="flex gap-8 mt-6"
                    >
                        <input
                            type="text"
                            placeholder={"CEP"}
                            className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"Cidade"}
                            className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"Estado"}
                            className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                    </div>
                    <div
                        className="flex gap-8 mt-6"
                    >
                        <input
                            type="text"
                            placeholder={"Endereço"}
                            className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"nº"}
                            className="h-fit border border-zinc-400 w-40 rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                    </div>
                    <div
                        className="flex gap-8 mt-6"
                    >
                        <input
                            type="text"
                            placeholder={"Complemento"}
                            className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                        <input
                            type="text"
                            placeholder={"Bairro"}
                            className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        />
                    </div>
                </section>

                <section
                    className="w-full flex justify-center mt-6"
                >
                    <label
                        className="flex items-center gap-3"
                    >
                        <input type="checkbox" className="accent-primary w-4 h-4" />
                        <strong
                            className="text-base font-normal"
                        >
                            Para prosseguir, é necessário concordar com todos os <a href="#" className="text-primary"> termos de privacidade</a>.
                        </strong>
                    </label>
                </section>
                
                <button type="submit">Enviar</button>

            </form>

        </section>
    )
}
