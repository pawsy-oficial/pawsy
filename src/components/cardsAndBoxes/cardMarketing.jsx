import dayjs from "dayjs";
import ModalDeletePost from "../componentsClinic/modalDeletePost";
import { memo, useState } from "react";

function PostAd({ title, description, limiteDate, limit, typeAd, image, idPost, loading }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="w-full bg-white rounded-lg gap-6 flex p-6">
			<div className="min-w-[15rem] max-w-[15rem] h-60 overflow-hidden rounded-lg border-2 border-secundary">
				<img 
					src={`${import.meta.env.VITE_URL}/files/${image}`} 
					alt={title}
					className="w-full h-full object-cover"
					draggable={false}
				/>
			</div>

			<div className="w-full flex flex-col gap-2 justify-between">
				<div className="flex flex-col gap-6">
					<h3 className="text-2xl font-bold capitalize">
						{title}
					</h3>
					<p className="text-sm">
						{description}
					</p>
					<p>
						{typeAd}
					</p>
					<div
						className="flex flex-col gap-1"
					>
						<p>
							{limit} dias
						</p>
						<small
							className="text-zinc-500"
						>
							{dayjs(limiteDate).format("DD/MM/YYYY")}
						</small>
					</div>
				</div>
				<div className="flex justify-end gap-6">
					<button
						title="Deletar Post"
						onClick={() => setOpen(!open)}
						type="submit"
						className="bg-[#DC3545] hover:bg-[#c7303f] w-[7.438rem] h-[2.188rem] rounded-lg text-white"
					>
						Apagar
					</button>

					<button
						title="Editar Post"
						// onClick={handleDeleteComment}
						type="submit"
						className="bg-[#1F9EAB] hover:bg-[#2797a3] w-[6.813rem] h-[2.188rem] rounded-lg text-white"
					>
						Editar
					</button>
				</div>
			</div>
			<ModalDeletePost 
				isOpen={open} 
				setOpen={setOpen} 
				idPost={idPost}
				loading={loading}
			/>
		</div>
	);
}

export default memo(PostAd)