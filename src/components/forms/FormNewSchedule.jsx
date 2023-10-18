import { CaretLeft, Trash } from "@phosphor-icons/react"
import { memo, useEffect, useState } from "react"
import { InputDropDown } from "../inputsComponents"
import { useFieldArray, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
import axios from "axios"
import Cookies from "js-cookie"

function FormNewSchedule({ alterPage }) {
    const [veterinaryName, setVeterinaryName] = useState([])
    const [addNewRestriction, setAddNewRestriction] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtTokenClinic")}`
            }
        }).then(res => {
            const idClinic = res.data.storedIdClinica
            axios.get(`${import.meta.env.VITE_URL}/get-medicosIntegrados?idClinica=${idClinic}&all=true`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtTokenClinic")}`
                }
            }).then(response => {
                setVeterinaryName(response.data)
            })
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))

    }, [])

    const [valueTextArea, setValueTextArea] = useState("")
    const [sectionAddVeterinary, setSectionAddVeterinary] = useState([""])

    function heandleAddSection() {
        setSectionAddVeterinary([...sectionAddVeterinary, ""])
    }
    function heandleAddRestriction() {
        setAddNewRestriction([...addNewRestriction, ""])
    }

    function heandleRemoveSection() {
        const remove = [...sectionAddVeterinary]
        remove.pop()
        setSectionAddVeterinary(remove)
    }


    // start react hook form

    const { register, handleSubmit, control } = useForm({
        mode: "onSubmit"
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "restrições",
        shouldUnregister: true
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl"
        >
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => { alterPage(0) }}
            >
                <CaretLeft />
                <span>Voltar</span>
            </div>
            <h1 className="font-sora font-bold text-[32px]">Nova agenda</h1>

            <TitleSectionForm
                title={"Período da agenda"}
                description={"Informe o período em que a agenda ficará disponível para agendamento."}
            />

            <section className="border border-zinc-500 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg p-3 flex flex-col gap-3 w-full">
                <div className="flex justify-center gap-6">
                    <div className="flex flex-col gap-1">
                        <strong
                            className="text-base font-lato font-normal"
                        >
                            Data de abertura
                        </strong>
                        <input
                            type="date"
                            className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]"
                            placeholder="__/__/____"
                            {...register("open-date")}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <strong className="text-base font-lato font-normal">Data de fechamento</strong>
                        <input
                            type="date"
                            className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]"
                            placeholder="__/__/____"
                            {...register("close-date")}
                        />
                    </div>
                </div>


                <div className="flex flex-col items-center justify-center gap-6">
                    <button
                        // onClick={heandleAddRestriction}
                        onClick={() => append({ data: "" })}
                        className="text-zinc-800 underline cursor-pointer"
                    >
                        Possui alguma restrição de data?
                    </button>

                    <div
                        className="flex flex-col gap-2 items-center"
                    >
                        {
                            addNewRestriction.length > 0 && (
                                <strong className="text-base font-lato font-normal">
                                    {
                                        addNewRestriction.length == 1 ? "Data da restrição" : "Data das restrições"
                                    }
                                </strong>
                            )
                        }

                        {
                            fields.map((field, index) => (
                                <AddNewRestriction
                                    key={field.id}
                                    index={index}
                                    remove={remove}
                                    register={register}
                                />)
                            )
                        }
                    </div>
                </div>
            </section>

            <TitleSectionForm
                title={"Veterinário"}
                description={"Adicione o nome do veterinário, sua especialidade e os dias e horários disponíveis para atendimento."}
            />

            <section className="flex flex-col gap-6">
                {
                    sectionAddVeterinary.map(() => {
                        return <SectionAddVeterinary names={veterinaryName} />
                    })
                }
                {
                    sectionAddVeterinary.length == 0 && (
                        <span
                            className="text-zinc-400 text-center"
                        >
                            Adicione um médico veterinário para sua nova agenda
                        </span>
                    )
                }
                <div
                    className="w-full flex justify-center gap-6 text-primary font-lato font-bold"
                >
                    <span
                        className="cursor-pointer"
                        onClick={heandleAddSection}
                    >
                        adicionar mais
                    </span>
                    <span
                        className="cursor-pointer"
                        onClick={heandleRemoveSection}
                    >
                        remover
                    </span>
                </div>
            </section>

            <TitleSectionForm
                title={"Observação"}
            />

            <div className="w-full relative">
                <textarea
                    name="" id="" cols="30" rows="5"
                    className="resize-none w-full focus:border-primary focus:outline-primary p-2 rounded min-h-32"
                    onInput={(e) => {
                        const count = e.target.value.length
                        count <= 200 && setValueTextArea(e.target.value)
                    }}
                    value={valueTextArea}
                    {...register("observation")}
                />
                <span className="absolute right-2 bottom-2 font-lato text-zinc-400">{valueTextArea.length}/200</span>
            </div>

            <div className="w-full flex justify-center mt-10">
                <button
                    className="px-6 py-2 bg-primary rounded-lg text-white font-semibold"
                    type="submit"
                >
                    SALVAR
                </button>
            </div>
        </form>
    )
}

