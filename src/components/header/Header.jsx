import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import ProfileModal from "./ProfileModal";
import Notification from "./Notification";
import { useEffect, useState } from "react";

import Logo from "../../img/logoPawsyGreen.svg"
import { NavBar } from "../Navbar";
import SearcInput from "./SearchInput";

export function Header({ userType }) {

  const pages = [
    {
      name: "Inicío",
      pathname: "/tutor",
    },
    {
      name: "Carteira de vacinação",
      pathname: "/carteira",
    },
    {
      name: "Agendar consulta",
      pathname: "/consulta",
    },
    {
      name: "Vét. mais próximo",
      pathname: "/vets",
    },
    {
      name: "Bem-estar",
      pathname: "/bem-estar",
    },
    {
      name: "Receitas",
      pathname: "/receitas",
    },
  ];


  const [windowScreen, setWindowScreen] = useState({ width: null })

  useEffect(() => {
    function handleResize() {
      setWindowScreen({ width: window.innerWidth })
    }
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const [navState, setNavState] = useState(false)
  const [searchState, setSearchState] = useState(false)

  useEffect(()=>{
    if(windowScreen.width > 1020){
      setNavState(false)
      setSearchState(false)
    }
  },[windowScreen])

  return (
    <>
      <header className="w-full bg-[#F9FFFD] py-3 px-6 md:px-20 sticky top-0 z-50">
        <div className="flex justify-between xl:justify-end items-center">
          <button
            className="block lg:hidden"
            onClick={() => setNavState(!navState)}
          >
            {
              navState
                ? <X size={24} />
                : <List size={24} />
            }
          </button>
          <img src={Logo} className="block lg:hidden translate-x-[20%]" />
          
        {
          userType == "tutor" && (
            <SearcInput/>
          )
        }

          <div className="flex gap-4 items-center">
            <div>

              {
                windowScreen.width < 1020
                  ? (
                    <button onClick={()=>setSearchState(!searchState)}>
                      <MagnifyingGlass size={24} />
                    </button>
                  )
                  : <Notification />
              }

            </div>
            <div className="">
              <ProfileModal />
            </div>
          </div>


        </div>
        {
          searchState && (
            <div className="w-full mt-2">
              <input type="search" className="w-full h-full py-1 px-3 border focus:border-primary"/>
            </div>
          )
        }
        {
          navState && (
            <div className=" bg-[#F9FFFD] absolute left-0 right-0 top-full border-b-2 border-primary rounded-b-xl">
              <ul>

                {
                  pages.map((page, index) => { return <NavBar page={page} key={index} /> })
                }

              </ul>
            </div>
          )
        }
      </header>
    </>
  );
}
