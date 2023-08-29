//
//
//

import axios from "../api/axios";
import { useAuth } from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useRefreshToken = () => {
    //
    const { clearCookies } = useAuth();
    const [cookies, setCookies] = useCookies();

    const location = useLocation();
    const navigate = useNavigate();

    const refresh = async () => {
        //
        try {
            const response = await axios.get("/refresh", { withCredentials: true });
            if (response) {
                setCookies("token", response.data.token, { path: "/" });
            }

            return response.data.token;
        } catch (error) {
            if (error) {
                clearCookies();
                navigate("/login", { state: { from: location }, replace: true });
            }
        }
    };
    return refresh;
};

export default useRefreshToken;
