import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function BoxAbout({ name, description, image, role, network }) {
    return (
        <div
            className="max-w-xs w-full rounded-lg border border-white h-[500px] relative overflow-hidden"
        >
            <div
                className="absolute inset-0 bg-gradient-to-t to-transparent from-[#1C6356] via-[#1C6356]/64 flex flex-col justify-end"
            >
                <div
                    className="flex flex-col px-6 mb-3"
                >
                    <strong
                        className="text-white font-sora text-[2rem] selection:bg-primary"
                    >
                        {name}
                    </strong>
                    <span
                        className="font-lato text-base text-zinc-300"
                    >
                        {role}
                    </span>

                    <p
                        className="text-sm text-zinc-400 font-lato"
                    >
                        {description}
                    </p>

                </div>
                <div
                    className="flex w-full"
                >
                    {
                        network.map(n => {
                            return(
                                <>
                                    {
                                        n.linkedin && (
                                            <a
                                                href={n.linkedin}
                                                target="_blank"
                                                className="border-t border-white w-full flex justify-center py-3 hover:shadow-[0px_0px_5px_0px_#22B77E_inset] transition-all duration-400"
                                            >
                                                <LinkedinLogo size={24} color="white" />
                                            </a>
                                        )
                                    }
                                    {
                                        n.instagram && (
                                            <a
                                                href={n.instagram}
                                                target="_blank"
                                                className="border-t border-l border-white w-full flex justify-center py-3 hover:shadow-[0px_0px_5px_0px_#22B77E_inset] transition-all duration-400"
                                            >
                                                <InstagramLogo size={24} color="white" />
                                            </a> 
                                        )
                                    }
                                    {
                                        n.github && (
                                            <a
                                                href={n.github}
                                                target="_blank"
                                                className="border-t border-l border-white w-full flex justify-center py-3 hover:shadow-[0px_0px_5px_0px_#22B77E_inset] transition-all duration-400"
                                            >
                                                <GithubLogo size={24} color="white" />
                                            </a> 
                                        )
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default BoxAbout;