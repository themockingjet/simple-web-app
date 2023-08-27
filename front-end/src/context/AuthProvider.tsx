//
//
//

import { createContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface AuthContextInterface {
    login: (data: { id: number; email: string; role: number; token: string }) => void;
    logout: () => void;
    cookies: any;
    clearCookies: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
    login: () => {},
    logout: () => {},
    cookies: {},
    clearCookies: () => {},
});

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const login = async (data: { id: number; email: string; role: number; token: string }) => {
        // const res = await axios.post("/auth/login", data, { withCredentials: true });

        setCookies("id", data.id);
        setCookies("email", data.email);
        setCookies("role", data.role);
        setCookies("token", data.token);

        navigate("/admin/dashboard", { replace: true });
    };

    const logout = () => {
        clearCookies();

        navigate("/login", { replace: true });
    };

    const clearCookies = () => {
        removeCookie("id");
        removeCookie("email");
        removeCookie("role");
        removeCookie("token");
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
