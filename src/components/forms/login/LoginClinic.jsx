import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from "react";
import { InputFormRegister } from "../../inputsComponents";

const schema = Yup.object().shape({
    cnpj: Yup.string()
        .required("Campo obrigatório")
        .matches(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, "Formato do CNPJ inválido"),
    password: Yup.string().required("Campo obrigatório"),
});

export default function LoginFormClinic() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const [loginError, setLoginError] = useState(null); // Adicionei a definição do estado aqui.

    const onSubmit = async (data) => {
        // Removendo a máscara do CNPJ:
        data.cnpj = data.cnpj.replace(/[.\-\/]/g, "");
        
        try {
            const url = `${import.meta.env.VITE_URL}/loginClinic`;
            const response = await axios.post(url, data);

            Cookies.set('jwtTokenClinic', response.data.token, { expires: 1/3 }); // 8 horas
            navigate('/clinica');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setLoginError('CNPJ ou senha estão incorretos');
            } else {
                setLoginError('Erro ao tentar fazer login. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <form
            className="bg-white px-5 py-8 rounded-lg w-full md:w-1/2 flex flex-col max-w-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="font-sora font-bold text-[32px]">Login</h2>

            {loginError && <p className="text-red-500 mb-4">{loginError}</p>} {/* Mostrar erro, se houver. */}
            
            <div className="flex flex-col gap-4 mt-8">
                <div>
                    <InputFormRegister
                        register={register}
                        mask={"99.999.999/9999-99"}
                        placeholder={"CNPJ"}
                        nameRegister={"cnpj"}
                    />
                    {errors.cnpj &&
                        <small className="text-red-error flex items-center gap-2 mt-1">
                            {errors.cnpj.message}
                        </small>
                    }
                </div>
                
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        {...register("password")}
                    />
                    {errors.password &&
                        <small className="text-red-error flex items-center gap-2 mt-1">
                            {errors.password.message}
                        </small>
                    }
                </div>
                
                <button type="submit" className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8">
                    ENTRAR
                </button>
            </div>
        </form>
    )
}
