

export default function ButtonOptionsLogin({ title, description, imageName }) {

    const tutor = {
        title,
        description,
        imageName
    }

    return (
        <button
            className="px-6 py-4 rounded-lg flex gap-6 justify-between items-center bg-white hover:bg-sky-50 transition-colors"
        >
            <div
                className="flex flex-col items-start gap-3"
            >

                <strong
                    className="font-lato font-bold text-[2em] "
                >
                    {tutor.title}
                </strong>
                <span
                    className="text-sm font-lato text-zinc-400"
                >
                    {tutor.description}
                </span>
            </div>

            <img src={tutor.imageName} alt="" />

        </button>
    )
}
