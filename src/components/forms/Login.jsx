import { yupResolver } from "@hookform/resolvers/yup";
import { XCircle } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import * as Yup from "yup";
import { InputFormRegister } from "../inputsComponents";
import { useState } from "react";

// const schema = Yup.object({
//     password: Yup.string().required("Campo obrigatório"),
//     email: Yup.string().email("Digite um endereço de e-mail válido").required("Campo obrigatório"),
//     cnpj: Yup.string().required("Campo obrigatório").length(18, "O CNPJ deve ter 11 dígitos").test('valid-cnpj', 'CNPJ inválido', value => validarCNPJ(value))
// })

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

export default function LoginForm({ userType }) {
    const [cnpj, setCnpj] = useState('')

    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm({
        mode: "onSubmit"
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    // const { errors } = formState

    return (
        <form
            className="bg-white px-5 py-8 rounded-lg w-1/2 flex flex-col max-w-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2
                className="font-sora font-bold text-[32px]"
            >
                Login
            </h2>

            <div className="flex flex-col gap-4 mt-8">
                <div className="w-full">
                    {
                        userType == "clinica" 
                            ? <InputFormRegister
                                value={cnpj}
                                onChange={event => setCnpj(event.target.value)}
                                register={register}
                                mask={"99.999.999/9999-99"}
                                placeholder={"CNPJ"}
                                nameRegister={"cnpj"}
                            />
                            : <input
                                type="text"
                                placeholder={userType == "clinica" ? "CNPJ" : "Email"}
                                className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                                {...register("email")}
                            />

                    }
                    {/* {
                        errors.email &&
                        <small
                            className="text-red-error flex items-center gap-2 mt-1"
                        >
                            <XCircle size={18} />
                            {
                                errors.email?.message
                            }
                        </small>
                    } */}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        {...register("password")}
                    />
                    <a
                        className="text-primary underline text-xs cursor-pointer font-semibold"
                    >
                        Esqueci a senha
                    </a>
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <button
                    type="submit"
                    className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8"
                >
                    ENTRAR
                </button>
                <a
                    onClick={() => navigate("/cadastro", { state: { slug: userType } })}
                    className="mx-auto cursor-pointer"
                >
                    Criar uma nova conta
                </a>
            </div>

        </form>
    )
}