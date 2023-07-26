import Logo from "../img/text236.png";

export function HeaderMedic(){
  return(
    <header className="bg-white shadow-lg flex p-3">
      <div className="">
        <img src={Logo} alt="Logo" className="w-36"/>
      </div>
    </header>
  )
}