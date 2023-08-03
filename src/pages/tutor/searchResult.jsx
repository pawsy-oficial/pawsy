import { useLocation } from "react-router-dom"

export default function SearchResult() {
    
    const location = useLocation()
    const { idPet } = location.state

    return (
    <main>
        resultado { idPet }
    </main>
  )
}
