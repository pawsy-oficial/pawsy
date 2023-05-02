import { Route, Routes } from "react-router-dom"
import Tutor from "./pages/Tutor"
import Clinic from "./pages/Clinic"

export default function Router(){
    return(
        <Routes>
            <Route path="/tutor" element={<Tutor/>} />
            <Route path="/clinica" element={<Clinic/>} />
        </Routes>
    )
}