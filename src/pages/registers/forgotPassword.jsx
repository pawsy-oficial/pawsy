import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HeaderLogin } from "../../components/header/Header"
import GoBack from "../../components/buttons/GoBack"
import { CardNotificationRegisters } from "../../components/cardsAndBoxes/cardNotificationRegister"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { XCircle } from "@phosphor-icons/react"
import ImputMask from "react-input-mask"

const schema = Yup.object({
    "email": Yup.string().email("Endereço de email invalido").required("Campo obrigatório")
})

export default function forgotPassword() {

    const [forms, setForms] = useState(0)
    const [email, setEmail] = useState(null)

    function HandleForm() {
        switch (forms) {
            case 0:
                return <FirstForm currentForm={setForms} email={setEmail} />
            case 1:
                return <SecondForm currentForm={setForms} email={email} />
            case 2:
                return <ThirdForm />
        }
    }

    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        if (!location.state) {
            navigate("/acesso")
        }

        document.body.classList.add("bg-primary")
        return () => { // função de limpeza, é executada quando o componente é desmontado
            document.body.classList.remove("bg-primary")
        }
    }, [])

    const style = {
        position: "absolute"
    }

    return (
        <>
            <main className="h-screen">
                <HeaderLogin style={style} />
                <div
                    className="px-8 lg:px-0 max-w-7xl mx-auto h-full flex flex-col justify-center"
                >
                    <GoBack />
                    <HandleForm />
                </div>
            </main>
            <div className="h-screen w-full md:w-1/2 bg-banner bg-cover absolute right-0 top-0 -z-10">
                <CardNotificationRegisters />
            </div>
        </>
    )
}

function FirstForm({ currentForm, email }) {
    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })

    const { errors } = formState

    const onSubmit = data => {
        currentForm(1)
        email(data.email)
        console.log(data);
    }
    return (
        <form
            className="bg-white px-5 py-8 rounded-lg w-full md:w-1/2 flex flex-col max-w-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2
                className="font-sora font-bold text-[32px]"
            >
                Recuperar senha
            </h2>

            <div className="flex flex-col gap-4 mt-8">
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Email"
                        className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all ${errors.name && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
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
            </div>

            <div className="w-full flex flex-col gap-3">
                <button
                    type="submit"
                    className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8"
                >
                    ENVIAR
                </button>
            </div>

        </form>
    )
}

function SecondForm({ currentForm, email }) {
    const { handleSubmit, register, formState } = useForm({
        mode: "onSubmit"
    })

    const { errors } = formState

    const onSubmit = data => {
        currentForm(2)
        // email(data.code)
        console.log(data);
    }

    return (
        <form
            className="bg-white px-5 py-8 rounded-lg w-full md:w-1/2 flex flex-col max-w-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p>
                Um código de verificação foi enviado para o email <span className="text-secundary underline">{email}</span>
            </p>

            <div className="flex flex-col gap-4 mt-8">
                <div className="w-full">
                    <ImputMask 
                        mask={"999999"}
                        maskChar={null}
                        placeholder="xxxxxx"
                        type="text"
                        className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all`}
                        {...register("code")}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <button
                    type="submit"
                    className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8"
                >
                    CONFIRMAR
                </button>
            </div>

        </form>
    )
}

function ThirdForm({ email }) {
    // const { handleSubmit, register, formState } = useForm({
    //     mode: "onSubmit"
    // })

    // const { errors } = formState

    // const onSubmit = data => {
    //     currentForm(2)
    //     // email(data.code)
    //     console.log(data);
    // }

    return (
        <form
            className="bg-white px-5 py-8 rounded-lg w-full md:w-1/2 flex flex-col max-w-md"
        // onSubmit={handleSubmit(onSubmit)}
        >
            <h2
                className="font-sora font-bold text-[32px]"
            >
                Nova senha
            </h2>

            <div className="flex flex-col gap-4 mt-8">
                <div className="w-full">
                    <input
                        type="password"
                        placeholder="Nova senha"
                        className={`border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all`}
                    // {...register("code")}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <button
                    type="submit"
                    className="w-full flex justify-center bg-[#304C52] text-white rounded-lg py-3 mt-8"
                >
                    ALTERAR
                </button>
            </div>

        </form>
    )
}