function TitleSectionForm({ title, description = "" }) {
    return (
        <div className="flex flex-col mb-2 mt-8">
            <h3 className="font-lato font-semibold text-2xl">{title}</h3>
            <p>{description}</p>
        </div>
    )
}

function SectionAddVeterinary({ names }) {
    const week = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "sábado"]
    const [selected, setSelected] = useState(0)
    return (
        <section className="border border-zinc-500 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg p-3 flex flex-col gap-3 w-full group">
            <div className="flex justify-between gap-6">
                <label
                    className="flex flex-col gap-1 w-1/2"
                >
                    <strong
                        className="text-base font-lato font-normal"
                    >
                        Veterinário
                    </strong>
                    <select
                        className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px] focus:outline-primary capitalize"
                        onChange={e => setSelected(e.target.selectedIndex)}
                    >
                        {
                            names.map(e => {
                                return (
                                    <option value={e.idMedico}>
                                        {e.nomeMedico}
                                    </option>
                                )
                            })
                        }
                    </select>
                </label>
                <label className="flex flex-col gap-1 w-1/2">
                    <strong className="text-base font-lato font-normal">Especialidade</strong>
                    <input
                        type="text"
                        className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px] capitalize"
                        value={names.length > 0 && names[selected].especialidade}
                        disabled
                    />
                </label>
            </div>
            <div className="flex justify-between gap-6">
                <label className="flex flex-col gap-1 w-1/2">
                    <strong className="text-base font-lato font-normal">Horário disponível</strong>
                    <div
                        className="flex gap-2 items-center"
                    >
                        <input
                            type="time"
                            step={300}
                            className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary capitalize w-1/2"
                        />
                        <span
                            className="text-base text-zinc-600"
                        >
                            às
                        </span>
                        <input
                            type="time"
                            step={300}
                            className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary capitalize w-1/2"
                        />
                    </div>
                </label>
                
                <label className="flex flex-col gap-1 w-1/2">
                    <strong className="text-base font-lato font-normal">Intervalo</strong>
                    <select
                        className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px] focus:outline-primary"
                    >
                        <option value="5">5 min</option>
                        <option value="10">10 min</option>
                        <option value="15">15 min</option>
                        <option value="20">20 min</option>
                        <option value="25">25 min</option>
                        <option value="30">30 min</option>
                        <option value="35">35 min</option>
                        <option value="40">40 min</option>
                        <option value="45">45 min</option>
                        <option value="50">50 min</option>
                        <option value="55">55 min</option>
                    </select>
                </label>
            </div>
            <div className="flex flex-col gap-1">
                <strong
                    className="text-base font-lato font-normal"
                >
                    Dias disponíveis
                </strong>
                <div
                    className="flex w-full justify-between gap-2"
                >
                    {
                        week.map(w => {
                            return <InputDropDown listData={w} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}


function AddNewRestriction({ index, register, remove }) {
    // const [inputValue, setInputValue] = useState(value)

    // useEffect(()=>{
    //     setInputValue(value)
    // },[value])


    // function heandleRemoveRestriction(i){
    //     const restriction = [...restrictions]
    //     restriction.splice(i, 1)
    //     restrictionControl(restriction)
    // }
    // function handleInputRestriction(){
    //     let allArr = []
    //     allArr.push(...restrictions)
    //     allArr.push(inputValue)
    //     allArr.splice(index, 1)
    //     restrictionControl(allArr)
    // }

    return (
        <div className="flex justify-center gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex">
                    <input
                        type="date"
                        className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px]"
                        placeholder="__/__/____"
                        // onChange={(e)=>setInputValue(e.target.value)}
                        // onBlur={handleInputRestriction}
                        // value={inputValue}
                        {...register(`restrições.${index}.data`)}
                    />
                    <button
                        onClick={() => remove(index)}
                        className="cursor-pointer flex items-center justify-center bg-primary text-white rounded-tr-lg rounded-br-lg px-4 -translate-x-1"
                    >
                        <Trash weight={"bold"} size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(FormNewSchedule)