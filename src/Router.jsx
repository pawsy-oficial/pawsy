import { Route, Routes } from "react-router-dom"
import Tutor from "./pages/tutor/Tutor"
import Clinic from "./pages/clinic/Clinic"
import VetCloser from "./pages/tutor/VetCloser"

export default function Router(){
    return(
        <Routes>
            <Route path="/tutor" element={<Tutor/>} />
            <Route path="/clinica" element={<Clinic/>} />
            <Route path="/vets" element={<VetCloser/>} />
        </Routes>
    )
}