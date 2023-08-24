//
//
//

import { Outlet } from "react-router-dom";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import DashboardSidenav from "../Dashboard/DashboardSidenav";

const LayoutDashboard = () => {
    const [isShown, setIsShown] = useState(true);
    const isLargeDevice = useMediaQuery("only screen and (min-width : 993px) ");

    const handleOnClick = (e: any) => {
        setIsShown((current) => !current);
    };

    return (
        <>
            <DashboardHeader />
            <div className="flex flex-row container mx-auto my-4 h-full">
                {!isLargeDevice && !isShown && <DashboardSidenav />}
                {isLargeDevice && isShown && <DashboardSidenav />}
                <Outlet />
            </div>
        </>
    );
};

export default LayoutDashboard;
