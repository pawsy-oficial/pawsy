import { Pen, XCircle } from '@phosphor-icons/react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { InputFormRegisterCEP } from '../inputsComponents';
import { Controller, useForm } from "react-hook-form";
import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';


function ModalDialogEditAddress({ setAddress }) {

    const [cep, setCep] = useState('')
    const [errorCep, setErrorCep] = useState(false)
    const [loadingCep, setLoadingCep] = useState(false)

    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [state, setState] = useState('')
    const [street, setStreet] = useState('')
    const [ showModal, setShowModal ] = useState(false)
    // const navigate = useNavigate()

    const { register, handleSubmit, formState, setValue, setError, control } = useForm({
        // resolver: yupResolver(schema),
        mode: "all"
    })


    // CEP
    const [uf, setUf] = useState([])
    const [selectUf, setSelectUf] = useState("")

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

    const onSubmite = (data)=>{
        data.uf = selectUf
        console.log(data);

        setAddress(data)
        setShowModal(false)
    }


    return (
        <>
            
            <button
                className='bg-primary p-2 rounded hover:bg-primary/90'
                type='button'
                onClick={()=>setShowModal(true)}
            >
                <Pen color='#ffffff' weight='bold' />
            </button>
            
            {
                showModal && (
                    ReactDOM.createPortal(

                        <section 
                            className='fixed z-[800] inset-0 bg-primary/50'
                            onClick={e => {
                                if(e.target.localName == "section") setShowModal(false)
                            }}
                        >
                            <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white py-4 px-16 rounded-lg">
                                <div asChild className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                                    <form
                                        className=''
                                        onSubmit={handleSubmit(onSubmite)}
                                    >

                                        <legend className='font-sora'>
                                            Alterar endereço
                                        </legend>

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

                                        <div className="flex justify-end gap-6 mt-6">
                                            {/* <AlertDialog.Cancel asChild> */}
                                                <button
                                                    className="hover:bg-red-error hover:text-white transition-all rounded py-1 px-4 text-red-error border border-red-error "
                                                    type='button'
                                                    onClick={()=>setShowModal(false)}
                                                >
                                                    Cancelar
                                                </button>
                                            {/* </AlertDialog.Cancel>
                                            <AlertDialog.Action> */}
                                                <button 
                                                    className="bg-green-600 rounded py-1 px-4 text-white"
                                                    type='submit'
                                                >
                                                    Alterar
                                                </button>
                                            {/* </AlertDialog.Action> */}
                                        </div>
                                    </form>
                                </div>
                            </main>
                        </section>, document.body
                    )
                )
            }
        </>
    )
}

export default memo(ModalDialogEditAddress)