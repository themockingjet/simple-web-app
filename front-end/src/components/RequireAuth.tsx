//
//
//

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthInterface {
    allowedRoles: number[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthInterface) => {
    //
    const location = useLocation();
    const { cookies } = useAuth();

    return allowedRoles.includes(cookies.role) ? (
        <Outlet />
    ) : cookies?.email ? (
        <Navigate to="/unauthorized" replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
