import { useEffect, useState } from "react"
import "./index.css"
import dog from "../../../img/dog.webp"
import cat from "../../../img/cat.webp"
import { Camera, GenderFemale, GenderMale, XCircle } from "@phosphor-icons/react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import axios from "axios"

const schema = Yup.object({
    name: Yup.string().required("Campo obrigatório").min(2, "O nome deve ter no mínimo 2 caracteres"),
    description: Yup.string().max(250, "Limite atingido (250)"),
    date: Yup.date().typeError("Deve ser uma data").required("Campo obrigatório"),
    coat: Yup.string().required("Campo obrigatório"),
    race: Yup.string().required("Campo obrigatório"),
    gender: Yup.string().oneOf(["1", "2"], "valor invalido").required("Campo obrigatório"),
    pet: Yup.string().oneOf(["1", "2"], "valor invalido").required("Qual a espécie do seu pet?"),
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


const FormNewPet = (props) => {

    const { register, handleSubmit, formState, control } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    })

    const { errors } = formState

    const [catsRace, setCatsRace] = useState([])
    const [dogsRace, setDogsRace] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}/raca?kind=cat`)
            .then(response => {
                setCatsRace(response.data.result)
            })
            .catch(err => console.log(err))
        axios.get(`${import.meta.env.VITE_URL}/raca?kind=dog`)
            .then(response => {
                setDogsRace(response.data.result)
            })
            .catch(err => console.log(err))
    }, [])

    const { isFirstAccess } = props
    const [animal, setAnimal] = useState(""); // estado inicial vazio

    const handleAnimalChange = (animalType) => {
        setAnimal(animalType);
    };

    const getBreeds = () => {
        if (animal === "1") {
            return dogsRace;
        } else if (animal === "2") {
            return catsRace; // retorna as raças de gato
        } else {
            return []; // retorna um array vazio se nenhum animal estiver selecionado
        }
    };

    // mock data, this should never go to production like this

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const coat = [
        "Curto",
        "Médio",
        "Grande",
    ];

    const onSubmit = dataForm => {
        console.log(dataForm)
    }

    const [selectImage, setSelectImage] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 flex flex-col justify-center items-center gap-8 w-[30rem] mx-auto bg-white rounded-lg"
        >
            <h1 className=" text-2xl pt-3 font-bold self-start">Novo Pet</h1>

            <section className="flex flex-col gap-6 w-full">
                <div className="w-32 mx-auto flex flex-col items-center gap-3" style={{ width: "164px" }}>
                    <input type="file" name="imagePet" id="imagePet" className="hidden" />

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
                        Tamanho máximo de 5MB e nos formatos .png e .jpg
                    </small>

                </div>



                <section id="animals" className="my-5 flex flex-col gap-16 justify-between">
                    <div className="w-full flex flex-col items-center">
                        <div className="flex gap-4 justify-around w-full">
                            <input
                                type="radio"
                                name="pet"
                                value="1"
                                id="dog"
                                // ref={register("pet")}
                                className="hidden"
                                {...register("pet")}
                                onChange={(e) => handleAnimalChange(e.target.value)}
                            />
                            <label
                                htmlFor="dog"
                                className="flex flex-col items-center py-1 px-2 rounded-lg cursor-pointer border border-transparent"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary overflow-hidden">
                                    <img src={dog} alt="" className="w-full h-full object-cover" />
                                </div>
                                <p>Cachorro</p>
                            </label>
                            <input
                                type="radio"
                                name="pet"
                                value="2"
                                id="cat"
                                className="hidden"
                                // ref={register("pet")}
                                {...register("pet")}
                                onChange={(e) => handleAnimalChange(e.target.value)}
                            />

                            <label htmlFor="cat" className="flex flex-col items-center py-1 px-2 rounded-lg cursor-pointer border border-transparent">
                                <div className="w-16 h-16 rounded-full bg-primary overflow-hidden">
                                    <img src={cat} alt="" className="w-full h-full object-cover" />
                                </div>
                                <p>Gato</p>
                            </label>
                        </div>
                        {
                            errors.pet &&
                            <small
                                className="text-red-error flex items-center gap-2 mt-1"
                            >
                                <XCircle size={18} />
                                {
                                    errors.pet?.message
                                }
                            </small>
                        }
                    </div>

                    <div className="w-full flex flex-col items-center">
                        <div className="flex gap-4 w-full">
                            <div className="w-1/2">
                                <input type="radio" name="gender" id="mal" className="hidden" {...register("gender")} value={"1"} />
                                <label className="rounded-lg cursor-pointer flex items-center justify-between gap-3 px-4 py-1 border-2 hover:bg-[#bcd2fc]" htmlFor="mal">Macho <GenderMale color="#8FB5FF" size="24px" /></label>
                            </div>
                            <div className="w-1/2">
                                <input type="radio" id="fem" name="gender" className="hidden" {...register("gender")} value={"2"} />
                                <label className="rounded-lg cursor-pointer flex items-center justify-between gap-3 px-4 py-1 border-2 hover:bg-[#fac0de]" htmlFor="fem">Fêmea <GenderFemale color="#FF8FCB" size="24px" /></label>
                            </div>
                        </div>
                        {
                            errors.gender &&
                            <small
                                className="text-red-error flex items-center gap-2 mt-1"
                            >
                                <XCircle size={18} />
                                {
                                    errors.gender?.message
                                }
                            </small>
                        }
                    </div>
                </section>

                <div className="w-full">
                    <input
                        className="p-2 w-full rounded-lg border border-primary bg-[#F5FFFE]"
                        name="name"
                        type="text"
                        placeholder="Nome"
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

                <div className="w-full">
                    <select
                        className="p-2 rounded-lg border border-primary bg-[#F5FFFE]  w-full"
                        name="race"
                        {...register("race")}
                    >
                        <option value="" disabled selected defaultValue="">Raça</option>
                        {
                            getBreeds().map((breed, index) => {
                                return <option key={index} value={breed.id_raca}>{breed.nm_raca}</option>
                            })
                        }
                    </select>
                    {
                        errors.race &&
                        <small
                            className="text-red-error flex items-center gap-2 mt-1"
                        >
                            <XCircle size={18} />
                            {
                                errors.race?.message
                            }
                        </small>
                    }
                </div>

                <div className="w-full">
                    <select
                        className="p-2 rounded-lg border border-primary bg-[#F5FFFE]  w-full"
                        name="coat"
                        {...register("coat")}
                    >
                        <option value="" disabled selected defaultValue="">Pelagem</option>
                        {
                            coat.map(dog => (
                                <option key={dog}>{dog}</option>
                            ))
                        }
                    </select>
                    {
                        errors.coat &&
                        <small
                            className="text-red-error flex items-center gap-2 mt-1"
                        >
                            <XCircle size={18} />
                            {
                                errors.coat?.message
                            }
                        </small>
                    }
                </div>

                <div className="w-full">
                    <input
                        type="date"
                        className="p-2 w-full rounded-lg border border-primary bg-[#F5FFFE] "
                        name="birthday"
                        max={formattedDate}
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

                {/* <input 
                    type="number" 
                    className="p-2 w-full rounded-lg border border-primary bg-[#F5FFFE] " 
                    placeholder="Peso"
                /> */}

                <div className="w-full">
                    <textarea
                        id="obs"
                        className="p-4 justify-between rounded-lg border border-primary bg-[#F5FFFE] mt-4 w-full h-36 resize-none focus-visible:outline-none"
                        placeholder="Observação"
                        {...register("description")}
                    />
                    {
                        errors.description &&
                        <small
                            className="text-red-error flex items-center gap-2 mt-1"
                        >
                            <XCircle size={18} />
                            {
                                errors.description?.message
                            }
                        </small>
                    }
                </div>


            </section>

            <div className="w-full flex justify-around">
                {
                    !isFirstAccess &&
                    <button
                        className="bg-red-500 text-white py-1 px-6 rounded-lg cursor-pointer hover:bg-red-600"
                        onClick={() => { props.addPet(true) }}
                    >
                        Cancelar
                    </button>
                }
                <button
                    className="bg-green-500 text-white py-1 px-6 rounded-lg cursor-pointer hover:bg-green-600"
                    type="submit"
                >
                    Adicionar
                </button>
            </div>
        </form>
    )
}

export default FormNewPet