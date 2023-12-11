import { CheckCircle } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"

export default function BoxPrice({ price, listBenefits, recommended=false, idPlain, planScreen, isPlan, grossPrice }){
    const navigate = useNavigate()
    return(
        <section
            className={`p-6 rounded-lg bg-white max-w-xs w-full flex flex-col gap-10 items-center justify-between relative ${recommended && "border border-primary"}`}
            style={{boxShadow: "0px 0px 7.3px 0px rgba(64, 64, 64, 0.20)"}}
        >
            {
                recommended && (
                    <div
                        className="xl:p-3 py-1 px-6 rounded-tl-2xl rounded-tr-lg rounded-bl-lg rounded-br-2xl bg-primary text-white absolute top-0 xl:-right-1/4 -translate-y-1/2 z-10 shadow-md"
                    >
                        Recomendado
                    </div>
                )
            }

            <div
                className="flex flex-col gap-8"
            >
                <div
                    className="flex flex-col items-center"
                >
                    <strong
                        className="text-[2rem] font-sora font-bold text-center w-full inline-block"
                    >
                        {
                            price != 0 ? <><span className="text-base">12x {" "}</span>R$ {price.toFixed(2)}</> : "GRÁTIS"
                        }
                    </strong>
                    {
                        price != 0 && <span>à vista R${grossPrice.toFixed(2)}</span>
                    }
                    
                </div>
                <ul
                    className="flex flex-col gap-2"
                >
                    {
                        listBenefits.map(lb => {
                            return(
                                <li
                                    className="flex gap-4 items-center"
                                >
                                    <CheckCircle size={24} color="#22B77E" />
                                    <span
                                        className="w-full"
                                    >
                                        {lb}
                                    </span> 
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <button 
                type="button"
                className="py-3 disabled:opacity-80 disabled:hover:bg-pawsy-green rounded-lg bg-pawsy-green w-full font-lato font-semibold text-white text-lg hover:bg-teal-700 transition-colors duration-300"
                onClick={()=>{
                    price != 0 ? (
                        planScreen(true),
                        isPlan(idPlain)    
                    ) : null
                }}
                disabled={!price != 0}
            >
                {price == 0 ? "Já adquirido" : "Teste grátis"}
            </button>
        </section>
    )
}