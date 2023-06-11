import { WarningCircle } from "@phosphor-icons/react"

export default function RadioGroupMyPets({showPet}){
    const pets =
    [
        { name: "caramelo", image: "https://i0.wp.com/petcaramelo.com/wp-content/uploads/2018/07/sdr-cachorro.jpg?w=640&ssl=1", status: false, id: "0001", birthday: "2022-05-05", breed: "Sem raça definida", gender: "mas", observations: "Meu Caramelo é territorial e protetor, mas carinhoso e brincalhão. Avista com latidos e rosnados, mas uma carícia ou brincadeira o acalma. Adora correr atrás de brinquedos e é muito inteligente. Cuido com amor e atenção, recebendo amor e alegria em troca."},
        { name: "oreo", image: "https://uploads-ssl.webflow.com/60cd7ae35efaf14623f555c5/6373ed8f20fe1152e7f3861e_husky-service-dog-everything-you-need-to-know.jpg", status: true, id: "0002", birthday: "2022-05-03", breed: "Husky siberiano", gender: "mas", observations: "Oreo é um verdadeiro artista do uivo! Seus vocais noturnos podem até incomodar os vizinhos, mas não há como negar que ele sabe como expressar sua paixão pela música... ops, quer dizer, pela vida selvagem!"},
        { name: "flor", image: "https://www.maria.pt/wp-content/uploads/2019/05/realgrumpycat_46527753_209715023270158_6705809054494225971_n.jpg", status: false, id: "0003", birthday: "2022-05-06", breed: "persa", gender: "fem", observations: "Não possui observações"},
        { name: "pantera", image: "https://www.petz.com.br/blog/wp-content/uploads/2020/07/gata-gravida-felino.jpg", status: false, id: "0004", birthday: "2022-05-06", breed: "mau egípcio", gender: "fem", observations: "Não possui observações" }
    ]
    return(
        <>
            {
                pets.map((pet, index) => {
                    return (
                        <>
                            <label 
                                className="flex gap-2 items-center cursor-pointer hover:bg-primary/5 transition-all duration-700 p-1 rounded"
                                onClick={()=>{showPet(index)}}
                            >
                                <input type="radio" name="myPets" id="" className="radio hidden"/>
                                <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span className="text-lg  capitalize">{pet.name}</span>
                                {
                                    pet.status && <WarningCircle className="fill-red-error" size={16} weight="bold" />
                                }
                            </label>
                        </>
                    )
                })
            }
        </>
    )
}