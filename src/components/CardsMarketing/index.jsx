import photoMarketing from "../../img/photoMarketing.png";

export default function Post({ content, onDeletePost }) {
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

        <div className="py-52 flex gap-6">
          <button
            title="Deletar Post"
            onClick={handleDeletePost}
            type="submit"
            className="bg-[#DC3545] hover:bg-[#c7303f] w-[7.438rem] h-[2.188rem] rounded-lg text-white"
          >
            Apagar
          </button>
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
