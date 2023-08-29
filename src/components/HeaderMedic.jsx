import Logo from "../img/logo_green.svg";
import ProfileModal from "./header/ProfileModal";
import Notification from "./header/Notification";

export function HeaderMedic() {
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
          <ProfileModal />
        </div>
      </div>
    </header>
  );
}
