import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Cookies from "js-cookie";
import { Trash, Warning } from "@phosphor-icons/react";
import axios from "axios";

export default function ModalDeleteVaccine({idVaccine, confirmDelete, setConfirmDelete}) {
  const jwtTokenMedic = Cookies.get("jwtTokenMedic");

  const handleExcluirVacina = () => {
    axios
      .delete(`${import.meta.env.VITE_URL}/delete-vacina/${idVaccine}`, {
        headers: {
          Authorization: `Bearer ${jwtTokenMedic}`,
        },
      })
      .then(() => {
        console.log("vacina excluída com sucesso");
        setConfirmDelete(!confirmDelete)
      })
      .catch(() => {
        console.log("vacina não excluída");
      });
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="button"
          className="group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Trash size={20} className="hover:fill-red-error" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-primary/50 z-[60] flex justify-center items-center fixed inset-0"
        />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white w-80 py-4 px-4 rounded-lg">
          <AlertDialog.Description
            asChild
            className="text-mauve11 mt-4 mb-5 leading-normal"
          >
            <main
            onClick={(e) => {
              e.stopPropagation();
            }}
             className="flex flex-col gap-4">
              <div className="flex items-center gap-2 justify-center flex-col">
                <Warning color="#dc3454" size={40} weight="fill" />
                <h3 className="text-2xl font-bold font-sora text-center">
                  Você tem certeza que deseja excluir esta vacina?
                </h3>
              </div>

              <p className="text-center">
                Você está prestes a excluir esta vacina. Você quer continuar?
              </p>
            </main>
          </AlertDialog.Description>
          <div className="flex justify-between gap-6 mt-6">
            <AlertDialog.Cancel asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-green-600 rounded py-1 px-4 w-full text-white"
              >
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExcluirVacina();
                }}
                className="hover:bg-red-error w-full hover:text-white transition-all rounded py-1 px-4 text-red-error border border-red-error "
              >
                Excluir
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
