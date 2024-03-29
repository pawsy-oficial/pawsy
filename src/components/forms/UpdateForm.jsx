import { Camera, GenderFemale, GenderMale, Pen } from "@phosphor-icons/react";
import { memo, useEffect, useState } from "react";
import { Alert } from "../tutor/Alert";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import InputMask from "react-input-mask"
import ModalDialogEditAddress from "../cardsAndBoxes/modal";

export function UpdateFormPet({ myPet, showPet, stateEdit, setStateEdit }) {
    const [selectImage, setSelectImage] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    const [namePet, setNamePet] = useState(`${myPet[showPet].pet.nm_pet}`)
    const [birthDay, setBirthday] = useState(`${myPet[showPet].pet.dt_nascimento}`)
    const [saveLoading, setSaveLoading] = useState(false)

    const { register, handleSubmit, formState, setValue, setError, control } = useForm({
        // resolver: yupResolver(schema),
        mode: "onSubmit"
    })

    useEffect(() => {
        if (selectImage) {
            // console.log(selectImage);
            if (selectImage.size > 5242880 || selectImage.type != "image/png" && selectImage.type != "image/jpg" && selectImage.type != "image/jpeg") {
                console.log("A imagem não atende os requisitos ");
            }
            else {
                setUrlImage(URL.createObjectURL(selectImage))
            }
        }
    }, [selectImage])

    const onSubmit = (data) => {
        const currentTime = new Date().getTime()
        let nameFile
        (selectImage) ? nameFile = `${currentTime}_pawsy_${selectImage.name}` : nameFile = myPet[showPet].pet.url_img

        const dataForm = {
            url_imagem: nameFile,
            resumo: data.description,
            sexo: data.sexo,
            idade: data.birthday,
            idPet: myPet[showPet].pet.id_pawsy,
            namePet: data.name_pet
        }
        // console.log(dataForm, selectImage);
        setSaveLoading(true)
        axios.post(`${import.meta.env.VITE_URL}/update-pet`, dataForm)
            .then(res => {
                selectImage
                    ? uploadImage(nameFile, selectImage)
                    : (
                        setSaveLoading(false),
                        setStateEdit(!stateEdit)
                    )
            })
            .catch(err => console.log(err))
    }

    function uploadImage(nameFile, selectImage) {
        let form = new FormData();
        form.append("name", nameFile)
        form.append('file', selectImage, selectImage.name)
        axios.post(`${import.meta.env.VITE_URL}/upload-files`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                console.log(response)
                setSaveLoading(false)
                setStateEdit(!stateEdit)
            }).catch(err => {
                console.error(err)
                setStateEdit(!stateEdit)
            })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-6 mb-6 items-center relative"
        >
            <div className="flex flex-col gap-2 items-center">
                <label
                    className={`w-[90px] h-[90px] relative sm:w-40 group sm:h-40 rounded-full border-4 border-secundary overflow-hidden bg-primary/20 cursor-pointer`}
                >
                    <img
                        src={urlImage ? urlImage : `${import.meta.env.VITE_URL}/files/${myPet[showPet].pet.url_img}`}
                        alt={myPet.nm_pet}
                        className="h-full w-full object-cover group-hover:brightness-50 transition-all"
                        draggable={false}
                    />
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
                    <Camera className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-all" color="#ffffff" size={32} />
                    {/* <input
                        type="file"
                        multiple={false}
                        className="hidden"
                        onChange={(event) => setSelectImage(event.target.files[0])}
                        accept="image/png, image/jpg, image/jpeg"
                    // {...register("image")}
                    /> */}
                </label>
                <span
                    className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                >
                    #{myPet[showPet].pet.id_pawsy.toString().padStart(4, '0')}
                </span>
            </div>
            <div className="flex flex-col gap-4 w-2/5">
                <div className="flex gap-x-4 items-center flex-wrap">
                    <input
                        className="lg:text-[32px] text-2xl font-bold uppercase max-w-[50%]"
                        value={namePet}

                        {...register("name_pet", {
                            onChange: e => {
                                setNamePet(e.target.value)
                            }
                        })}
                    />
                    <select
                        {...register("sexo")}
                        className="px-1 border border-primary rounded cursor-pointer hover:bg-primary/20 focus:bg-primary/20 focus-visible:overflow-hidden"
                    >
                        <option
                            value={1}
                            selected={myPet[showPet].pet.sexo == "macho" ? true : false}
                            className="cursor-pointer"
                        >
                            Macho ♂
                        </option>
                        <option
                            value={2}
                            selected={myPet[showPet].pet.sexo == "fêmea" ? true : false}
                            className="cursor-pointer"
                        >
                            Fêmea ♀
                        </option>
                    </select>
                    {/* {
                        pets[showPet].status && <Alert />
                    } */}
                </div>
                <ul className="flex flex-col gap-2">
                    <li>
                        <span className="font-bold text-xs sm:text-lg">Idade: </span>
                        <input
                            className="text-sm sm:text-base border border-primary rounded px-2"
                            type="date"
                            value={dayjs(birthDay).format("YYYY-MM-DD")}
                            {...register("birthday", {
                                onChange: e => setBirthday(e.target.value)
                            })}
                            max={dayjs().format("YYYY-MM-DD")}
                            min={dayjs().subtract(25, "years").format("YYYY-MM-DD")}
                        />
                    </li>
                    <li>
                        <span className="font-bold text-xs sm:text-lg">Raça: </span>
                        <span className="text-sm sm:text-base">{myPet[showPet].pet.nm_raca}</span>
                    </li>
                    <li>
                        <span className="font-bold text-xs sm:text-lg">Status: </span>
                        {/* <span className="text-sm sm:text-base">{pets[showPet].status ? "Não saudável" : "Saudável"}</span> */}
                    </li>
                </ul>
            </div>

            <section className="max-w-[360px] self-start hidden lg:inline-block w-full">
                <h3 className="text-2xl font-semibold mb-3">Descrição</h3>
                <textarea
                    className="text-zinc-800 leading-relaxed text-xs resize-none p-2 border-2 border-primary focus:border-primary w-full h-20"
                    {...register("description")}
                >
                    {
                        myPet[showPet].pet.resumo.length > 0 ? myPet[showPet].pet.resumo : ""
                    }
                </textarea>
            </section>
            <div className='flex gap-4 absolute bottom-0 right-0'>
                <button
                    className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90"
                    type="submit"
                >
                    {
                        saveLoading ? "..." : "Salvar alterações"
                    }
                </button>
                <button
                    className="px-4 py-2 bg-red-error rounded text-white font-lato text-xs self-start hover:bg-red-error/90"
                    onClick={() => setStateEdit(!stateEdit)}
                >
                    Cancelar
                </button>

            </div>
        </form>
    )
}

