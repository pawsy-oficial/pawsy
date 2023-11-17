import { CaretUp } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

function GoToTop() {
    const [level, setLevel] = useState(0)
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])

    function handleScroll() {
        let scroll = window.scrollY
        // console.log(scroll);
        if (scroll < 20) {
            setLevel(0)
        }
        else if (scroll > 40 && scroll < 2543) {
            setLevel(1)
        }
        else if (scroll > 2543) {
            setLevel(2)
        }
    }

    function goToTop() {
        document.body.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            {
                level != 0 && (
                    <button
                        className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-2"
                        onClick={goToTop}
                    >
                        {/* <svg className={`${level == 1 ? "fill-primary" : "fill-white"} w-10 transition-colors duration-300`} viewBox="0 0 435 417" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M66.5355 268.179C89.0406 252.633 165.352 233.203 174.725 237.218C194.972 253.749 238.742 325.327 240.217 374.309C241.138 404.894 186.369 440.519 150.691 394.594C138.635 379.075 136.104 365.47 123.779 362.847C108.607 359.617 100.763 376.602 67.0205 375.061C17.1934 372.785 6.46389 309.675 66.5355 268.179Z" />
                            <path d="M76.6308 72.2136C70.2558 68.3165 63.3137 66.1212 56.2246 66.0942C44.6907 66.0442 6.6695 77.4102 0.085045 147.834C-0.534855 154.466 1.07685 209.04 45.7107 217.736C79.1826 224.258 104.02 182.041 107.367 140.706C109.778 110.923 95.7554 83.9061 76.6308 72.2136Z" />
                            <path d="M409.119 274.567C407.736 267.1 404.688 260.342 399.907 254.924C392.133 246.104 357.82 224.753 300.314 266.902C294.899 270.871 254.883 308.648 278.563 348.472C296.32 378.338 344.942 368.984 378.345 343.851C402.412 325.741 413.264 296.966 409.119 274.567Z" />
                            <path d="M217.03 0.47779C221.177 1.30929 225.135 2.84924 228.843 4.99625C251.506 18.1148 264.862 53.885 255.025 89.0421C243.11 131.626 208.654 170.734 175.156 157.059C130.487 138.824 139.942 81.371 141.941 74.556C163.158 2.18616 205.038 -1.92772 217.03 0.47779Z" />
                            <path d="M373.005 92.7449C376.197 95.5186 378.875 98.8148 381.036 102.515C394.242 125.127 388.155 162.821 362.214 188.509C330.794 219.624 281.503 236.567 259.155 208.111C229.355 170.167 265.993 124.913 271.101 119.979C325.34 67.5801 363.772 84.7219 373.005 92.7449Z" />
                        </svg> */}

                        <div
                            className={`flex gap-2 ${level == 1 ? "bg-primary text-white": "text-black bg-white"} items-center p-1 rounded transition-colors duration-300`}
                        >
                            <CaretUp size={18} weight="bold"/>
                        </div>
                    </button>
                )
            }
        </>
    )
}

export default GoToTop