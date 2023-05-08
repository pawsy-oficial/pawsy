import { Bell, MagnifyingGlass } from "@phosphor-icons/react";
import ProfileModal from "./ProfileModal";
import Notification from "./Notification";

export function Header(){
    return(
        <header className="w-full bg-[#F9FFFD] py-3 px-20 flex justify-end items-center">
            <div className="flex mx-auto h-6">
                <input type="text" placeholder="Pesquisar" className="py-1 px-3 w-80 border-b-2 text-xs border-primary"/>
                <button className="rounded-r-md bg-primary py-1 w-14 flex justify-center items-center" title="pesquisa">
                    <MagnifyingGlass size={16} color="#fff" weight="bold"/>
                </button>
            </div>
            <div className="flex gap-4 items-center">
                <div>
                    <Notification/>
                </div>
                <div className="">
                    
                    <ProfileModal/>
                </div>
            </div>
        </header>
    )
}