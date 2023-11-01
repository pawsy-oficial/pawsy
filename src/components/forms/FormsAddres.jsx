import { Pen, X, XCircle } from "@phosphor-icons/react";
import { InputFormRegisterCEP } from "../inputsComponents";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";

const schema = Yup.object({
    cep: Yup.string().required("Campo obrigatório").length(9, "CEP deve possuir 8 dígitos"),
    city: Yup.string().required("Campo obrigatório"),
    street: Yup.string().required("Campo obrigatório"),
    numberHome: Yup.number().typeError('Deve ser um número').positive("Deve ser um número positivo").integer("Deve ser um número inteiro").required("Campo obrigatório"),
    complement: Yup.string(),
    neighborhood: Yup.string().required("Campo obrigatório"),
    uf: Yup.string().required("Selecione um estado")
})

function FormsAddresProfile({edit, setEdit}) {

    const { register, handleSubmit, formState, setValue, setError } = useForm({
        resolver: yupResolver(schema),
        mode: "all"
    })


    // CEP

    const [cep, setCep] = useState('')
    const [errorCep, setErrorCep] = useState(false)
    const [loadingCep, setLoadingCep] = useState(false)

    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [state, setState] = useState('')
    const [street, setStreet] = useState('')

    const [uf, setUf] = useState([])
    const [selectUf, setSelectUf] = useState("")

    const token = Cookies.get("jwtTokenTutor")

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/uf`)
            .then(response => {
                setUf(response.data.result)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (cep.length == 9) {
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

                        setValue("cep", cep, { shouldValidate: true })
                        if (data.street) {
                            setValue("street", data.street)
                        }
                        else setValue("street", "")
                        if (data.city) {
                            setValue("city", data.city)
                        }
                        else setValue("city", "")
                        if (data.state) {
                            setValue("state", data.state)
                            setSelectUf(
                                uf.map(e => e.nm_estado).indexOf(data.state) + 1
                            )
                            setState(data.state)
                        }
                        else setValue("state", "")
                        if (data.neighborhood) {
                            setValue("neighborhood", data.neighborhood)
                        }
                        else setValue("neighborhood", "")
                    }
                )
                .catch(err => {
                    setLoadingCep(false)

                    setCity('')
                    setNeighborhood('')
                    setState('')
                    setStreet('')

                    setError("cep", { message: "CEP não encontrado" })
                    setValue("street", "")
                    setValue("city", "")
                    setValue("state", "")
                    setValue("neighborhood", "")

                })
                .finally(
                    () => {
                        setLoadingCep(false)
                        setErrorCep(false)
                    }
                )
        }
    }, [cep])

    const { errors } = formState

    const onSubmit = (data) => {

        const streetFormat = data.street.replace(/ /g, "%20")
        const cityFormat = data.city.replace(/ /g, "%20")
        const neighborhoodFormat = data.neighborhood.replace(/ /g, "%20")
        const urlGeocode = `https://dev.virtualearth.net/REST/v1/Locations?query=${streetFormat}%20${data.numberHome}%20${neighborhoodFormat}%20${cityFormat}%20&key=${import.meta.env.VITE_KEY_TOKEN_MAP}`

        axios.get(urlGeocode)
            .then((e) => {
                const [latitude, longitude] = e.data.resourceSets[0].resources[0].point.coordinates

                data.uf = selectUf
                data.idTutor = 1
                data.latitude = latitude
                data.longitude = longitude

                axios.put(`${import.meta.env.VITE_URL}/tutorAddress`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res=>{
                    // console.log(res);
                    setEdit(!edit)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    }

    return (
        <form
            className=''
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className='flex gap-2 items-center'
            >
                <h3
                    className='text-zinc-900 font-bold'
                >
                    Endereço
                </h3>
                <button
                    className='p-1 rounded-lg bg-primary text-white flex gap-2 items-center text-sm h-fit transition-all duration-1000'
                    type='submit'
                >
                    <Pen size={16} />
                    {
                        edit && "Confirmar"
                    }
                </button>
                <button
                    className="flex gap-1 items-center text-red-error"
                    type='button'
                    onClick={()=>setEdit(false)}
                >
                    <X size={16} color="#DC3545" />
                    {
                        edit && "Cancelar"
                    }
                </button>
            </div>
            
            <div
                className="flex gap-8 mt-6"
            >
                <div className="w-full">

                    <InputFormRegisterCEP
                        velue={cep}
                        onChange={e => setCep(e.target.value)}
                        loading={loadingCep}
                        register={register}
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

                    <select
                        type="text"
                        placeholder={"Estado"}
                        className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.uf && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                        disabled={loadingCep}
                        {...register("uf", {
                            onChange: (e) => {
                                const i = e.target.options.selectedIndex
                                console.log(i);
                                setSelectUf(i);
                            }
                        })
                        }
                    >
                        <option disabled>Estado</option>
                        {
                            uf.map(uf =>
                                <option
                                    value={uf.id_uf}
                                    selected={uf.nm_estado == state}
                                    onChangeCapture={() => console.log("ok")}
                                >
                                    {uf.nm_estado}
                                </option>
                            )
                        }
                    </select>
                    {
                        errors.uf &&
                        <small
                            className="text-red-error flex items-center gap-2 mt-1"
                        >
                            <XCircle size={18} />
                            {
                                errors.uf?.message
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
                        className={`h-fit border border-zinc-400 w-40 rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.numberHome && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                        {...register('numberHome')}
                    />
                    {
                        errors.numberHome &&
                        <small
                            className="text-red-error flex items-center gap-2 mt-1"
                        >
                            <XCircle size={18} />
                            {
                                errors.numberHome?.message
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
        </form>
    )
}

export default FormsAddresProfile