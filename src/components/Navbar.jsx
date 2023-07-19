import { Question, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import Logo from "../img/logoPawsy.svg";

export function NavBar({page}, index) {
  const isActive = (pathname) => {
    return window?.location?.pathname === pathname;
  };
  // console.log(page.pathname);
  const navigate = useNavigate()
  return (

    <li
      key={index}
      className={`nav-link ${isActive(page.pathname) && "mt-6 md:mt-0 lg:bg-[#F5F7FB] !text-black f after:block before:block"}`}
      onClick={() => navigate(`${page.pathname}`)}
    >
      <span>{page.name}</span>
    </li>
  )
}

export function NavbarTutor({ page }) {
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

  

  return (
    <section className="nav_bar">
      <div className="w-52">
        <img src={Logo} alt="Logotipo PAWSY" />
      </div>

      <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
        <ul>
          {pages.map((page, index) => {
            return (
              <NavBar page={page} key={index}/>
            );
          })}
        </ul>
      </nav>
      <div className="flex justify-between text-white">
        <span>
          <SignOut size={24} color="#fff" />
        </span>
        <span>
          <Question size={24} color="#fff" />
        </span>
      </div>
    </section>
  );
}

export function NavbarClinic() {
  const pages = [
    {
      name: "Inicío",
      pathname: "/clinica",
    },
    {
      name: "Agenda",
      pathname: "/agenda",
    },
    {
      name: "Marketing",
      pathname: "/marketing",
    },
    {
      name: "Pacientes",
      pathname: "/pacientes",
    },
    {
      name: "Perfil",
      pathname: "/perfil",
    },
  ];

  const isActive = (pathname) => {
    return window?.location?.pathname === pathname;
  };

  const navigate = useNavigate()

  return (
    <section className="nav_bar">
      <div className="w-52">
        <img src={Logo} />
      </div>
      <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
        <ul>

          {pages.map((page, index) => {
            return (
              <NavBar page={page} key={index}/>
            );
          })}
        </ul>
      </nav>
      <div className="flex justify-between text-white">
        <span>
          <SignOut size={24} color="#fff" />
        </span>
        <span>
          <Question size={24} color="#fff" />
        </span>
      </div>
    </section>
  );
}