import SadCat from "../../img/sad_cat.png"

export default function ScheduleNotFound({mesage}){
    return(
        <div className="flex flex-col items-center relative sm:left-1/2 lg:left-full">
            <figure className="translate-y-4">
                <img src={SadCat} alt="Gato triste" draggable={false} />
            </figure>
            <div className="bg-red-error-100 rounded-lg p-4 w-full md:w-96 z-10">
                <p className="text-xs">
                    {mesage}
                </p>
            </div>
        </div>
    )
}