import { Navigate ,useLocation , Outlet  } from "react-router-dom";
import useAuth from "./core/login/hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
        ? <Outlet /> : <Navigate to="/login" state = {{ from : location }} replace/>
    );
     
}

export default RequireAuth;