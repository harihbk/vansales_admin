import { Navigate , Route ,Outlet } from "react-router-dom";

const ProtectedRoute = props =>{
    let data = localStorage.getItem("access_token")
        return data ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;