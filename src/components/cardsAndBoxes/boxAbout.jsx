import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function BoxAbout({ name, image, role, network }) {
    return (
        <div
            className="flex flex-col gap-4"
        >
            <div
                className="w-56 h-56 rounded-full overflow-hidden"
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
                                            className=""
                                        >
                                            <LinkedinLogo size={24} color="#9CA3AF" />
                                        </a>
                                    )
                                }
                                {
                                    n.instagram && (
                                        <a
                                            href={n.instagram}
                                            target="_blank"
                                        >
                                            <InstagramLogo size={24} color="#9CA3AF" />
                                        </a>
                                    )
                                }
                                {
                                    n.github && (
                                        <a
                                            href={n.github}
                                            target="_blank"
                                        >
                                            <GithubLogo size={24} color="#9CA3AF" />
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