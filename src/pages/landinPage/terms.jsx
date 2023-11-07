import Footer from "../../components/footer";
import { HeaderLandingPage } from "../../components/header/Header";

function Terms() {
    const style = {
        position: "sticky",
        top: 0,
        boxShadow: "rgba(0,0,0,.2) 0 -2px 7px"
    }

    return ( 
        <>
            <HeaderLandingPage style={style} type="light"  />

            <main
                className="max-w-6xl mx-auto flex gap-6 min-h-screen my-10"
            >
                <article
                    className="bg-white rounded-lg py-6 px-4 flex-1"
                >
                    <div
                        className="w-full flex flex-col gap-2 mb-8"
                    >
                        <h1
                            className="text-zinc-800 font-lato font-bold text-3xl"
                        >
                            Termos de privacidade
                        </h1>
                        <strong
                            className="text-primary"
                        >
                            Ultima atualização: {" "}
                            <time
                                className="text-zinc-500 font-lato text-sm font-normal"
                            >
                                Novembro de 2023
                            </time>
                        </strong>
                    </div>

                    <ol
                        className="list-decimal pl-5"
                    >
                        <li
                            id="1"
                        >
                            ssssssss
                        </li>
                    </ol>
                </article>

                <nav
                    className="w-96 bg-white rounded-lg h-fit p-4"
                >
                    <a 
                        href="#1" 
                        rel="noopener noreferrer"
                    >
                        Primeiro tópico
                    </a>
                </nav>
            </main>

            <Footer/>
        </>
     );
}

export default Terms;