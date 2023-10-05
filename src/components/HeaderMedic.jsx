import Logo from "../img/logo_green.svg";
import ProfileModal from "./header/ProfileModal";
import Notification from "./header/Notification";
import { SignOut } from "@phosphor-icons/react";
import Cookies from 'js-cookie';

export function HeaderMedic() {
	const handleButtonClickSignOut = () => {
		const allCookies = Cookies.get();
		for (let cookie in allCookies) {
			Cookies.remove(cookie);
		}

		window.location.reload();
	};

	return (
		<header className="bg-white flex px-16 py-4 justify-between items-center shadow-md">
			<div className="w-36 h-8">
				<img src={Logo} alt="Logo" className="w-full h-full object-cover" draggable="false" />
			</div>

			<div className="flex gap-4 items-center">
				<div>
					<Notification />
				</div>
				<div className="">
					<ProfileModal userType={"medico"} />
				</div>
				<div className="">
					<button
						onClick={handleButtonClickSignOut}
					>
						<SignOut size={24} color="#000" />
					</button>
				</div>
			</div>
		</header>
	);
}
