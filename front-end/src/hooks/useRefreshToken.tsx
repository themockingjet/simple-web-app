//
//
//

import axios from "../api/axios";
import { useAuth } from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const useRefreshToken = () => {
    //
    const { cookies, clearCookies } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const refresh = async () => {
        //
        try {
            const response = await axios.get("/refresh", { withCredentials: true });

            if (response) {
                cookies.token = response.data.token;
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
