export function CreateNewMedicines() {
  return (
    <div className="flex flex-col mx-auto pb-8 pt-4 px-6 gap-3 w-[531px] border border-[#1BA8C4] rounded-lg z-10">
      <div className="flex flex-col gap-2">
        <div className="flex gap-8 text-xs items-center">
          <p>Medicamento:</p>
          <input
            type="text"
            className="bg-[#F5FFFE] w-80 h-5 border border-primary rounded pl-1"
          />
        </div>
        <div className="flex gap-2 text-xs ">
          <strong className="font-bold">
            Concentração:{" "}
            <input
              type="text"
              className="w-9 h-5 border pl-1 border-primary bg-[#F5FFFE] rounded"
            />
          </strong>
          <strong className="font-bold">
            Via Administração:{" "}
            <select
              name=""
              id=""
              className="w-28 h-5 border border-primary bg-[#F5FFFE] rounded"
            >
              <option value="">Via oral</option>
              <option value="">Retal</option>
              <option value="">Sublingual</option>
              <option value="">Intravenoso</option>
              <option value="">Dermatológica</option>
              <option value="">Nasal </option>
              <option value="">Oftálmica </option>
            </select>
          </strong>
          <strong className="font-bold">
            Quantidade:{" "}
            <input
              type="text"
              className="w-9 h-5 border pl-1 border-primary bg-[#F5FFFE] rounded"
            />
          </strong>
        </div>
        <div className="flex justify-between gap-3 text-xs">
          <strong className="font-bold">
            Duração:{" "}
            <input
              type="text"
              className="w-9 h-5 border pl-1 border-primary bg-[#F5FFFE] rounded"
            />
          </strong>
        </div>
      </div>
      <div className="flex flex-col mx-auto py-5 px-4 gap-2 w-[485px] text-xs bg-[#F5FFFE] border border-primary rounded z-20">
        <strong>Posologia:</strong>
        <input
          type="text"
          placeholder="Coloque aqui a posologia do medicamento"
          className="bg-[#F5FFFE] w-[15rem] h-[1rem]"
        />
      </div>
    </div>
  );
}
