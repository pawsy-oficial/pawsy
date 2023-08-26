import { Camera, XCircle } from "@phosphor-icons/react";
import { useState } from "react";
import ProgressPass from "../progress/progressPass";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { InputFormRegister } from "../inputsComponents";

const birthdate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

const schema = Yup.object({
    name: Yup.string().required("Campo obrigatório").min(2, "O nome deve ter mais de 2 caracteres"),
    lastName: Yup.string().required("Campo obrigatório").min(2, "O sobrenome deve ter mais de 2 caracteres"),
    email: Yup.string().required("Campo obrigatório").email("Digite um endereço de e-mail válido"),
    cpf: Yup.string().required("Campo obrigatório").length(14, "O CPF deve ter 11 dígitos").test("cpf-valido", "CPF inválido", (cpf) => handleValidationCPF(cpf)),
    cell: Yup.string().required("Campo obrigatório").matches(/^\(\d{2}\)\s\d{9}$/, "Número de celular inválido. Use o formato (99) 999999999"),
    date: Yup.date().typeError('Deve ser uma data').required("Campo obrigatório").max(birthdate, "A conta só pode ser criada para maiores de 18 anos"),
    password: Yup.string().required(),
    confirm_password: Yup.string().required("Campo obrigatório").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    CRMV: Yup.string().required("Campo obrigatório").length(6),
    terms: Yup.bool().oneOf([true], 'Você precisa aceitar os termos'),
})

function handleValidationCPF(cpf) {
    const format = cpf.replace(/[^\d]+/g,'');
    let firstDigit = format[9];
    let secondDigit = format[10];

    if (format == "00000000000" || 
        format == "11111111111" || 
        format == "22222222222" || 
        format == "33333333333" || 
        format == "44444444444" || 
        format == "55555555555" || 
        format == "66666666666" || 
        format == "77777777777" || 
        format == "88888888888" || 
        format == "99999999999")
        return false;

    const firstDigitCalculate = calculateDigits(format, 10, 8);

    const secondDigitCalculate = calculateDigits(format, 11, 9);

    return (firstDigit == firstDigitCalculate) && (secondDigit == secondDigitCalculate)
}

function calculateDigits(digits, count, repeat) {
    let countMultiple = count;
    let sumDigits = 0;

    for (let i = 0; i <= repeat; i++) {
        const calc = parseInt(digits[i]) * countMultiple;
        sumDigits += calc;
        countMultiple--;
    }

    let resultDigit = sumDigits % 11;

    if (resultDigit == 0 || resultDigit == 1) {
        return 0;
    } else {
        return 11 - resultDigit;
    }
}


export default function RegisterFormVeterinary({ userType }) {

    const [valueInput, setValueInput] = useState('')
    const [cpf, setCpf] = useState('')
    const [cellValue, setCellValue] = useState('')
    const [CRMV, setCRMV] = useState('')

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
            className="bg-white rounded-lg py-8 px-5 flex flex-col gap-8 max-w-2xl mb-28"
        >
            <h2
                className="font-sora text-[2rem] font-semibold"
            >
                Criar nova conta
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
            >
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
                                ariaInvalid={errors.cpf ? "true" : "false"}
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
                            <InputFormRegister
                                mask={"(99) 999999999"}
                                nameRegister={'cell'}
                                onChange={e => setCellValue(e.target.value)}
                                value={cellValue}
                                register={register}
                                placeholder={"Celular"}
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

                                value={valueInput}
                                {...register("password", {
                                    onChange: e => {
                                        setValueInput(e.target.value)
                                    }
                                })}
                            />
                            <ProgressPass password={valueInput} />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder={"Confirmar senha"}
                                className="h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                                {...register("confirm_password")}
                            />
                            {
                                errors.confirm_password &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.confirm_password?.message
                                    }
                                </small>
                            }
                        </div>
                    </div>
                </section>

                <section
                    className="mt-4"
                >
                    <legend>
                        Dados profissionais
                    </legend>

                    <div
                        className="flex gap-8 mt-6"
                    >
                        <select
                            name="especialidade"
                            className="w-full py-2 pl-6 border rounded-lg border-zinc-400 h-fit"
                        >
                            <option value="Cirurgião">Cirurgião</option>
                        </select>

                        <div
                            className="w-full"
                        >
                            <InputFormRegister
                                mask={"99.999"}
                                onChange={e => setCRMV(e.target.value)}
                                value={CRMV}
                                placeholder={"CRMV"}
                                register={register}
                                nameRegister={"CRMV"}
                            />
                            {
                                errors.CRMV &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.CRMV?.message
                                    }
                                </small>
                            }
                        </div>
                    </div>
                </section>

                <section
                    className="w-full flex flex-col justify-center mt-6"
                >
                    <div
                        className="flex "
                    >
                        <label
                            className="flex items-center gap-3"
                        >
                            <input
                                type="checkbox"
                                className="accent-primary w-4 h-4"
                                {...register("terms")}
                            />
                            <strong
                                className="text-base font-normal"
                            >
                                Para prosseguir, é necessário concordar com todos os <a href="#" className="text-primary"> termos de privacidade</a>.
                            </strong>
                        </label>
                    </div>

                    {
                        errors.terms &&
                        <small
                            className="text-red-error flex items-center gap-2 mt-1"
                        >
                            <XCircle size={18} />
                            {
                                errors.terms?.message
                            }
                        </small>
                    }

                </section>

                <button
                    type="submit"
                    className="bg-[#304C52] hover:bg-[#253d42] py-3 w-full text-base text-white rounded-lg uppercase font-bold font-lato mt-8"
                >
                    Enviar
                </button>

            </form>

        </section>
    )
}
