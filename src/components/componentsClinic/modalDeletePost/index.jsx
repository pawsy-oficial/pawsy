import axios from "axios";
import Cookies from "js-cookie";

export default function ModalDeletePost({ isOpen, setOpen, idPost: idAd, loading }) {
	isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
	
	function deletePost(){
		loading(true)
		axios.delete(`${import.meta.env.VITE_URL}/ads/${idAd}`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("jwtTokenClinic")}`
			}
		})
		.then(res => {
			console.log(res)
			setOpen(!isOpen)
			loading(false)
		})
		.catch(err => console.log(err))
	}

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
									Antes de excluir o anúncio, certifique-se de que não precisa mais dele. Uma vez excluído, <strong> o item não poderá ser recuperado</strong>.
								</p>
							</div>
							<div className="flex flex-row justify-end pt-6 gap-4">
								<button
									onClick={deletePost}
									className="flex items-center border text-emerald-600 font-bold border-primary hover:bg-primary hover:text-white px-6 py-1 justify-center rounded-lg"
									>
									Confirmar
								</button>
								<button
									onClick={() => setOpen(!isOpen)}
									className="flex items-center bg-red-error text-white font-bold px-6 py-1 justify-center rounded-lg"
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