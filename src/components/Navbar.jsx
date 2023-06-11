import { Question, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import Logo from "../img/logoPawsy.svg";

export function NavbarTutor({page}) {
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

  const isActive = (pathname) => {
    return window?.location?.pathname === pathname;
  };

  const navigate = useNavigate()

  return (
    <section className="bg-primary h-full min-h-screen sticky top-0 px-6 py-10 flex flex-col gap-16 justify-between">
      <div className="w-52">
        <img src={Logo} alt="Logotipo PAWSY" />
      </div>

      <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
        <ul>
          {pages.map((page, index) => {
            return (
              <li
                key={index}
                className={`nav-link ${isActive(page.pathname) && "bg-[#F5F7FB] !text-black f after:block before:block"
                  }`}
                onClick={() => navigate(`${page.pathname}`)}
              >
                <span>{page.name}</span>
              </li>
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
    <section className="bg-primary h-full min-h-screen sticky top-0 px-6 py-10 flex flex-col gap-16 justify-between">
      <div className="w-52">
        <img src={Logo} />
      </div>
      <nav className="flex flex-col w-[calc(100%+24px)] gap-4">
        <ul>

          {pages.map((page, index) => {
            return (
              <li
                key={index}
                className={`nav-link ${isActive(page.pathname) && "bg-[#F5F7FB] !text-black f after:block before:block"
                  }`}
                onClick={() => navigate(`${page.pathname}`)}
              >
                <span>{page.name}</span>
              </li>
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