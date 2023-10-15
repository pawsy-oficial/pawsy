import { useEffect, useState } from "react"
import "../../style/animate.css"

export default function BoxPets() {

    let [ blobs, setBlobs ] = useState([])

    useEffect(()=>{
        creatBlob()
    },[])

    function creatBlob(){
        let blob = []
        for (let i = 1; i < 9; i++) {
            // console.log(blob);
            let randomNumber = parseInt(Math.random() * (9 - 2) + 2)

            blob.push(
                <img
                    src={`../pet_0${i}.jpg`}
                    className={`rounded-full border-2 border-primary absolute blob-animate shadow-[10px_26px_20px_rgba(0,0,0,.2)]`}
                    style={{
                        animationDelay: `${Math.random()}s`,
                        animationDuration: `${Math.random()*(40-30)+30}s`,
                        top: `${randomNumber*10}%`,
                        width: `${randomNumber * 10 }px`,
                        height: `${randomNumber * 10 }px`
                    }}
                    draggable="false"
                />
            )
        }

        setBlobs(blob)
    }

    return (
        <div>
            {blobs.map(blob => blob)}
        </div>
    )
}