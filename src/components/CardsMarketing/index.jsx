import photoMarketing from "../../img/photoMarketing.png";
import ModalDeletePost from "../componentsClinic/modalDeletePost";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function Post({ content, onDeletePost }) {
  const notify = (message) => {
    toast.success("Ação realizada com sucesso", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const [open, setOpen] = useState(false);

  function handleDeletePost() {
    onDeletePost(content);
  }

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  return (
    <div className="w-[69rem] h-[18rem] bg-white rounded-lg gap-6 flex p-6">
      <div className="">
        <img src={photoMarketing} alt="" />
      </div>

      <div className="w-[48.75rem] flex">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">
            “Dia D” de vacinação contra a raiva animal
          </h1>
          <p className="text-xs">
            A Superintendência de Vigilância em Saúde, por meio da Unidade de
            Vigilância das Zoonoses comunica que no próximo dia 04 de dezembro
            (SÁBADO) será realizado o “Dia D” de vacinação contra a raiva
            animal.
          </p>
          <p>Campanha de vacinação</p>
          <p>15 dias</p>
        </div>
        <div className="items-end flex gap-6">
          <button
            title="Deletar Post"
            onClick={() => setOpen(!open)}
            type="submit"
            className="bg-[#DC3545] hover:bg-[#c7303f] w-[7.438rem] h-[2.188rem] rounded-lg text-white"
          >
            Apagar
          </button>
          <ModalDeletePost isOpen={open} setOpen={setOpen} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <button
            title="Editar Post"
            onClick={handleDeleteComment}
            type="submit"
            className="bg-[#1F9EAB] hover:bg-[#2797a3] w-[6.813rem] h-[2.188rem] rounded-lg text-white"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
