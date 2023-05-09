import { Route, Routes } from "react-router-dom"
import Tutor from "./pages/tutor/Tutor"
import Clinic from "./pages/clinic/Clinic"
import VaccinePage from "./pages/tutor/Vaccine"


export default function Router(){
    return(
        <Routes>
            <Route path="/tutor" element={<Tutor/>} />
            <Route path="/carteira" element={<VaccinePage/>} />
            <Route path="/clinica" element={<Clinic/>} />
        </Routes>
    )
}