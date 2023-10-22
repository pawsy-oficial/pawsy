import { useState } from "react";

function SectionProfileClinic() {

    const [infoClinic, setInfoClinic] = useState([])
    const [stateEdit, setStateEdit] = useState(false)

    useEffect(() => {
        tokenClinic = Cookies.get("jwtTokenClinic")

        axios.get(`${import.meta.env.VITE_URL}/profileClinic`, {
            headers: {
                Authorization: `Bearer ${tokenClinic}`
            }
        })
            .then(e => {
                setInfoClinic(e.data);
                setTextAboutUs(e.data.storedDescriptionClinica)
            })
            .catch(err => {
                console.log(err)
            })
    }, [stateEdit])

    return (
        <section className={`flex-1 flex flex-col bg-white px-6 py-8 rounded-2xl`}>
            {
                stateEdit
                    ? <UpdateFormClinic infoClinic={infoClinic} actionStateEdit={setStateEdit} />
                    : (
                        <section className="flex justify-between relative">
                            <div className="flex items-center">
                                <div className="min-w-[12rem] w-48 h-48 rounded-lg overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_URL}/files/${infoClinic.storedImg}`}
                                        alt={infoClinic.storedNameClinica}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col p-4 gap-2  text-left">
                                    <h3 className="text-[32px] font-bold uppercase flex gap-4 items-center">
                                        {infoClinic.storedNameClinica}
                                    </h3>
                                    <p>
                                        {infoClinic.Rua}, {infoClinic.Numero}
                                    </p>
                                    {
                                        infoClinic.Complemento && <p>{infoClinic.Complemento}</p>
                                    }
                                    <p>
                                        {infoClinic.storedTellClinica}
                                    </p>
                                    <p>
                                        {infoClinic.storedEmailClinica}
                                    </p>
                                    <p>
                                        {/* {infos[0].funcionamento} */}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="px-4 py-2 bg-primary rounded text-white font-lato text-xs self-start hover:bg-primary/90 absolute bottom-0 right-0 disabled:cursor-not-allowed disabled:opacity-25 disabled:transition-all"
                                onClick={() => setStateEdit(!stateEdit)}
                                disabled={stateEdit || editAboutUs}
                            >
                                Editar perfil
                            </button>
                        </section>
                    )
            }


            <div className="flex flex-col">
                <div
                    className="flex mt-4 justify-between w-full items-center"
                >
                    <h2 className="font-bold text-lg">
                        Sobre nós
                    </h2>
                    <div
                        className="flex gap-3"
                    >
                        <button
                            className="px-4 py-2 bg-primary rounded text-white font-lato text-xs hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-25 disabled:transition-all"
                            disabled={stateEdit}
                            onClick={handleUpdateAboutUs}
                        >
                            {editAboutUs ? "Aplicar alterações" : "Editar"}
                        </button>
                        {
                            editAboutUs &&
                            <button
                                className="px-4 py-2 bg-red-error rounded text-white font-lato text-xs hover:bg-red-error/90 disabled:cursor-not-allowed disabled:opacity-25 disabled:transition-all"
                                disabled={stateEdit}
                                onClick={() => setEditAboutUs(!editAboutUs)}
                            >
                                Cancelar
                            </button>
                        }
                    </div>
                </div>
                {
                    editAboutUs
                        ? (
                            <div
                                className="relative w-full"
                            >
                                <textarea
                                    className="w-full border rounded-lg mt-4 resize-none h-52 border-primary focus-within:outline-secundary p-4 bg-primary/5 text-base"
                                    value={
                                        (!infoClinic.storedDescriptionClinica || infoClinic.storedDescriptionClinica.length != 0)
                                            ? textAboutUs
                                            : ""
                                    }
                                    // onChange={(e)=>{
                                    //     setTextAboutUs(e.target.value)
                                    // }}
                                    onInput={(e) => {
                                        const count = e.target.value.length
                                        count <= 680 && setTextAboutUs(e.target.value)
                                    }}
                                />
                                <span
                                    className={`absolute right-0 -bottom-4 ${textAboutUs && (textAboutUs.length == 680 && "text-emerald-500")}`}
                                >
                                    {
                                        textAboutUs == null ? "0/680" : `${textAboutUs.length} / 680`
                                    }
                                </span>
                            </div>
                        )
                        : (
                            <p className="text-sm font-normal text-limit max-w-3xl">
                                {
                                    !infoClinic.storedDescriptionClinica || infoClinic.storedDescriptionClinica.length == 0 ? "A sua clínica ainda não possui uma descrição, crie uma agora mesmo!" : infoClinic.storedDescriptionClinica
                                }
                            </p>
                        )
                }
            </div>
            <div className="mnegative flex flex-col">
                <h2 className="font-bold text-lg pb-2">
                    Anúncios
                </h2>
                <p className="text-sm font-normal">
                    Você não criou nenhum anúncio <a className="text-[#22937E] underline" href="">criar anúncio</a>
                </p>
            </div>

            <section className="mt-4 flex flex-col gap-4">
                <h1 className="font-bold text-lg">Comentários</h1>
                <div
                    className="flex flex-col gap-2"
                >
                    <CommentsForClinic />
                    <CommentsForClinic />
                    <CommentsForClinic />
                </div>
                {/* <h2 className="font-bold text-lg mb-2">
                                Posts
                            </h2>
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                                    <PostBox img={frajola} name={"Frajola"} />
                                    <PostBox img={dog} name={"Tob"} />
                                    <PostBox img={caramelo} name={"Caramelo"} />
                                    <PostBox img={gato} name={"Gato"} />
                                </div>
                                <div className="justify-center flex w-full gap-2">
                                    <input type="radio" name="anchorPost" defaultChecked={true} className=" border-2 border-primary bg-primary w-6 h-6 rounded-full" />
                                    <input type="radio" name="anchorPost" className=" border-2 border-primary w-6 h-6 rounded-full" />
                                    <input type="radio" name="anchorPost" className="border-2 border-primary  w-6 h-6 rounded-full" />
                                </div>
                            </div> */}
            </section>
        </section>
    );
}

export default SectionProfileClinic;