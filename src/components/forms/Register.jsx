import { Camera, XCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ProgressPass from "../progress/progressPass";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { InputFormRegister } from "../inputsComponents";
import axios from "axios";

const birthdate = new Date(new Date().setFullYear(new Date().getFullYear() - 16))

const schema = Yup.object({
    name: Yup.string().required("Campo obrigatório").min(2, "O nome deve ter mais de 2 caracteres"),
    lastName: Yup.string().required("Campo obrigatório").min(2, "O sobrenome deve ter mais de 2 caracteres"),
    email: Yup.string().required("Campo obrigatório").email("Digite um endereço de e-mail válido"),
    cpf: Yup.string().required("Campo obrigatório").length(14, "O CPF deve ter 11 dígitos"),
    cell: Yup.string().required("Campo obrigatório").matches(/^\(\d{2}\)\s\d{9}$/, "Número de celular inválido. Use o formato (99) 999999999"),
    date: Yup.date().max(birthdate, "A conta só pode ser criada para maiores de 16 anos"),
    cep: Yup.string().required("Campo obrigatório").length(8, "CEP deve possuir 8 dígitos"),
    city: Yup.string().required("Campo obrigatório"),
    street: Yup.string().required("Campo obrigatório"),
    number: Yup.number().positive("Deve ser um número positivo").integer("Deve ser um número inteiro").required("Campo obrigatório"),
    complement: Yup.string(),
    neighborhood: Yup.string().required("Campo obrigatório")
})

export default function RegisterForm({ userType }) {

    const [valueInput, setValueInput] = useState('')
    const [cpf, setCpf] = useState('')
    const [cellValue, setCellValue] = useState('')
    const [cep, setCep] = useState('')
    const [errorCep, setErrorCep] = useState(false)
    const [loadingCep, setLoadingCep] = useState(false)

    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [state, setState] = useState('')
    const [street, setStreet] = useState('')

    useEffect(() => {
        setLoadingCep(true)

        axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
            .then(
                response => {
                    setLoadingCep(false)
                    const { data } = response

                    setCity(data.city)
                    setNeighborhood(data.neighborhood)
                    setState(data.state)
                    setStreet(data.street)
                }
            )
            .catch(err => {
                setLoadingCep(false)
                console.error(err);

                setCity('')
                setNeighborhood('')
                setState('')
                setStreet('')

                // if (err.response.status === 404) {
                //     setErrorCep(true)
                // }
            })
            .finally(() => {
                setLoadingCep(false)
                setErrorCep(false)
            }
            )


    }, [cep])

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })
    const onSubmit = (data) => {
        console.log(data);
    }

    const { errors } = formState


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
                                className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all ${errors.name && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register("name")}
                            />
                            {
                                errors.name &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.name?.message
                                    }
                                </small>
                            }
                        </div>

                        <div>

                            <input
                                type="text"
                                placeholder={"Sobrenome"}
                                className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all ${errors.lastName && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register("lastName")}
                            />
                            {
                                errors.lastName &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.lastName?.message
                                    }
                                </small>
                            }
                        </div>

                        <div>
                            <InputFormRegister
                                value={cpf}
                                onChange={event => setCpf(event.target.value)}
                                register={register}
                                error={errors}
                                mask={"999.999.999-99"}
                                placeholder={"CPF"}
                                nameRegister={"cpf"}
                            />
                            {
                                errors.cpf &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.cpf?.message
                                    }
                                </small>
                            }
                        </div>

                        <div>
                            <input
                                type="date"
                                // max={"2005-12-31"}
                                placeholder={"Data de nascimento"}
                                className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all ${errors.date && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register("date")}
                            />
                            {
                                errors.date &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.date?.message
                                    }
                                </small>
                            }
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder={"Email"}
                                className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all ${errors.email && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register("email")}
                            />
                            {
                                errors.email &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.email?.message
                                    }
                                </small>
                            }
                        </div>

                        <div>
                            {/* <input
                                type="text"
                                placeholder={"Celular"}
                                className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all ${errors.cell && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register("cell")}
                            /> */}

                            <InputFormRegister
                                mask={"(99) 999999999"}
                                nameRegister={'cell'}
                                onChange={e => setCellValue(e.target.value)}
                                value={cellValue}
                                register={register}
                                placeholder={"celular"}
                            />

                            {
                                errors.cell &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.cell?.message
                                    }
                                </small>
                            }
                        </div>

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
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder={"CEP"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.cep && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                // onBlur é sobrescrito pelo onBlur da Lib 
                                {...register('cep', {
                                    onBlur: // onBlur da lib React-hook-form
                                        event => {
                                            setCep(event.target.value)
                                        }
                                })}
                            />
                            {
                                (errors.cep || errorCep) &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.cep ? errors.cep?.message : "CEP não encontrado"
                                    }
                                </small>
                            }
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                placeholder={"Cidade"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.city && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                value={city}
                                {...register('city', {
                                    onChange: event => setCity(event.target.value)
                                })}
                            />
                            {
                                errors.city &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.city?.message
                                    }
                                </small>
                            }
                        </div>

                        <div className="w-full">

                            <input
                                type="text"
                                placeholder={"Estado"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.cep && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                value={state}
                            />
                            {
                                errors.state &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.state?.message
                                    }
                                </small>
                            }
                        </div>
                    </div>
                    <div
                        className="flex gap-8 mt-6 w-full"
                    >
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder={"Endereço"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.street && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                value={street}
                                {...register('street', {
                                    onChange: event => setStreet(event.target.value)
                                })}
                            />


                            {
                                errors.street &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.street?.message
                                    }
                                </small>
                            }
                        </div>

                        <div>

                            <input
                                type="text"
                                placeholder={"nº"}
                                className={`h-fit border border-zinc-400 w-40 rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.number && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register('number')}
                            />
                            {
                                errors.number &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.number?.message
                                    }
                                </small>
                            }
                        </div>
                    </div>
                    <div
                        className="flex gap-8 mt-6"
                    >
                        <div className="w-full">

                            <input
                                type="text"
                                placeholder={"Complemento"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.complement && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register('complement')}
                            />
                            {
                                errors.complement &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.complement?.message
                                    }
                                </small>
                            }
                        </div>

                        <div className="w-full">

                            <input
                                type="text"
                                placeholder={"Bairro"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.neighborhood && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                value={neighborhood}
                                {...register('neighborhood', {
                                    onChange: event => setNeighborhood(event.target.value)
                                })}
                            />
                            {
                                errors.neighborhood &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.neighborhood?.message
                                    }
                                </small>
                            }
                        </div>
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
