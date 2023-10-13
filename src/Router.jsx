import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoutes";
import Tutor from "./pages/tutor/Tutor";
import VaccinePage from "./pages/tutor/Vaccine";
import VetCloser from "./pages/tutor/VetCloser";
import Revenues from "./pages/tutor/Revenues";
import WellBeing from "./pages/tutor/WellCloser";
import ScheduleTutor from "./pages/tutor/ScheduleTutor";
import Clinic from "./pages/clinic/Clinic";
import Perfil from "./pages/clinic/Perfil";
import Schedule from "./pages/clinic/Schedule";
import Marketing from "./pages/clinic/Marketing";
import Patient from "./pages/clinic/Patients";
import { lazy, Suspense } from "react";

// import Tutor from "./pages/tutor/Tutor"
// import VaccinePage from "./pages/tutor/Vaccine"
// import VetCloser from "./pages/tutor/VetCloser"
// import Revenues from "./pages/tutor/Revenues"
// import WellBeing from "./pages/tutor/WellCloser"
// import ScheduleTutor from "./pages/tutor/ScheduleTutor"
// const Tutor = lazy(()=> import("./pages/tutor/Tutor"))
// const VaccinePage = lazy(()=> import ("./pages/tutor/Vaccine"))
// const VetCloser = lazy(()=> import ("./pages/tutor/VetCloser"))
// const Revenues = lazy(()=> import ("./pages/tutor/Revenues"))
// const WellBeing = lazy(()=> import ("./pages/tutor/WellCloser"))
// const ScheduleTutor = lazy(()=> import ("./pages/tutor/ScheduleTutor"))

// const Clinic = lazy(()=> import("./pages/clinic/Clinic"))
// const Perfil = lazy(()=> import("./pages/clinic/Perfil"))
// const Schedule = lazy(()=> import("./pages/clinic/Schedule"))
// const Marketing = lazy(()=> import("./pages/clinic/Marketing"))
// const Patient = lazy(()=> import("./pages/clinic/Patients"))

// const SearchResult = lazy(() => import("./pages/tutor/searchResult"))

const Access = lazy(() => import("./pages/registers/access"));
const Login = lazy(() => import("./pages/registers/login"));
const Register = lazy(() => import("./pages/registers/register"));
const ForgotPass = lazy(() => import("./pages/registers/forgotPassword"));

// import Clinic from "./pages/clinic/Clinic"
// import Perfil from "./pages/clinic/Perfil"
// import Schedule from "./pages/clinic/Schedule"
// import Marketing from "./pages/clinic/Marketing"
// import Patient from "./pages/clinic/Patients"

import Home from "./pages";
import Medic from "./pages/medic/medic";
import PatientsForMedic from "./pages/medic/patients";
import ViewPatient from "./pages/medic/viewPatient";
import SearchResult from "./pages/tutor/searchResult";
import Vaccine from "./pages/medic/vaccine";
import MarketingRevenue from "./pages/medic/revenues";
import NewRevenues from "./pages/medic/newRevenues";
import { LoadingPagesPlaceholder } from "./components/loadings/Loading";
import Plans from "./pages/landinPage/plans";
import AboutUs from "./pages/landinPage/aboutUs";
import Features from "./pages/landinPage/features";
import PageNotFound from "./pages/pageNotFound";

const PrivateRouter = ({ user, children }) => {
  // console.log(user);
  if (!user) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/planos" element={<Plans />} />
      <Route path="/sobre" element={<AboutUs />} />
      <Route path="/recursos" element={<Features />} />

      <Route
        path="/tutor"
        element={
          <PrivateRoute role="Tutor" element={<Tutor />}>
            <Tutor />
          </PrivateRoute>
        }
      />
      <Route
        path="/carteira"
        element={
          <PrivateRoute role="Tutor" element={<VaccinePage />}>
            <VaccinePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/vets"
        element={
          <PrivateRoute role="Tutor" element={<VetCloser />}>
            <VetCloser />
          </PrivateRoute>
        }
      />
      <Route
        path="/receitas"
        element={
          <PrivateRoute role="Tutor" element={<Revenues />}>
            <Revenues />
          </PrivateRoute>
        }
      />
      <Route
        path="/bem-estar"
        element={
          <PrivateRoute role="Tutor" element={<WellBeing />}>
            <WellBeing />
          </PrivateRoute>
        }
      />
      <Route
        path="/consulta"
        element={
          <PrivateRoute role="Tutor" element={<ScheduleTutor />}>
            <ScheduleTutor />
          </PrivateRoute>
        }
      />
      <Route
        path="/resultado-pesquisa"
        element={
          <PrivateRoute role="Tutor" element={<SearchResult />}>
            <SearchResult />
          </PrivateRoute>
        }
      />

      <Route
        path="/acesso"
        element={
          <Suspense fallback={<LoadingPagesPlaceholder />}>
            <Access />
          </Suspense>
        }
      />
      <Route
        path="/recuperar-senha"
        element={
          <Suspense fallback={<LoadingPagesPlaceholder />}>
            <ForgotPass />
          </Suspense>
        }
      />
      <Route
        path="/cadastro"
        element={
          <Suspense fallback={<LoadingPagesPlaceholder />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<LoadingPagesPlaceholder />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/resultado-pesquisa"
        element={
          <Suspense fallback={<LoadingPagesPlaceholder />}>
            <SearchResult />
          </Suspense>
        }
      />

      {/* <Route 
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
            /> */}

      {/* <Route path="/vets" element={<VetCloser/>} /> */}
      {/* <Route path="/receitas" element={<Revenues/>} /> */}

      {/* ==x==x==x==x==x==x== */}

      <Route
        path="/clinica"
        element={
          <PrivateRoute role="Clinica" element={<Perfil />}>
            <Perfil />
          </PrivateRoute>
        }
      />
      <Route
        path="/agenda"
        element={
          <PrivateRoute role="Clinica" element={<Schedule />}>
            <Schedule />
          </PrivateRoute>
        }
      />
      <Route
        path="/marketing"
        element={
          <PrivateRoute role="Clinica" element={<Marketing />}>
            <Marketing />
          </PrivateRoute>
        }
      />
      <Route
        path="/pacientes"
        element={
          <PrivateRoute role="Clinica" element={<Patient />}>
            <Patient />
          </PrivateRoute>
        }
      />

      <Route 
        path="/" 
        element={<Home />}
      />

      <Route 
        path="*" 
        element={<PageNotFound />}
      />

      {/* ==x==x==x==x==x==x== */}

      <Route
        path="/medico"
        element={
          <PrivateRoute role="Medico" element={<Medic />}>
            <Medic />
          </PrivateRoute>
        }
      />
      <Route
        path="/pacientes-clinica"
        element={
          <PrivateRoute role="Medico" element={<PatientsForMedic />}>
            <PatientsForMedic />
          </PrivateRoute>
        }
      />
      <Route
        path="/paciente"
        element={
          <PrivateRoute role="Medico" element={<ViewPatient />}>
            <ViewPatient />
          </PrivateRoute>
        }
      />
      <Route
        path="/receitas-medicas"
        element={
          <PrivateRoute role="Medico" element={<MarketingRevenue />}>
            <MarketingRevenue />
          </PrivateRoute>
        }
      />
      <Route
        path="/vacinas-e-vermifugacao"
        element={
          <PrivateRoute role="Medico" element={<Vaccine />}>
            <Vaccine />
          </PrivateRoute>
        }
      />
      <Route
        path="/nova-receita"
        element={
          <PrivateRoute role="Medico" element={<NewRevenues />}>
            <NewRevenues />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
