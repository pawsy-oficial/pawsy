import { Camera } from "@phosphor-icons/react";
import { memo } from "react";

function InputFile({ Controller, control, setSelectImage, urlImage }) {
    return (
        <label
            className="rounded-lg w-64 h-64  bg-gray-white border-2 self-center border-primary overflow-hidden flex flex-col items-center justify-center cursor-pointer"
            title="Imagem do anúncio"
        >
            {
                urlImage
                    ? <img className="w-full h-full object-cover" src={urlImage} />
                    : <Camera size={48} color="#22937E" />
            }
            <Controller
                name="urlImage"
                control={control}
                render={({ field }) => (
                    <input
                        type="file"
                        multiple={false}
                        className="hidden"
                        onChange={event => {
                            field.onChange(event.target.files[0]);
                            setSelectImage(event.target.files[0]);
                        }}
                        accept="image/png, image/jpg, image/jpeg"
                    />
                )}
            />
        </label>
    )
}

export default memo(InputFile)