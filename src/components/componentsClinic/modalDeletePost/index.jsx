export default function ModalDeletePost({ isOpen, setOpen }) {
	isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
	return (
		<>
			{
				isOpen 
				&& (
					<div className="inset-0 fixed bg-primary/80 z-[800] flex justify-center items-center">
						<div className="flex flex-col fixed bg-white w-1/2 max-w-md p-6 rounded-lg">
							<h2 className="text-2xl font-bold">AVISO</h2>
							<div className="flex pt-6 flex-col gap-1">
								<p className="text-sm">
									Antes de excluir o anúncio, certifique-se de que não precisa mais dele. Uma vez excluído, o item não poderá ser recuperado.
								</p>
							</div>
							<div className="flex flex-row justify-end pt-6 gap-4">
								<button
									onClick={() => setOpen(!isOpen)}
									className="flex items-center bg-[#04AD34] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
								>
									Confirmar
								</button>
								<button
									onClick={() => setOpen(!isOpen)}
									className="flex items-center bg-[#DC3545] text-white w-[7.688rem] h-8 justify-center rounded-lg gap-[10px]"
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				)
			}
		</>
	);

}