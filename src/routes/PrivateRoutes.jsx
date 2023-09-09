import { Navigate, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

async function getUserTypeFromToken() {
    try {
      const tutorToken = Cookies.get('jwtTokenTutor');
      const clinicToken = Cookies.get('jwtTokenClinic');
      const medicToken = Cookies.get('jwtTokenMedic');
      
      let endpoint;
      
      if (tutorToken) {
          endpoint = '/profileTutor';
      } else if (clinicToken) {
          endpoint = '/profileClinic';
      } else if (medicToken) {
          endpoint = '/profileMedic';
      } else {
          return null;
      }

        const url = `${import.meta.env.VITE_URL}${endpoint}`;
        const token = tutorToken || clinicToken || medicToken;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.storedType;

    } catch (error) {
        console.error('Erro ao buscar o tipo de usuário', error);
        return null;
    }
}

function PrivateRoute(props) {
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserType() {
            const type = await getUserTypeFromToken();
            setUserType(type);
            setLoading(false);
        }

        fetchUserType();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userType) {
        return <Navigate to="/" replace />;
    }

    if (props.role && props.role !== userType) {
        return <Navigate to="/" replace />;
    }

    return props.element;
}

export default PrivateRoute;
