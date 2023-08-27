//
//
//

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const { clearCookies, cookies } = useAuth();
    const [count, setCount] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.lenght > 0) {
            clearCookies();
        }
    });

    useEffect(() => {
        console.log(count);
        let id = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(id);

            navigate("/", { replace: true });
        }

        return () => {
            clearInterval(id);
        };
    });

    return (
        <>
            <div>Unauthorized</div>
            <div>
                <span>Going back to Home Page in {count}...</span>
                <br></br>
                <span>Too long? </span>
                <Link to="/" replace className="italic underline">
                    Click here
                </Link>
            </div>
        </>
    );
};

export default Unauthorized;
