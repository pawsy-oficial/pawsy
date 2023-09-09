import { Camera, XCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ProgressPass from "../progress/progressPass";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { InputFormRegister, InputFormRegisterCEP } from "../inputsComponents";
import axios from "axios";
import NotifyBox from "../cardsAndBoxes/notifyBox";
import { useNavigate } from "react-router-dom";

const birthdate = new Date(new Date().setFullYear(new Date().getFullYear() - 16))

const schema = Yup.object({
    name: Yup.string().required("Campo obrigatório").min(2, "O nome deve ter mais de 2 caracteres"),
    lastName: Yup.string().required("Campo obrigatório").min(2, "O sobrenome deve ter mais de 2 caracteres"),
    email: Yup.string().required("Campo obrigatório").email("Digite um endereço de e-mail válido"),
    cpf: Yup.string().required("Campo obrigatório").length(14, "O CPF deve ter 11 dígitos").test("cpf-valido", "CPF inválido", (cpf) => handleValidationCPF(cpf)),
    cell: Yup.string().required("Campo obrigatório").matches(/^\(\d{2}\)\s\d{9}$/, "Número de celular inválido. Use o formato (99) 999999999"),
    date: Yup.date().typeError('Deve ser uma data').required("Campo obrigatório").max(birthdate, "A conta só pode ser criada para maiores de 16 anos"),
    
    cep: Yup.string().required("Campo obrigatório").length(9, "CEP deve possuir 8 dígitos"),
    city: Yup.string().required("Campo obrigatório"),
    street: Yup.string().required("Campo obrigatório"),
    numberHome: Yup.number().typeError('Deve ser um número').positive("Deve ser um número positivo").integer("Deve ser um número inteiro").required("Campo obrigatório"),
    complement: Yup.string(),
    neighborhood: Yup.string().required("Campo obrigatório"),
    password: Yup.string().required(),
    confirm_password: Yup.string().required("Campo obrigatório").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    terms: Yup.bool().oneOf([true], 'Você precisa aceitar os termos'),
    uf: Yup.string().required("Selecione um estado"),
    image: Yup.mixed().test(
        "fileSize",
        "O arquivo é muito grande",
        value => !value || (value && value.size <= 5242879))
        .test(
            "fileType",
            "Tipo de arquivo não suportado",
            value => !value || (value && ["image/png", "image/jpeg"].includes(value.type))
        )
})

function handleValidationCPF(cpf) {
    const format = cpf.replace(/[^\d]+/g, '');
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


export default function RegisterFormTutor({ userType }) {

    const [valueInput, setValueInput] = useState('')
    const [cpf, setCpf] = useState('')
    const [cellValue, setCellValue] = useState('')
    const [cep, setCep] = useState('')
    const [errorCep, setErrorCep] = useState(false)
    const [loadingCep, setLoadingCep] = useState(false)

    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [state, setState] = useState('')
    const [street, setStreet] = useState('')

    const [selectImage, setSelectImage] = useState(null)
    const [urlImage, setUrlImage] = useState(null)

    const navigate = useNavigate() 

    useEffect(() => {
        if (selectImage) {
            console.log(selectImage);
            if (selectImage.size > 5242880 || selectImage.type != "image/png" && selectImage.type != "image/jpg" && selectImage.type != "image/jpeg") {
                console.log("A imagem não atende os requisitos ");
            }
            else {
                setUrlImage(URL.createObjectURL(selectImage))
            }
        }
    }, [selectImage])

    const { register, handleSubmit, formState, setValue, setError, control } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })


    // CEP
    const [uf, setUf] = useState([])
    const [selectUf, setSelectUf] = useState("")

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/uf`)
            .then(response => {
                setUf(response.data.result)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {

        if (cep.length == 9) {
            setLoadingCep(true)
            axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
                .then(
                    response => {
                        setLoadingCep(false)
                        const { data } = response

                        setCity(data.city)
                        setNeighborhood(data.neighborhood)
                        setState(data.state)
                        setStreet(data.street)

                        setValue("cep", cep, { shouldValidate: true })
                        if (data.street) {
                            setValue("street", data.street)
                        }
                        else setValue("street", "")
                        if (data.city) {
                            setValue("city", data.city)
                        }
                        else setValue("city", "")
                        if (data.state) {
                            setValue("state", data.state)
                        }
                        else setValue("state", "")
                        if (data.neighborhood) {
                            setValue("neighborhood", data.neighborhood)
                        }
                        else setValue("neighborhood", "")
                    }
                )
                .catch(err => {
                    setLoadingCep(false)

                    setCity('')
                    setNeighborhood('')
                    setState('')
                    setStreet('')

                    setError("cep", { message: "CEP não encontrado" })
                    setValue("street", "")
                    setValue("city", "")
                    setValue("state", "")
                    setValue("neighborhood", "")

                })
                .finally(
                    () => {
                        setLoadingCep(false)
                        setErrorCep(false)
                    }
                )
        }
    }, [cep])

    const [statusForm, setStatusForm] = useState(false)
    const [msg, setMsg] = useState("")
    const [sucess, setSucess] = useState(false)

    const onSubmit = (data) => {
        const time = new Date().getTime()
        const urlImageProfile = `${time}_pawsy_${selectImage.name}`
        data.uf = parseInt(selectUf)

        const date = new Date(data.date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        

        const dataForm = {
            firstName: data.name, 
            lastName: data.lastName,
            email: data.email,
            cpf: data.cpf,
            birthDate: formattedDate, 
            cell: data.cell,
            password: data.password,
            cep: data.cep,
            city: data.city,
            state: data.uf,
            street: data.street,
            numberHome: data.numberHome,
            neighborhood: data.neighborhood,
            urlProfile: urlImageProfile,
            complement: data.complement

        }

        console.log(dataForm);
        
        axios.post(`${import.meta.env.VITE_URL}/tutor-register`, dataForm)
            .then(response => {
                console.log(response);
                let form = new FormData();
                form.append("name", urlImageProfile);
                form.append('file', selectImage, selectImage.name);
        
                axios.post(`${import.meta.env.VITE_URL}/upload-files`, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(()=>{
                    // setLoading(false)
                    console.log(response)
                    navigate("/login", { state: { slug: "tutor" } })
                })
            })
            .catch(err => {
                // setLoading(false)
                console.log(err)
                setStatusForm(true)
                setMsg(err.response.data.Message)
                setSucess(false)
            })
    }

    const { errors } = formState


    return (
        <section
            className="bg-white rounded-lg py-8 px-5 flex flex-col gap-8  w-full md:max-w-2xl md:mb-28"
        >
            <h2
                className="font-sora text-[2rem] font-semibold"
            >
                Criar nova conta
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    statusForm && <NotifyBox msg={msg} status={sucess} />
                }
                <section
                    className="flex flex-col items-center gap-2"
                >
                    <label
                        className="w-28 h-28 overflow-hidden border border-primary bg-primary/20 rounded-full flex flex-col items-center justify-center cursor-pointer"
                        title="Imagem de perfil"
                    >
                        {
                            urlImage ? <img className="w-full h-full object-cover" src={urlImage} /> : <Camera size={48} color="#22937E" />
                        }
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="file"
                                    multiple={false}
                                    className="hidden"
                                    onChange={event => {
                                        field.onChange(event.target.files[0]);
                                        setSelectImage(event.target.files[0]);
                                    }}
                                    accept="image/png, image/jpg, image/jpeg"
                                />
                            )}
                        />
                        <input
                            type="file"
                            multiple={false}
                            className="hidden"
                            onChange={(event) => setSelectImage(event.target.files[0])}
                            accept="image/png, image/jpg, image/jpeg"
                            {...register("image")}
                        />
                    </label>
                    <small
                        className={`w-28 text-center text-xs text-zinc-400  ${errors.image && "!text-red-error"}`}
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
                        Endereço
                    </legend>

                    <div
                        className="flex gap-8 mt-6"
                    >
                        <div className="w-full">

                            <InputFormRegisterCEP
                                velue={cep}
                                onChange={e => setCep(e.target.value)}
                                loading={loadingCep}
                                register={register}
                            />

                            {
                                (errors.cep || errorCep) &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.cep ? errors.cep?.message : "CEP não encontrado"
                                    }
                                </small>
                            }
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                placeholder={"Cidade"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.city && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                value={city}
                                {...register('city', {
                                    onChange: event => setCity(event.target.value)
                                })}
                            />
                            {
                                errors.city &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.city?.message
                                    }
                                </small>
                            }
                        </div>

                        <div className="w-full">

                            <select
                                type="text"
                                placeholder={"Estado"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.uf && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                {...register("uf")}
                                onChange={e => {
                                    const i = e.target.options.selectedIndex
                                    console.log(i);
                                    setSelectUf(i);
                                }}
                            >
                                <option disabled>Estado</option>
                                {
                                    uf.map(uf => <option value={uf.id_uf} selected={uf.nm_estado == state}>{uf.nm_estado}</option>)
                                }
                            </select>
                            {
                                errors.uf &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.uf?.message
                                    }
                                </small>
                            }
                        </div>
                    </div>
                    <div
                        className="flex gap-8 mt-6 w-full"
                    >
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder={"Endereço"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.street && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                value={street}
                                {...register('street', {
                                    onChange: event => setStreet(event.target.value)
                                })}
                            />


                            {
                                errors.street &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.street?.message
                                    }
                                </small>
                            }
                        </div>

                        <div>

                            <input
                                type="text"
                                placeholder={"nº"}
                                className={`h-fit border border-zinc-400 w-40 rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.numberHome && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register('numberHome')}
                            />
                            {
                                errors.numberHome &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.numberHome?.message
                                    }
                                </small>
                            }
                        </div>
                    </div>
                    <div
                        className="flex gap-8 mt-6"
                    >
                        <div className="w-full">

                            <input
                                type="text"
                                placeholder={"Complemento"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.complement && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                {...register('complement')}
                            />
                            {
                                errors.complement &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.complement?.message
                                    }
                                </small>
                            }
                        </div>

                        <div className="w-full">

                            <input
                                type="text"
                                placeholder={"Bairro"}
                                className={`h-fit border border-zinc-400 w-full rounded-lg py-2 px-6 focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.neighborhood && "!border-red-500 focus:!border-red-500 bg-red-100 ]"}`}
                                disabled={loadingCep}
                                value={neighborhood}
                                {...register('neighborhood', {
                                    onChange: event => setNeighborhood(event.target.value)
                                })}
                            />
                            {
                                errors.neighborhood &&
                                <small
                                    className="text-red-error flex items-center gap-2 mt-1"
                                >
                                    <XCircle size={18} />
                                    {
                                        errors.neighborhood?.message
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
