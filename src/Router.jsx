import { Route, Routes } from "react-router-dom"
import Tutor from "./pages/tutor/Tutor"
import VaccinePage from "./pages/tutor/Vaccine"
import VetCloser from "./pages/tutor/VetCloser"
import Revenues from "./pages/tutor/Revenues"
import WellBeing from "./pages/tutor/WellCloser"

import Clinic from "./pages/clinic/Clinic"

export default function Router(){
    return(
        <Routes>
            <Route path="/tutor" element={<Tutor/>} />
            <Route path="/carteira" element={<VaccinePage/>} />
            <Route path="/vets" element={<VetCloser/>} />
            <Route path="/receitas" element={<Revenues/>} />
            <Route path="/bem-estar" element={<WellBeing/>} />
            
            <Route path="/clinica" element={<Clinic/>} />
        </Routes>
    )
}