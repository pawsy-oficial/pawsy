import { CaretLeft, PlusCircle } from "@phosphor-icons/react"
import { memo, useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import axios from "axios"
import Cookies from "js-cookie"
import SectionVeterinary from "./schedule/SectionVeterinary"
import Restriction from "./schedule/Restriction"

function FormNewSchedule({ alterPage }) {
    const [veterinaryName, setVeterinaryName] = useState([])
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

    // start react hook form

    const { register, handleSubmit, control, setValue } = useForm({
        mode: "onSubmit"
    })

    const { fields: fieldsRestriction, append: appendRestriction, remove: removeRestriction } = useFieldArray({
        control,
        name: "restriction",
        shouldUnregister: true
    })
    const { fields: fieldsAvailable, append: appendAvailable, remove: removeAvailable } = useFieldArray({
        control,
        name: "Available",
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
                        type="button"
                        onClick={() => appendRestriction({ data: "" })}
                        className="text-zinc-800 underline cursor-pointer"
                    >
                        Possui alguma restrição de data?
                    </button>

                    <div
                        className="flex flex-col gap-2 items-center"
                    >
                        {
                            fieldsRestriction.length > 0 && (
                                <strong className="text-base font-lato font-normal">
                                    {
                                        fieldsRestriction.length == 1 ? "Data da restrição" : "Data das restrições"
                                    }
                                </strong>
                            )
                        }

                        {
                            fieldsRestriction.map((field, index) => (
                                <Restriction
                                    key={field.id}
                                    index={index}
                                    removeRestriction={removeRestriction}
                                    register={register}
                                />
                            ))
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
                    fieldsAvailable.map((field, index) => {
                        return (
                            <SectionVeterinary
                                key={field.id}
                                index={index}
                                names={veterinaryName}
                                remove={removeAvailable}
                                register={register}
                                control={control}
                                setValue={setValue}
                            />
                        )
                    })
                }
                {
                    fieldsAvailable.length == 0 && (
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
                        className="cursor-pointer flex gap-2 items-center"
                        onClick={() => appendAvailable({ name: "", specialty: "", hr_open_medic: "", hr_close_medic: "", interval: "", week: [] })}
                    >
                        <PlusCircle color="#22B77e" size={16} />
                        adicionar mais
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

export default memo(FormNewSchedule)