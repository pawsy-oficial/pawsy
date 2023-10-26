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
        <section
            className="flex flex-col justify-center"
        >
            <div className="bg-gray-white border-2 self-center border-primary rounded-lg w-64 h-64">
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
                <input
                    className="hidden"
                    type="file"
                    onChange={previewImage}
                    accept="image/*"
                    id="inputFile"
                />
            </div>
        </section>
    )
}

export default memo(InputFile)