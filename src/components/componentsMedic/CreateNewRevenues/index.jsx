import axios from "axios";
import LogoWaterMark from "../../../img/waterMark.svg";
import { CreateNewMedicines } from "../CreateNewMedicines";
import { PlusCircle, XCircle } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"

export function CreateNewRevenues({revenues, setRevenues}) {
  const [isComponentVisible, setComponentVisibility] = useState(false);
  const [typeRevenue, setTypeRevenue] = useState([])
  const [selectedOption, setSelectedOption] = useState("")

  const toggleComponent = () => {
    setComponentVisibility(!isComponentVisible);
  };

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_URL}/get-type-revenue`)
    .then(result => {
        console.log(result);
        setTypeRevenue(result.data.results)
    })
    .catch(err => console.log(err))
},[])

  const schema = Yup.object({
    selectedOption: Yup.string().required("Campo obrigatório")
})
  const { handleSubmit, register, formState } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
});

  return (
    <div className="w-[595px] h-[892px] my-8 mx-auto bg-white border border-primary relative">
      <img
        src={LogoWaterMark}
        alt="marca d'água PAWSY"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex py-6 px-8 w-[593px] h-[110px] bg-[#F5FFFE] text-xs font-bold flex-col justify-between">
        <div className="flex flex-row items-center gap-4">
          <p>Tipo da receita:</p>
          <select
              className="w-[200px] flex items-center rounded-lg py-1 text-xs font-bold h-[25px] bg-white focus:outline-none"
              {...register("selectedOption", {
                  onChange: e => setSelectedOption(e.target.selectedIndex)
              })}
          >
              {
                  typeRevenue.map(tp => {
                      return(
                          <option 
                              value={tp.id_TipoReceita}
                          >
                              {tp.nm_TipoReceita}
                          </option>
                      )
                  })
              }
            </select>
        </div>

        <div className="flex flex-row items-center gap-4 text-zinc-900">
          <p>Data de validade:</p> <input type="date" placeholder="" />
        </div>
      </div>

      <section className="flex flex-col gap-6 py-8 z-10">
        <CreateNewMedicines />
      </section>

      {/* <div className="flex justify-center flex-col items-center gap-6">
        {isComponentVisible && <CreateNewMedicines />}
        <button
          className="flex z-10 w-fit items-center justify-center text-lg font-semibold cursor-pointer text-primary gap-3"
          onClick={toggleComponent}
        >
          <PlusCircle size={20} />
          adicionar
        </button>
      </div> */}

      <div className="flex justify-center flex-col items-center gap-6">
        {isComponentVisible ? (
          <div className="flex justify-center flex-col items-center gap-6">
            <CreateNewMedicines />
            <button
              className="flex z-10 w-fit items-center justify-center text-lg font-semibold cursor-pointer text-red-500 gap-3"
              onClick={toggleComponent}
            >
              <XCircle size={20} />
              cancelar
            </button>
            <button
            className="flex z-10 w-fit items-center justify-center text-lg font-semibold cursor-pointer text-primary gap-3"
            onClick={() => setRevenues([...revenues, <CreateNewRevenues revenues={revenues} setRevenues={setRevenues} />])}
          >
            <PlusCircle size={20} />
            adicionar
          </button>
          </div>
        ) : (
          <button
            className="flex z-10 w-fit items-center justify-center text-lg font-semibold cursor-pointer text-primary gap-3"
            onClick={toggleComponent}
          >
            <PlusCircle size={20} />
            adicionar
          </button>
        )}
      </div>

      <div className="w-44 h-[1px] my-20 mx-auto bg-black">
        <div className="flex flex-col items-center">
          <p className="text-xs">Drª Vanessa Santos</p>
          <p className="text-[9px]">CRMV: 10.000</p>
        </div>
      </div>

      <div className="w-[595px] h-8 bg-primary flex justify-center items-center absolute bottom-0">
        <img src="src/img/logo.png" alt="" className="w-16" />
      </div>
    </div>
  );
}
