import { useLocation } from "react-router-dom";
import { HeaderMedic } from "../../components/HeaderMedic";

export default function ViewPatient(){
    const location = useLocation()
    const { pet } = location.state

    return(
        <>
            <header>
                <HeaderMedic/>
            </header>
            <main className="bg-[#F5F7FB] flex mt-4">
                <section className="bg-white"> 
                    <img src={pet.img}/>
                    
                </section>
                <section className="bg-white"> 
                    <p>
                        {pet.nameDono}
                    </p>
                </section>
            </main>
        </>
    )
}