import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from "react";

const schema = Yup.object().shape({
    email: Yup.string().email("Digite um endereço de e-mail válido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
});

export default function LoginFormTutor() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const [loginError, setLoginError] = useState(null);

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_URL}/loginTutor`;
            console.log("URL chamada:", url);
            
            const response = await axios.post(url, data);

            console.log("Resposta:", response.data);

            Cookies.set('jwtTokenTutor', response.data.token, { expires: 1/3 }); //8 horas
            
            navigate('/tutor');
        } catch (error) {
            console.error("Erro na chamada API:", error);

            if (error.response && error.response.status === 400) {
                setLoginError('E-mail ou senha estão incorretas');
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

            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}

            <div className="flex flex-col gap-4 mt-8">
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all"
                        {...register("email")}
                    />
                    {errors.email &&
                        <small className="text-red-error flex items-center gap-2 mt-1">
                            {errors.email.message}
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
                    <a className="text-primary underline text-xs cursor-pointer font-semibold"
                       onClick={() => navigate("/recuperar-senha", { state: { auth: "a" } })}>
                        Esqueci a senha
                    </a>
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <button type="submit" className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8">
                    ENTRAR
                </button>
                <a 
                    onClick={(event) => {
                        event.preventDefault();
                        navigate("/cadastro", { state: { slug: "tutor" } });
                    }} 
                    className="mx-auto cursor-pointer"
                >
                    Criar uma nova conta
                </a>
            </div>
        </form>
    )
}
