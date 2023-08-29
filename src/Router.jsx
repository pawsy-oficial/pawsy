import { Navigate, Route, Routes } from "react-router-dom"
import Tutor from "./pages/tutor/Tutor"
import VaccinePage from "./pages/tutor/Vaccine"
import VetCloser from "./pages/tutor/VetCloser"
import Revenues from "./pages/tutor/Revenues"
import WellBeing from "./pages/tutor/WellCloser"
import ScheduleTutor from "./pages/tutor/ScheduleTutor"

import Clinic from "./pages/clinic/Clinic"
import Perfil from "./pages/clinic/Perfil"
import Schedule from "./pages/clinic/Schedule"
import Marketing from "./pages/clinic/Marketing"
import Patient from "./pages/clinic/Patients"
import Home from "./pages"
import Medic from "./pages/medic/medic"
import PatientsForMedic from "./pages/medic/patients"
import ViewPatient from "./pages/medic/viewPatient"

const PrivateRouter = ({user, children}) => {
    // console.log(user);
    if(!user){
        return <Navigate to={"/"} replace/>
    }
    return children;
}

export default function Router(){
    return(
        <Routes>
            <Route path="*" element={<Home/>}/>


            <Route path="/tutor" element={<Tutor/>} />
            <Route path="/carteira" element={<VaccinePage/>} />
            <Route path="/vets" element={<VetCloser/>} />
            <Route path="/receitas" element={<Revenues/>} />
            <Route path="/bem-estar" element={<WellBeing/>} />
            <Route path="/consulta" element={<ScheduleTutor/>} />
            
            {/* ==x==x==x==x==x==x== */}

            <Route path="/clinica" 
                element={
                    <PrivateRouter user={true}>
                        <Clinic/>
                    </PrivateRouter>
                } 
            />
            <Route path="/perfil" element={<Perfil/>} />
            <Route path="/agenda" element={<Schedule/>}/>
            <Route path="/marketing" element={<Marketing/>}/>
            <Route path="/pacientes" element={<Patient/>}/>

            {/* ==x==x==x==x==x==x== */}

            <Route path="/medico" 
                element={
                    <PrivateRouter user={true}>
                        <Medic/>
                    </PrivateRouter>
                } 
            />
            <Route path="/pacientes-clinica" 
                element={<PatientsForMedic/>} 
            />
            <Route path="/paciente" 
                element={<ViewPatient/>} 
            />
        </Routes>
    )
}