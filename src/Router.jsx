import { Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

// import Tutor from "./pages/tutor/Tutor"
// import VaccinePage from "./pages/tutor/Vaccine"
// import VetCloser from "./pages/tutor/VetCloser"
// import Revenues from "./pages/tutor/Revenues"
// import WellBeing from "./pages/tutor/WellCloser"
// import ScheduleTutor from "./pages/tutor/ScheduleTutor"
const Tutor = lazy(()=> import("./pages/tutor/Tutor"))
const VaccinePage = lazy(()=> import ("./pages/tutor/Vaccine"))
const VetCloser = lazy(()=> import ("./pages/tutor/VetCloser"))
const Revenues = lazy(()=> import ("./pages/tutor/Revenues"))
const WellBeing = lazy(()=> import ("./pages/tutor/WellCloser"))
const ScheduleTutor = lazy(()=> import ("./pages/tutor/ScheduleTutor"))


const Clinic = lazy(()=> import("./pages/clinic/Clinic"))
const Perfil = lazy(()=> import("./pages/clinic/Perfil"))
const Schedule = lazy(()=> import("./pages/clinic/Schedule"))
const Marketing = lazy(()=> import("./pages/clinic/Marketing"))
const Patient = lazy(()=> import("./pages/clinic/Patients"))

const SearchResult = lazy(() => import("./pages/tutor/searchResult"))

const Access = lazy(()=> import("./pages/registers/access"))
const Login = lazy(()=> import("./pages/registers/login"))
const Register = lazy(()=> import("./pages/registers/register"))
const ForgotPass = lazy(()=> import("./pages/registers/forgotPassword"))

// import Clinic from "./pages/clinic/Clinic"
// import Perfil from "./pages/clinic/Perfil"
// import Schedule from "./pages/clinic/Schedule"
// import Marketing from "./pages/clinic/Marketing"
// import Patient from "./pages/clinic/Patients"

import Home from "./pages"
import { LoadingPagesPlaceholder } from "./components/loadings/Loading"

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
            <Route 
                path="/acesso" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Access/>    
                        {/* <LoadingPagesPlaceholder/> */}
                    </Suspense>
                } 
            />
            <Route 
                path="/recuperar-senha" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <ForgotPass/>    
                        {/* <LoadingPagesPlaceholder/> */}
                    </Suspense>
                } 
            />
            <Route 
                path="/cadastro" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Register/>    
                        {/* <LoadingPagesPlaceholder/> */}
                    </Suspense>
                } 
            />
            <Route 
                path="/login" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Login/>    
                        {/* <LoadingPagesPlaceholder/> */}
                    </Suspense>
                } 
            />


            <Route 
                path="/resultado-pesquisa" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <SearchResult/>    
                        {/* <LoadingPagesPlaceholder/> */}
                    </Suspense>
                } 
            />



            <Route 
                path="/tutor" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Tutor/>    
                    </Suspense>
                } 
            />
            <Route 
                path="/carteira" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <VaccinePage/>
                    </Suspense>
                } 
            />
            <Route 
                path="/vets" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}> 
                        <VetCloser/>
                    </Suspense>
                } 
            />
            <Route 
                path="/receitas" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Revenues/> 
                    </Suspense>
                } 
            />
            <Route 
                path="/bem-estar" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <WellBeing/> 
                    </Suspense>
                } 
            />
            <Route 
                path="/consulta" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <ScheduleTutor/> 
                    </Suspense>
                } 
            />
                       
            {/* <Route path="/vets" element={<VetCloser/>} /> */}
            {/* <Route path="/receitas" element={<Revenues/>} /> */}
            
            {/* ==x==x==x==x==x==x== */}

            <Route path="/clinica" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Clinic/>
                    </Suspense>
                } 
            />
            <Route path="/perfil" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Perfil/>
                    </Suspense>
                } 
            />
            <Route path="/agenda" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Schedule/>
                    </Suspense>
                } 
            />
            <Route path="/marketing" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Marketing/>
                    </Suspense>
                } 
            />
            <Route path="/pacientes" 
                element={
                    <Suspense fallback={<LoadingPagesPlaceholder/>}>
                        <Patient/>
                    </Suspense>
                } 
            />
            
            {/* <Route path="/perfil" element={<Perfil/>} />
            <Route path="/agenda" element={<Schedule/>}/>
            <Route path="/marketing" element={<Marketing/>}/>
            <Route path="/pacientes" element={<Patient/>}/> */}

            <Route path="*" element={<Home/>}/>

        </Routes>
    )
}