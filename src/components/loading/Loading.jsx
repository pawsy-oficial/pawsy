import Logo from "../../img/logoPawsy.svg"

export function LoadingPrimary() {
    return (
        <div className="bg-primary absolute inset-0 flex justify-center items-center">
            <img src={Logo} alt="Logo - pawsy" className="w-96" />
        </div>
    )
}


export function LoadingPagesPlaceholder() {
    return (
        <main className="flex min-h-screen">
            <section className="bg-primary h-full min-h-screen sticky top-0 px-6 py-10 flex flex-col gap-16 justify-between">
                <div className="w-52 h-10 bg-white/30 animate-pulse" />

                <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
                    <ul className="flex flex-col gap-4">
                        <li className={`nav-link h-7 bg-[#F5F7FB]/10 animate-bounce`} />
                        <li className={`nav-link h-7 bg-[#F5F7FB]/10 animate-bounce`} />
                        <li className={`nav-link h-7 bg-[#F5F7FB]/10 animate-bounce`} />
                        <li className={`nav-link h-7 bg-[#F5F7FB]/10 animate-bounce`} />
                        <li className={`nav-link h-7 bg-[#F5F7FB]/10 animate-bounce`} />
                    </ul>
                </nav>
                <div className="flex justify-between text-white">
                    <span className="w-6 h-6 bg-white/50" />
                    <span className="w-6 h-6 bg-white/50" />
                </div>
            </section>

            <section className="flex-1">
                <header className="w-full bg-[#F9FFFD] py-3 px-20 flex justify-end items-center">
                    <div className="flex mx-auto h-6 w-60 bg-primary/30 animate-bounce"/>
                    <div className="flex gap-4 items-center">
                        <div className="w-6 h-6 bg-primary/50 rounded-full animate-pulse delay-700"/>
                        <div className="w-8 h-8 bg-primary/50 animate-pulse"/>
                    </div>
                </header>

                <main className={`pl-10 pr-16 py-8 flex gap-5 justify-center`}>
                </main>
            </section>
        </main>
    )
}
