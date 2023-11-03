import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import sky from "../img/sky.svg"
import person4041 from "../img/person_404_1.svg"
import person4042 from "../img/person_404_2.svg"
import person4043 from "../img/person_404_3.svg"

function PageNotFound() {
    const navigate = useNavigate()

    const imgs = [person4041, person4042, person4043]

    return (
        <main
            className="flex flex-col items-center py-12"
        >
            <div
                className="flex flex-col gap-6 items-center"
            >
                <h1
                    className="text-primary text-[250px] font-baloo2 font-bold leading-[150px]"
                >
                    404
                </h1>
                <strong
                    className="font-lato text-4xl"
                >
                    Eita! não há nada aqui
                </strong>

                <button
                    className="relative  p-2 rounded-full bg-primary flex gap-3 w-10 group hover:w-20 transition-all duration-400"
                    onClick={()=>navigate("/")}
                >
                    <CaretLeft color="#fff" size={24} weight="bold" />
                    <span
                        className="absolute right-0 w-0 opacity-0 text-white transition-all group-hover:opacity-100 group-hover:w-3/5 pr-6"
                    >
                        Voltar
                    </span>
                </button>
            </div>

            <div
                className="absolute bottom-1 -z-10 flex justify-center"
            >
                <img 
                    src={sky} 
                    className="absolute bottom-10" 
                />
                <img 
                    src={imgs[parseInt(Math.random()*3)]}
                    className="w-3/4"
                />
            </div>


        </main>
    );
}

export default PageNotFound;