function UpdateFormClinic({ infoClinic, actionStateEdit }) {
    const [nameClinic, setNameClinic] = useState(infoClinic.storedNameClinica)
    const [numberTell, setNumberTell] = useState(infoClinic.storedTellClinica)
    const [saveLoading, setSaveLoading] = useState(false)
    const [clickSave, setClickSave] = useState(false)

    const [address, setAddress] = useState({
        cep: infoClinic.CEP,
        city: infoClinic.Cidade,
        complement: infoClinic.Complemento,
        neighborhood: infoClinic.Bairro,
        numberHome: infoClinic.Numero,
        state: infoClinic.Estado,
        street: infoClinic.Rua,
        uf: infoClinic.storedIdEstado,
        latitude: infoClinic.Latitude,
        longitude: infoClinic.Longitude
    })

    const [selectImage, setSelectImage] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    useEffect(() => {
        if (selectImage) {
            // console.log(selectImage);
            if (selectImage.size > 5242880 || selectImage.type != "image/png" && selectImage.type != "image/jpg" && selectImage.type != "image/jpeg") {
                console.log("A imagem não atende os requisitos ");
            }
            else {
                setUrlImage(URL.createObjectURL(selectImage))
            }
        }
    }, [selectImage])

    const { register, handleSubmit, control } = useForm({
        mode: "onSubmit"
    })

    const onSubmit = (data) => {
        const currentTime = new Date().getTime()
        let nameFile
        (selectImage) 
            ? nameFile = `${currentTime}_pawsy_${selectImage.name}` 
            : nameFile = infoClinic.storedImg

        data.image = nameFile
        data.numberTell = data.numberTell.replace(/[^\d]+/g, '')

        // console.log(data.image, nameFile);

        const streetFormat = address.street.replace(/ /g, "%20")
        const cityFormat = address.city.replace(/ /g, "%20")
        const neighborhoodFormat = address.neighborhood.replace(/ /g, "%20")
        const urlGeocode = `https://dev.virtualearth.net/REST/v1/Locations?query=${streetFormat}%20${data.numberHome}%20${neighborhoodFormat}%20${cityFormat}%20&key=${import.meta.env.VITE_KEY_TOKEN_MAP}`

        setSaveLoading(true)
        axios.get(urlGeocode)
            .then((e) => {
                const [latitude, longitude] = e.data.resourceSets[0].resources[0].point.coordinates

                const x = { ...data, ...address, latitude: latitude, longitude: longitude, idClinic: infoClinic.storedIdClinica }

                if (clickSave) {                    
                    axios.post(`${import.meta.env.VITE_URL}/update-clinic-profile`, x)
                        .then(res => {
                            selectImage
                                ? uploadImage(data.image, selectImage)
                                : (
                                    setSaveLoading(false),
                                    actionStateEdit(false)
                                )
                        })
                        .catch(err => {
                            console.log(err);
                            setSaveLoading(false)
                        })
                }
                else setSaveLoading(false)
            })
            .catch(err => console.log(err))
    }

    function uploadImage(nameFile, selectImage) {
        let form = new FormData();
        form.append("name", nameFile);
        form.append('file', selectImage, selectImage.name);

        axios.post(`${import.meta.env.VITE_URL}/upload-files`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            setSaveLoading(false)
            actionStateEdit(false)
        }).catch(err => console.log(err))
    }


    return (
        <form
            className="flex justify-between relative"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex items-center">
                <label className="min-w-[12rem] w-48 h-48 rounded-lg overflow-hidden relative group cursor-pointer">
                    <img
                        src={urlImage ? urlImage : `${import.meta.env.VITE_URL}/files/${infoClinic.storedImg}`}
                        alt={infoClinic.storedNameClinica}
                        className="h-full w-full object-cover group-hover:brightness-50 transition-all"
                        draggable={false}
                    />
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
                    <Camera className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-all" color="#ffffff" size={32} />
                </label>
                <div className="flex flex-col p-4 gap-2  text-left">
                    <input
                        className="text-[32px] font-bold uppercase flex gap-4 items-center"
                        value={nameClinic}
                        {...register("nameClinic", {
                            onChange: e => setNameClinic(e.target.value)
                        })}
                    />
                    <div
                        className="flex gap-2 items-center"
                    >
                        <p>
                            {
                                address ? address.street : infoClinic.Rua
                            },
                            {
                                address ? address.numberHome : infoClinic.Numero
                            } -
                            {
                                address ? address.cep : infoClinic.CEP
                            }
                        </p>
                        <ModalDialogEditAddress setAddress={setAddress} />
                    </div>
                    <InputMask
                        mask={"(99) 99999 9999"}
                        maskChar={null}
                        placeholder={"(00) 00000 0000"}
                        className={`border border-primary rounded-lg w-fit px-2`}
                        {...register("numberTell")}
                        value={numberTell}
                        onChange={e => setNumberTell(e.target.value)}
                    />
                    <p>
                        {infoClinic.storedEmailClinica}
                    </p>
                    <p>
                        {/* {infos[0].funcionamento} */}
                    </p>
                </div>
            </div>
            <div className='flex gap-4 absolute bottom-0 right-0'>
                <button
                    className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90"
                    type="submit"
                    onClick={() => setClickSave(true)}
                >
                    {
                        saveLoading ? "..." : "Salvar alterações"
                    }
                </button>
                <button
                    className="px-4 py-2 bg-red-error rounded text-white font-lato text-xs self-start hover:bg-red-error/90"
                    onClick={() => actionStateEdit(false)}
                >
                    Cancelar
                </button>

            </div>
        </form>
    )
}

/*function UpdateFormClinicAboutUs({}){}*/

const memoUpdateFormClinic = memo(UpdateFormClinic)
export { memoUpdateFormClinic as UpdateFormClinic }

/*const memoUpdateFormClinicAboutUs = memo(UpdateFormClinicAboutUs)
export {memoUpdateFormClinicAboutUs as UpdateFormClinicAboutUs}*/