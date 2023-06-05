import { Navigate, Route, Routes } from "react-router-dom"
import Tutor from "./pages/tutor/Tutor"
import Clinic from "./pages/clinic/Clinic"
import VaccinePage from "./pages/tutor/Vaccine"
import Perfil from "./pages/clinic/Perfil"
import Schedule from "./pages/clinic/Schedule"

const PrivateRouter = ({user, children}) => {
    console.log(user);
    if(!user){
        return <Navigate to={"/"} replace/>
    }
    return children;
}

export default function Router(){
    return(
        <Routes>
            <Route path="/tutor" element={<Tutor/>} />
            <Route path="/carteira" element={<VaccinePage/>} />
            {/* <Route path="/vets" element={<VetCloser/>} /> */}
            {/* <Route path="/receitas" element={<Revenues/>} /> */}
            
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
        </Routes>
    )
}