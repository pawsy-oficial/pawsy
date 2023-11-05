import axios from "axios";
import { useForm } from "react-hook-form"

export default function ModalEditObs(props) {
    const { handleSubmit, register } = useForm({
        mode: "onSubmit"
    })

    const onSubmit = (data)=>{
        console.log(data, props.idPet);
        data["idPet"] = props.idPet
        axios.post(`${import.meta.env.VITE_URL}/update-pet?note=true`, data)
        .then(e => console.log(e))
        .catch(err => console.log(err))
    }

    if (props.isOpen) {
        return (
            <section 
                className="fixed inset-0 bg-primary/80 flex justify-center items-center"
                onClick={e => e.target.tagName == "SECTION" && props.setOpen(!props.isOpen)}
            >
                <div className="p-6 rounded-lg bg-white w-1/2 max-w-xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <h3
                            className="text-lg font-lato font-semibold"
                        >
                            Editar dados
                        </h3>
                        <div
                            className="my-6"
                        >
                            <fieldset 
                                className="flex flex-col gap-2 border rounded-md"
                            >
                                <legend 
                                    className="text-base font-lato font-semibold text-zinc-600 px-3"
                                >
                                    Medidas do Pet
                                </legend>
                                <div
                                    className="px-3 py-4"
                                >
                                    <div className="flex gap-3">
                                        <label 
                                            className="flex gap-2 flex-col flex-1"
                                        >
                                            <span>Peso:</span>
                                            <input 
                                                type="number" 
                                                placeholder="kg"
                                                className="border border-primary rounded-lg px-2 py-1"
                                                {...register("weight")}
                                            />
                                        </label>
                                        <label 
                                            className="flex gap-2 flex-col flex-1"
                                        >
                                            <span>Altura:</span>
                                            <input 
                                                type="number" 
                                                placeholder="cm"
                                                className="border border-primary rounded-lg px-2 py-1"
                                                {...register("height")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset 
                                className="flex flex-col gap-2 border rounded-md"
                            >
                                <legend 
                                    className="text-base font-lato font-semibold text-zinc-600 px-3"
                                >
                                    Observações
                                </legend>
                                <div
                                    className="px-3 py-4"
                                >
                                    <div className="flex flex-col gap-3">
                                        <label 
                                            className="flex items-center gap-2 justify-between"
                                        >
                                            <span
                                                className=""
                                            >
                                                Alergia e medicamentos:
                                            </span>
                                            <input 
                                                type="text" 
                                                className="w-1/2 border border-primary rounded-lg px-2 py-1"
                                                {...register("drug")}
                                            />
                                        </label>
                                        <label 
                                            className="flex items-center gap-2 justify-between"
                                        >
                                            <span>Castrado(a):</span>
                                            <select 
                                                type="text" 
                                                className="w-1/2 border border-primary rounded-lg px-2 py-1"
                                                {...register("castrated")}
                                            >
                                                <option value={1}>Sim</option>
                                                <option value={0}>Não</option>
                                            </select>
                                        </label>
                                        <label 
                                            className="flex items-center gap-2 justify-between"
                                        >
                                            <span>Comportamento:</span>
                                            <input 
                                                type="text" 
                                                className="w-1/2 border border-primary rounded-lg px-2 py-1"
                                                {...register("behavior")}
                                            />
                                        </label>
                                        <label 
                                            className="flex items-center gap-2 justify-between"
                                        >
                                            <span>Tratemento:</span>
                                            <input 
                                                type="text" 
                                                className="w-1/2 border border-primary rounded-lg px-2 py-1"
                                                {...register("treatment")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        
                        <div 
                            className="flex gap-4 w-full justify-end"
                        >
                            <button 
                                type="button"
                                onClick={() => props.setOpen(!props.isOpen)} 
                                className="text-center bg-red-error rounded-lg px-6 py-1 text-white"
                            >
                                Cancelar
                            </button>
                            <button 
                                className="text-center bg-primary rounded-lg px-6 py-1 text-white"
                                type="submit"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )

    }
}