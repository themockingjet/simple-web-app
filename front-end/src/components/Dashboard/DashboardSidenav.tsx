//
//
//

import { useState } from "react";
import { cn } from "../../utils/utils";
import { NavLink } from "react-router-dom";

interface DashboardSidenavProps {
    className?: string;
}

const DashboardSidenav = ({ className }: DashboardSidenavProps) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <div
                id="d-sidenav"
                className={cn(
                    "card w-[250px] max-h-[calc(100vh-5rem)] lg:max-h-[calc(100vh-6rem)] shrink-0 absolute md:static border border-gray-200 drop-shadow-md",
                    className
                )}
            >
                <nav className="h-full">
                    <div className="h-full flex flex-col gap-3 font-semi lg:text-xl">
                        <li className="flex flex-row items-center justify-start gap-2">
                            {/* <span><FaThList color="white" /></span> */}
                            <NavLink
                                to="dashboard"
                                className={cn(
                                    ({ isActive, isPending }: any) => (isPending ? "pending" : isActive ? "active" : ""),
                                    "px-10 py-2 w-full"
                                )}
                            >
                                Dashboard
                                {/* <span><FaThList color="white" /></span> */}
                            </NavLink>
                        </li>
                        <li className="flex flex-row items-center justify-start gap-2">
                            <NavLink
                                to="reservations"
                                className={cn(
                                    ({ isActive, isPending }: any) => (isPending ? "pending" : isActive ? "active" : ""),
                                    "px-10 py-2 w-full"
                                )}
                            >
                                Reservations
                            </NavLink>
                        </li>
                        <li className="flex flex-row items-center justify-start gap-2">
                            <NavLink
                                to="users"
                                className={cn(
                                    ({ isActive, isPending }: any) => (isPending ? "pending" : isActive ? "active" : ""),
                                    "px-10 py-2 w-full"
                                )}
                            >
                                Users
                                {/* <span><FaThList color="white" /></span> */}
                            </NavLink>
                        </li>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default DashboardSidenav;
