import { memo } from "react"
import LogoWhite from "../../img/logoPawsy.svg"
import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
const pages = [
    {
        pageName: "Home",
        urlPage: "/"
    },
    {
        pageName: "Sobre nós",
        urlPage: "/sobre"
    },
    {
        pageName: "Planos",
        urlPage: "/planos"
    },
    // {
    //     pageName: "Recursos",
    //     urlPage: "/recursos"
    // }
]

function Footer() {

    const navigate = useNavigate()

    return (
        <footer
            className="py-20 bg-primary w-full px-6"
        >
            <section
                className="max-w-5xl w-full mx-auto flex flex-col items-center gap-6"
            >
                <div
                    className="flex flex-col md:flex-row justify-between gap-6 items-center w-full  pb-4 border-b border-white/50"
                >
                    <div>
                        <img src={LogoWhite} alt="Logo Pawsy" />
                    </div>
                    <nav
                        className="flex gap-4 md:gap-16 items-center"
                    >
                        {
                            pages.map(page => {
                                return (
                                    <a
                                        className="font-baloo2 font-semibold text-base flex flex-col items-center cursor-pointer gap-1 text-white"
                                        onClick={() => navigate(`${page.urlPage}`)}
                                    >
                                        {page.pageName}
                                    </a>
                                )
                            })
                        }
                    </nav>

                    <div
                        className="flex gap-5"
                    >
                        <a 
                            href="https://www.linkedin.com/company/pawsy-oficial"
                            target="_blank"
                        >
                            <LinkedinLogo size={32} color="#fff" />
                        </a>
                        <a 
                            href="https://www.instagram.com/pawsy_oficial/"
                            target="_blank"
                        >
                            <InstagramLogo size={32} color="#fff" />
                        </a>
                    </div>
                </div>
                <strong 
                    className="text-white font-normal font-lato text-center w-full"
                >
                    © 2023 - Pawsy
                </strong>
            </section>

        </footer>
    )
}

export default memo(Footer)