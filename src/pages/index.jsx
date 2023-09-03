import { useNavigate } from "react-router-dom"
import Logo from "../img/logoPawsy.svg"
import { HeaderLandingPage } from "../components/header/Header"

export default function Home() {
    const navigate = useNavigate()
  return (
    <main className="min-h-screen">
        <HeaderLandingPage/>
    </main>
  )
}
