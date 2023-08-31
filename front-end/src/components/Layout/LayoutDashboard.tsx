//
//
//

import { Outlet } from "react-router-dom";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { useMediaQuery } from "@uidotdev/usehooks";
import DashboardSidenav from "../Dashboard/DashboardSidenav";

const LayoutDashboard = () => {
    const isLargeDevice = useMediaQuery("only screen and (min-width : 993px) ");

    return (
        <>
            <DashboardHeader />
            <main className="flex flex-row container mx-auto my-4 min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] space-x-2">
                {isLargeDevice && <DashboardSidenav />}
                <Outlet />
            </main>
        </>
    );
};

export default LayoutDashboard;
