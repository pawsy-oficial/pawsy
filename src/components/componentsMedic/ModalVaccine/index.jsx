import { X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import dayJs from "dayjs"
import * as Yup from "yup"
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
    typeVaccine: Yup.string().required("Campo obrigatório"),
    return: Yup.date().required("Campo obrigatório").min(dayjs().add(1, "month").format("YYYY-MM-DD"))
})

export function ModalVaccine({
    isOpenVaccine,
    setOpenVaccine,
    idPet,
    idClinic,
    animalType,
    nameMedic,
    lastName
}) {
    
    const [ typeVaccine, setTypeVaccine ] = useState([])
    const [ selectedOption, setSelectedOption ] = useState(0)

    animalType = animalType == "cachorro" ? "dog" : "cat"

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}/get-all-type-vaccines?breedType=${animalType}`)
        .then(result => {
            setTypeVaccine(result.data.result)
        })
        .catch(err => console.log(err))
    },[])

    const location = useLocation();

    // section form

    const { handleSubmit, register, formState } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });

    const { errors } = formState

    // end section form

    const onSubmit = (data) => {
        const nameVaccine = typeVaccine[selectedOption].nameVaccine;
        
        const dataForm = {
            vacina: parseInt(data.typeVaccine),
            id_pet: idPet,
            id_clinic: idClinic,
            dt_retorno: data.return,
            id_medic: location.state.medic,
            description: `Seu pet recebeu a vacina ${nameVaccine} de ${nameMedic} ${lastName}, garantindo que ele esteja protegido e saudável.`
        };


        axios.post(`${import.meta.env.VITE_URL}/vaccine`, dataForm)
            .then((e) => {
                axios.post(`${import.meta.env.VITE_URL}/history`, dataForm)
                .then(f => {
                    console.log(f);
                    setOpenVaccine(false);
                })
                .catch(err => console.log(err))
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <section>
            {
                isOpenVaccine && (
                <section 
                    className="fixed inset-0 bg-primary/40 flex justify-center items-center"
                    onClick={e => e.target.tagName === "SECTION" && setOpenVaccine(false)}
                >
                    <div className="flex flex-col fixed bg-white p-6 rounded-lg min-w-[22rem]">
                        <button
                            onClick={() => setOpenVaccine(false)}
                            className="absolute left-80"
                        >
                            <X size={24} color="#22937E" />
                        </button>
                        <h2 className="text-2xl font-semibold">Registrar nova dose</h2>

                        <form
                            className="flex pt-6 flex-col gap-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">Proteção</p>
                                <select
                                    className="bg-gray-white rounded-lg py-1 px-4 w-full text-base border focus:border-primary focus-visible:outline-none hover:border-primary"
                                    {...register("typeVaccine", {
                                        onChange: e => setSelectedOption(e.target.selectedIndex)
                                    })}
                                >
                                    {
                                        typeVaccine.map(tp => {
                                            return(
                                                <option 
                                                    value={tp.idVaccine}
                                                >
                                                    {tp.nameVaccine}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                {
                                    errors.typeVaccine && <span className="text-red-error text-sm" >{errors.typeVaccine.message}</span>
                                }
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">Data de Retorno</p>
                                <input
                                    {...register("return")}
                                    type="date"
                                    min={dayJs().add(1, "month").format("YYYY-MM-DD")}
                                    className="bg-gray-white rounded-lg py-1 px-4 w-full text-base border focus:border-primary"
                                />
                                {
                                    errors.return && <span className="text-red-error text-sm" >{errors.return.message}</span>
                                }
                            </div>
                            <div className="flex flex-row place-content-end">
                                <button
                                    type="submit"
                                    className="flex items-center bg-[#22937E] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
                                >
                                    SALVAR
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </section>
    );
}
