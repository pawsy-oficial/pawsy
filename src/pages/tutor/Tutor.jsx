import { PlusCircle, WarningCircle } from "@phosphor-icons/react";
import { Header } from "../../components/header/Header";
import { NavbarTutor } from "../../components/Navbar";

export default function Tutor(){

    const pets = 
    [
        {name: "caramelo", image: "https://s2.glbimg.com/_jO2JQsq1bqQiXiz41sQ4M4_BUA=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/N/C/OyE6CpTeKr0eTjTxKBWA/c8df570c-b7b6-4d50-a045-b623a4feca57.jpg", status: false, id:"0001", year: "5", race: "Sem raça definida", gender: "mas"},
        {name: "oreo", image: "https://uploads-ssl.webflow.com/60cd7ae35efaf14623f555c5/6373ed8f20fe1152e7f3861e_husky-service-dog-everything-you-need-to-know.jpg", status: true, id:"0002", year: "3", race: "Husky siberiano", gender: "mas"},
        {name: "flor", image: "https://www.maria.pt/wp-content/uploads/2019/05/realgrumpycat_46527753_209715023270158_6705809054494225971_n.jpg", status: false, id:"0003", year: "6", race: "persa", gender: "fem"},
        {name: "pantera", image: "https://www.petz.com.br/blog/wp-content/uploads/2020/07/gata-gravida-felino.jpg", status: false, id:"0004", year: "6", race: "mau egípcio", gender: "fem"},
    ]

    return(
        <main className="flex min-h-screen">
            <NavbarTutor page={0}/>
            <section className="flex-1">
                <Header/>

                <main className="pl-10 pr-16 py-8 flex gap-5">
                    <section className="flex-1 bg-white px-6 py-8 rounded-2xl">
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2 items-center">
                                <div className="w-40 h-40 rounded-full border-4 border-primary overflow-hidden">
                                    <img src={pets[0].image} alt={pets[0].name} className="h-full w-full object-cover"/>
                                </div>
                                <span 
                                    className="bg-secundary rounded-full px-4 py-1 text-white text-xs font-bold"
                                >
                                    #{pets[0].id}
                                </span>
                            </div>
                            <div>
                                <h3>{}</h3>
                            </div>
                        </div>
                    </section>
                    <section className="w-64 bg-white px-4 py-8 rounded-2xl flex flex-col gap-5">
                        <h3 className="text-2xl font-semibold">
                            Meus pets
                        </h3>

                        <div className="flex flex-col gap-3">
                            {
                                pets.map((pet)=>{
                                    return(
                                        <div className="flex gap-2 items-center">
                                            <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                                                <img 
                                                    src={pet.image}
                                                    alt={pet.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <span className="text-lg font-semibold capitalize">{pet.name}</span>
                                            {
                                                pet.status && <WarningCircle className="fill-red-error" size={16} weight="bold"/>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="flex gap-4 mx-auto mt-4 cursor-pointer">
                            <PlusCircle size={24} weight="bold" className="fill-primary"/>
                            <span>Adicionar</span>
                        </div>
                    </section>
                </main>
            </section>
        </main>
    )
}