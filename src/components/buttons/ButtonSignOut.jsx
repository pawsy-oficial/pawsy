import { SignOut, Warning } from "@phosphor-icons/react";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import Cookies from "js-cookie";

function ButtonSignOut({ icon = false }) {
    const handleButtonClickSignOut = () => {
        const allCookies = Cookies.get();
        for (let cookie in allCookies) {
            Cookies.remove(cookie);
        }

        window.location.reload();
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger
                asChild
            >
                <button
                    type="button"
                    title="Desconectar da conta"
                    className={`flex gap-3 items-center px-3 py-1 cursor-pointer hover:bg-primary/10 transition-all ${icon ? "w-fit" : "w-full"}`}
                >
                    {
                        icon 
                        ? (
                            <>
                                <SignOut size={24} color="#fff" />
                            </>
                        )
                        : (
                            <>
                                <SignOut size={24} color="#22B77E" />
                                <span>Sair</span>
                            </>
                        )
                    }
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-primary/50 z-[60] flex justify-center items-center fixed inset-0" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white w-80 py-4 px-4 rounded-lg">
                    <AlertDialog.Description 
                        asChild 
                        className="text-mauve11 mt-4 mb-5 leading-normal"
                    >
                        <main
                            className="flex flex-col gap-4"
                        >
                            <div
                                className="flex items-center gap-2 justify-center flex-col"
                            >
                                <Warning color="#dc3454" size={40} weight="fill" />
                                <h3
                                    className="text-2xl font-bold font-sora text-center"
                                >
                                    Você tem certeza?
                                </h3>
                            </div>

                            <p
                                className="text-center"
                            >
                                Você está prestes a sair da plataforma. Você quer continuar?
                            </p>
                        </main>
                    </AlertDialog.Description>
                    <div 
                        className="flex justify-between gap-6 mt-6"
                    >
                        <AlertDialog.Cancel 
                            asChild
                        >
                            <button
                                className="bg-green-600 rounded py-1 px-4 w-full text-white"
                            >
                                Cancelar
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action 
                            asChild
                            >
                            <button 
                                onClick={handleButtonClickSignOut}
                                className="hover:bg-red-error w-full hover:text-white transition-all rounded py-1 px-4 text-red-error border border-red-error "
                            >
                                Sair
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>

    );
}

export default ButtonSignOut;