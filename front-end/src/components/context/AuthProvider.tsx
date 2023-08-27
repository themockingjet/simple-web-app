//
//
//

import { createContext, useMemo } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextInterface {
    //
    login: (data: { id: number; email: string; role: number; token: string }) => void;
    logout: () => void;
    cookies: any;
    clearCookies: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
    //
    login: () => {},
    logout: () => {},
    cookies: {},
    clearCookies: () => {},
});

export const AuthProvider = ({ children }: any) => {
    //
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const login = async (data: { id: number; email: string; role: number; token: string }) => {
        //
        setCookies("id", data.id, { path: "/" });
        setCookies("email", data.email, { path: "/" });
        setCookies("role", data.role, { path: "/" });
        setCookies("token", data.token, { path: "/" });

        navigate("/admin/dashboard", { replace: true });
    };

    const clearCookies = () => {
        //
        removeCookie("id", { path: "/" });
        removeCookie("email", { path: "/" });
        removeCookie("role", { path: "/" });
        removeCookie("token", { path: "/" });
    };

    const logout = () => {
        //
        clearCookies();

        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            login,
            logout,
            cookies,
            clearCookies,
        }),
        [cookies]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
