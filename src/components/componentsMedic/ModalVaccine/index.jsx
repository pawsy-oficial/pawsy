import style from "./ModalVaccine.module.css";
import { FloppyDisk, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export function ModalVaccine({
    isOpenVaccine,
    setOpenVaccine,
    idPet,
    idClinic,
}) {
    const [vacina, setVacina] = useState("");
    const [retorno, setRetorno] = useState("");
    const [infoMedic, setInfoMedic] = useState([]);

    const tokenMedic = Cookies.get("jwtTokenMedic");

    const location = useLocation();

    // section form

    const { handleSubmit, register } = useForm({
        mode: "onSubmit",
    });

    // end section form

    const onSubmit = (data) => {
        const dataForm = {
            vacina: data.typeVaccine,
            id_pet: idPet,
            id_clinic: idClinic,
            dt_retorno: data.return,
            id_medic: location.state.medic,
        };
        axios
            .post(`${import.meta.env.VITE_URL}/vaccine`, dataForm)
            .then((e) => {
                console.log(e);
                setOpenVaccine(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <section>
            {isOpenVaccine && (
                <div className="fixed inset-0 bg-primary/40 flex justify-center items-center">
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
                                <p className="text-xs">Proteção</p>
                                <select
                                    onChange={(e) => { }}
                                    className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary focus-visible:outline-none hover:border-primary"
                                    {...register("typeVaccine")}
                                >
                                    <option value="Antirrábica">Antirrábica</option>
                                    <option value="Viratec 10 CVL">Viratec 10 CVL</option>
                                    <option value="Giárdia">Giárdia</option>
                                    <option value="Leishmaniose">Leishmaniose</option>
                                    <option value="Gripe canina">Gripe canina</option>
                                    <option value="Polivalente">Polivalente</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xs">Data de Retorno</p>
                                <input
                                    {...register("return")}
                                    type="date"
                                    className="bg-gray-white rounded-lg pl-2 pr-4 w-full h-8 text-xs text-[#909090] border focus:border-primary"
                                />
                            </div>
                            <div className="flex flex-row place-content-end">
                                <button
                                    type="submit"
                                    className="flex items-center bg-[#22937E] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
                                >
                                    <FloppyDisk size={24} />
                                    SALVAR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
