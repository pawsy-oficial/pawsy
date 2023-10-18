import { memo } from "react";
import { Controller } from "react-hook-form";
import { InputDropDown } from "../../inputsComponents";
import { X } from "@phosphor-icons/react";

function SectionAddVeterinary({ names, remove, index, register, control, setValue }) {
    const week = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "sábado"]

    const handleVeterinarioChange = (selectedVeterinario) => {
        const novaEspecialidade = names.find((veterinario) => veterinario.nomeMedico === selectedVeterinario)?.especialidade;
        setValue(`Available.${index}.specialty`, novaEspecialidade);
    };

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
                        {...register(`Available.${index}.name`, {
                            onChange: e => handleVeterinarioChange(e.target.value)
                        })}
                    >
                        {
                            names.map(e => {
                                return (
                                    <option value={e.nomeMedico}>
                                        {e.nomeMedico}
                                    </option>
                                )
                            })
                        }
                    </select>
                </label>
                <label className="flex flex-col gap-1 w-1/2">
                    <strong className="text-base font-lato font-normal">Especialidade</strong>
                    <Controller
                        control={control}
                        name={`Available.${index}.specialty`}
                        render={({ field }) => {
                            return (
                                <input
                                    type="text"
                                    className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px] capitalize"
                                    {...field}
                                    readOnly
                                />
                            )
                        }}
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
                            {...register(`Available.${index}.hr_open_medic`)}
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
                            {...register(`Available.${index}.hr_close_medic`)}
                        />
                    </div>
                </label>

                <label className="flex flex-col gap-1 w-1/2">
                    <strong className="text-base font-lato font-normal">Intervalo</strong>
                    <select
                        className="py-1 px-6 rounded-lg border border-zinc-300 focus:border-primary min-w-[256px] focus:outline-primary"
                        {...register(`Available.${index}.interval`)}
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
                            return <InputDropDown listData={w} register={register} index={index} />
                        })
                    }
                </div>
            </div>
            <span
                className="cursor-pointer text-red-error flex gap-2 items-center w-fit"
                onClick={() => remove(index)}
            >
                <X color="#DC3453" size={16}/>
                Remover
            </span>
        </section>
    )
}


export default memo(SectionAddVeterinary)