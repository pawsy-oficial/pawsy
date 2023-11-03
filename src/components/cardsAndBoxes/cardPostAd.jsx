import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

function CardPostsAds({ idClinic, imageURL, title, description, imageClinicURL, nameClinic }) {
    const [showModal, setShowModal] = useState(false)
    showModal ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    return (
        <>
            <button
                onClick={() => setShowModal(!showModal)}
                className="px-4 pt-4 pb-6 rounded-lg bg-white shadow-md max-w-[256px] w-full flex flex-col gap-6"
            >
                <div
                    className="w-full h-40 overflow-hidden rounded-md"
                >
                    <img
                        className="w-full h-full object-cover"
                        src={`${import.meta.env.VITE_URL}/files/${imageURL}`}
                        alt={`Anucio de ${nameClinic}`}
                    />
                </div>

                <strong
                    className="text-lg capitalize"
                >
                    {title}
                </strong>
            </button>
            {
                showModal && (
                    ReactDOM.createPortal(
                        <ModalShowPost
                            setShowModal={setShowModal}
                            showModal={showModal}

                            description={description}
                            idClinic={idClinic}
                            imageClinic={imageClinicURL}
                            imagePost={imageURL}
                            nameClinic={nameClinic}
                            title={title}
                        />,
                        document.body
                    )
                )
            }
        </>
    );
}

function ModalShowPost({ showModal, setShowModal, imagePost, imageClinic, title, description, nameClinic, idClinic }) {
    const navigate = useNavigate()

    return (
        <section
            onClick={e => e.target.tagName == "SECTION" && setShowModal(!showModal)}
            className="inset-0 bg-primary/40 flex items-center justify-center z-[500] fixed"
        >
            <div
                className="w-1/2 max-w-3xl bg-white rounded-lg p-8 flex gap-4"
            >
                <div
                    className="w-56 h-56 rounded-lg overflow-hidden"
                >
                    <img
                        className="w-full h-full object-cover"
                        draggable={false}
                        src={`${import.meta.env.VITE_URL}/files/${imagePost}`}
                        alt={`${title}`}
                    />
                </div>

                <div 
                    className="flex flex-col justify-between flex-1"
                >
                    <div
                        className="flex flex-col gap-6 flex-1"
                    >
                        <h3
                            className="font-lato text-2xl font-bold"
                        >
                            {title}
                        </h3>

                        <p
                            className="text-sm font-lato text-zinc-600 leading-relaxed"
                        >
                            {description}
                        </p>
                    </div>

                    <div
                        className="w-full flex justify-between items-end"
                    >
                        <div
                            className="flex gap-3"
                        >
                            <div
                                className="w-14 h-14 rounded-full overflow-hidden border-2 border-secundary"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={`${import.meta.env.VITE_URL}/files/${imageClinic}`}
                                    alt={`${nameClinic}`}
                                    draggable={false}
                                />
                            </div>
                            <strong
                                className="text-lg font-lato capitalize"
                            >
                                {nameClinic}
                            </strong>
                        </div>


                        <button
                            onClick={()=> navigate("/clinica", { state: { id: idClinic } })}
                            className="rounded bg-primary text-white px-2 py-1"
                        >
                            Ver perfil
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CardPostsAds;