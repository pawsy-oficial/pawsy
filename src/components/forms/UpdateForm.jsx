import { GenderFemale, GenderMale } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Alert } from "../tutor/Alert";
import dayjs from "dayjs";

export function UpdateFormPet({ myPet, showPet, stateEdit, setStateEdit }) {
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
            onSubmit={e=>e.preventDefault()}
            className="flex gap-6 mb-6 items-center relative"
        >
            <div className="flex flex-col gap-2 items-center">
                <label
                    className={`w-[90px] h-[90px]  sm:w-40 sm:h-40 rounded-full border-4 border-secundary overflow-hidden bg-primary/20 cursor-pointer`}
                >
                    <img
                        src={urlImage ? urlImage : `${import.meta.env.VITE_URL}/files/${myPet[showPet].url_img}`}
                        alt={myPet.nm_pet}
                        className="h-full w-full object-cover"
                        draggable={false}
                    />
                    <input
                        type="file"
                        multiple={false}
                        className="hidden"
                        onChange={(event) => setSelectImage(event.target.files[0])}
                        accept="image/png, image/jpg, image/jpeg"
                    // {...register("image")}
                    />
                </label>
                <span
                    className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                >
                    #{myPet[showPet].id_pawsy.toString().padStart(4, '0')}
                </span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-x-4 items-center flex-wrap">
                    <input
                        className="lg:text-[32px] text-2xl font-bold uppercase max-w-[50%]"
                        value={myPet[showPet].nm_pet}
                    />
                    <select>
                        <option 
                            value={1}
                            selected={myPet[showPet].sexo == "macho" ? true : false}
                        >
                            Macho ♂
                        </option>
                        <option 
                            value={2}
                            selected={myPet[showPet].sexo == "fêmea" ? true : false}
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
                            className="text-sm sm:text-base"
                            type="date"
                            value={dayjs(myPet[showPet].dt_nascimento).format("YYYY-MM-DD")}
                        />
                    </li>
                    <li>
                        <span className="font-bold text-xs sm:text-lg">Raça: </span>
                        <span className="text-sm sm:text-base">{myPet[showPet].nm_raca}</span>
                    </li>
                    <li>
                        <span className="font-bold text-xs sm:text-lg">Status: </span>
                        {/* <span className="text-sm sm:text-base">{pets[showPet].status ? "Não saudável" : "Saudável"}</span> */}
                    </li>
                </ul>
            </div>

            <section className="max-w-[360px] self-start hidden lg:inline-block">
                <h3 className="text-2xl font-semibold mb-3">Descrição</h3>
                <textarea 
                    className="text-zinc-800 leading-relaxed text-xs resize-none border focus:border-primary focus-within:overflow-hidden w-full"
                >
                    {
                        myPet[showPet].resumo.length == 0 ? <p>Não possui uma descrição</p> : (
                            myPet[showPet].resumo
                        )
                    }
                </textarea>
            </section>
            <div className='flex gap-4 absolute bottom-0 right-0'>
                <button
                    className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90"
                    onClick={() => {
                        setStateEdit(!stateEdit)
                        // update aqui
                    }}
                >
                    Salvar alterações
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