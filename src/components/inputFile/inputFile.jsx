import { Camera, PaperPlaneTilt } from "@phosphor-icons/react";
import { useState, memo } from "react";

function InputFile() {

    const [srcImage, setSrcImage] = useState('')

    function previewImage() {
        const fileInput = document.getElementById("inputFile");

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setSrcImage(e.target.result);
            };

            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    return (
        <form
            action=""
            className="relative flex flex-col text-center py-[0.4rem]"
        >
            <div className="bg-gray-white border border-primary rounded-lg w-[17.313rem] h-64">
                <label
                    className="justify-center flex items-center h-full cursor-pointer"
                    htmlFor="inputFile"
                >
                    {
                        srcImage
                            ? (
                                <img
                                    id="imagePreview"
                                    src={srcImage}
                                    alt="Preview da imagem"
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            )
                            : (
                                <div
                                    className="bg-[#22B77E33]/20 w-20 h-20 flex items-center justify-center rounded-full"
                                >
                                    <Camera size={64} color="#22B77E" />
                                </div>
                            )
                    }
                </label>
                <div className="absolute right-0 py-[2rem]">
                    <button
                        className="bg-[#04AD34] hover:bg-[#12be18] h-10 w-28 rounded-lg text-white flex flex-row items-center justify-center gap-3"
                        type="submit"
                    >
                        Publicar <PaperPlaneTilt />
                    </button>
                </div>
                <input
                    className="hidden"
                    type="file"
                    onChange={previewImage}
                    accept="image/*"
                    id="inputFile"
                />
            </div>
            <p className="text-[#909090] text-xs ">800 x 800</p>
        </form>
    )
}

export default memo(InputFile)