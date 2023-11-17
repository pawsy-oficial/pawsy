import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function BoxAbout({ name, image, role, network }) {
    return (
        <div
            className="flex flex-col items-center gap-4"
        >
            <div
                className="w-56 h-56 rounded-full overflow-hidden"
                style={{ boxShadow: "3px -3px 0px 0px rgba(34, 183, 126, 0.25), -3px 3px 0px 0px rgba(31, 158, 171, 0.40), 3px 5px 5.8px 0px rgba(0, 0, 0, 0.50) inset" }}
            >
                <img
                    src={image}
                    alt={`@${name}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </div>


            <div
                className="flex flex-col items-center gap-1"
            >
                <strong
                    className="text-zinc-800 font-sora text-2xl selection:bg-primary"
                >
                    {name}
                </strong>
                <span
                    className="font-lato text-sm text-zinc-500"
                >
                    {role}
                </span>
            </div>

            <div
                className="flex w-full gap-6 items-center justify-center"
            >
                {
                    network.map(n => {
                        return (
                            <>
                                {
                                    n.linkedin && (
                                        <a
                                            href={n.linkedin}
                                            target="_blank"
                                            title={`link para o LinkedIn de @${name}`}
                                        >
                                            <LinkedinLogo 
                                                size={24} 
                                                color="#9CA3AF"
                                                className="hover:fill-primary"
                                            />
                                        </a>
                                    )
                                }
                                {
                                    n.instagram && (
                                        <a
                                            href={n.instagram}
                                            target="_blank"
                                            title={`link para o Instagram de @${name}`}
                                        >
                                            <InstagramLogo 
                                                size={24} 
                                                color="#9CA3AF"
                                                className="hover:fill-primary"
                                            />
                                        </a>
                                    )
                                }
                                {
                                    n.github && (
                                        <a
                                            href={n.github}
                                            target="_blank"
                                            title={`link para o Github de @${name}`}
                                        >
                                            <GithubLogo 
                                                size={24} 
                                                color="#9CA3AF"
                                                className="hover:fill-primary"
                                            />
                                        </a>
                                    )
                                }
                            </>
                        )
                    })
                }
            </div>


        </div>
    );
}

export default BoxAbout;