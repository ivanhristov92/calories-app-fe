import {helpers} from "@service"
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


export default function ProtectedRoute({ children, adminOnly }){
    let {isAuthenticated, isLoading, user, getIdTokenClaims } = useAuth0();

    if(isLoading){
        return <CircularProgress />
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if(adminOnly){
      return helpers.isAdmin(user) ? children : <Navigate to="/" replace />;
    }
    
    return children;
  };