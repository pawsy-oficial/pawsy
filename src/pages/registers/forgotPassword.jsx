import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderLogin } from "../../components/header/Header";
import GoBack from "../../components/buttons/GoBack";
import { CardNotificationRegisters } from "../../components/cardsAndBoxes/cardNotificationRegister";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { XCircle } from "@phosphor-icons/react";
import ImputMask from "react-input-mask";
import axios from "axios";

const schemaEmail = Yup.object({
    "email": Yup.string().email("Endereço de email inválido").required("Campo obrigatório"),
});

const schemaCode = Yup.object({
    "code": Yup.string().required("Campo obrigatório"),
});

const schemaPassword = Yup.object({
    "password": Yup.string().min(8, "Senha deve ter pelo menos 8 caracteres").required("Campo obrigatório"),
});

const schemaReset = Yup.object({
    code: Yup.string().required("Código obrigatório").matches(/^[\w\d]{8}$/, "O código deve ter 8 dígitos"),
    password: Yup.string()
        .required("Senha obrigatória")
        .min(8, "Senha deve ter pelo menos 8 caracteres")
        .matches(/(?=.*[a-z])/, "A senha deve ter ao menos uma letra minúscula")
        .matches(/(?=.*[A-Z])/, "A senha deve ter ao menos uma letra maiúscula")
        .matches(/(?=.*[0-9])/, "A senha deve ter ao menos um número")
        .matches(/(?=.*[!@#$%^&*])/, "A senha deve ter ao menos um caractere especial"),
    confirmPassword: Yup.string()
        .required("Confirmação de senha obrigatória")
        .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
});


export default function ForgotPassword() {
    const [forms, setForms] = useState(0);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.state) {
            navigate("/acesso");
        }
        document.body.classList.add("bg-primary");
        return () => {
            document.body.classList.remove("bg-primary");
        }
    }, []);

    return (
        <>
            <main className="h-screen">
                <HeaderLogin />
                <div className="px-8 lg:px-0 max-w-7xl mx-auto h-full flex flex-col justify-center">
                    <GoBack />
                    {forms === 0 && <FirstForm currentForm={setForms} email={setEmail} />}
                    {forms === 1 && <SecondForm currentForm={setForms} email={email} />}
                </div>
            </main>
            <div className="h-screen w-full md:w-1/2 bg-banner bg-cover absolute right-0 top-0 -z-10">
                <CardNotificationRegisters />
            </div>
        </>
    );
}

function FirstForm({ currentForm, email }) {
    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(schemaEmail),
        mode: "onSubmit",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const { errors } = formState;
    const location = useLocation();
    const user = location.state.slug;

    const onSubmit = async (data) => {
        let url;
        if (user === "tutor") {
            url = `${import.meta.env.VITE_URL}/sendCodeTutor`;
        } else if (user === "clinica") {
            url = `${import.meta.env.VITE_URL}/sendCodeClinic`;
        } else if (user === "medico") {
            url = `${import.meta.env.VITE_URL}/sendCodeMedic`;
        }

        try {
            await axios.post(url, data);
            currentForm(1);
            email(data.email);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("E-mail não é válido.");
            } else {
                setErrorMessage("Erro ao tentar enviar o código.");
            }
        }
    };

    return (
        <form className="bg-white px-5 py-8 rounded-lg w-full md:w-1/2 flex flex-col max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-sora font-bold text-[32px]">Recuperar senha</h2>
            <div className="flex flex-col gap-4 mt-8">
                <div className="w-full">
                    <input type="text" placeholder="Email" className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all`} {...register("email")} />
                    {errors.email && <small className="text-red-error"><XCircle size={18} /> {errors.email?.message}</small>}
                    {errorMessage && <small className="text-red-error">{errorMessage}</small>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-3">
                <button type="submit" className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8">ENVIAR</button>
            </div>
        </form>
    );
}

function SecondForm({ email }) {
    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(schemaReset),
        mode: "onSubmit",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const { errors } = formState;
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(null);

    const location = useLocation();
    const user = location.state.slug;

    const onSubmit = async (data) => {
        let url;
        if (user === "tutor") {
            url = `${import.meta.env.VITE_URL}/resetPasswordTutor`;
        } else if (user === "clinica") {
            url = `${import.meta.env.VITE_URL}/resetPasswordClinic`;
        } else if (user === "medico"){
            url = `${import.meta.env.VITE_URL}/resetPasswordMedic`;
        }

        const payload = {
            email: email,
            code: data.code,
            newPassword: data.password
        };

        try {
            await axios.post(url, payload);
            setSuccessMessage("Senha alterada com sucesso!");
            setTimeout(() => {
                navigate("/acesso");
            }, 2000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Erro ao atualizar a senha.");
            } else {
                setErrorMessage("Erro no servidor. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <form className="bg-white px-5 py-8 rounded-lg w-full md:w-1/2 flex flex-col max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-sora font-bold text-[32px]">Recuperação de Senha</h2>
            <p>Um código de verificação foi enviado para o email <span className="text-secundary underline">{email}</span></p>
            <div className="flex flex-col gap-4 mt-8">
                <div className="w-full">
                    <input type="text" placeholder="Código de verificação" {...register("code")} className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all`} />
                    {errors.code && <small className="text-red-error"><XCircle size={18} /> {errors.code?.message}</small>}
                </div>
                <div className="w-full">
                    <input type="password" placeholder="Nova senha" {...register("password")} className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all`} />
                    {errors.password && <small className="text-red-error"><XCircle size={18} /> {errors.password?.message}</small>}
                </div>
                <div className="w-full">
                    <input type="password" placeholder="Confirme a nova senha" {...register("confirmPassword")} className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all`} />
                    {errors.confirmPassword && <small className="text-red-error"><XCircle size={18} /> {errors.confirmPassword?.message}</small>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-3">
                <button type="submit" className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8">ALTERAR</button>
            </div>
            {successMessage && <small className="text-green-500 mt-3">{successMessage}</small>}
            {errorMessage && <small className="text-red-error mt-3">{errorMessage}</small>}
        </form>
    );
}