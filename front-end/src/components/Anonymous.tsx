//
//
//

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Anonymous = () => {
    //
    const { cookies } = useAuth();
    return cookies?.email ? <Navigate to={cookies.role === 1 ? "/admin" : "/user"} replace /> : <Outlet />;
};

export default Anonymous;
