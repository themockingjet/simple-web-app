//
//
//

import { useState } from "react";
import { cn } from "../../utils/utils";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faCalendarDays, faUsers } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card";

const DashboardSidenav = () => {
    const { cookies } = useAuth();
    return (
        <>
            <Card className="card py-4 px-2 w-[250px] border border-gray-200 drop-shadow-md">
                <nav className="h-full">
                    <div className="h-full flex flex-col gap-3 font-semi lg:text-xl">
                        <li className="flex ">
                            {/* <span><FaThList color="white" /></span> */}
                            <NavLink
                                to="dashboard"
                                className={cn(
                                    ({ isActive, isPending }: any) => (isPending ? "pending" : isActive ? "active" : ""),
                                    "flex px-4 py-2 w-full space-x-2 items-center justify-start"
                                )}
                            >
                                <span className="w-6 flex justify-center">
                                    <FontAwesomeIcon icon={faBorderAll} />
                                </span>
                                <span>Dashboard</span>
                                {/* <span><FaThList color="white" /></span> */}
                            </NavLink>
                        </li>
                        <li className="flex">
                            <NavLink
                                to={cookies.role === 1 ? "reservations" : "schedule"}
                                className={cn(
                                    ({ isActive, isPending }: any) => (isPending ? "pending" : isActive ? "active" : ""),
                                    "flex px-4 py-2 w-full space-x-2 items-center justify-start"
                                )}
                            >
                                <span className="w-6 flex justify-center">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </span>
                                <span>{cookies.role === 1 ? "Reservations" : "Book Now"}</span>
                            </NavLink>
                        </li>
                        {cookies.role === 1 && (
                            <li className="flex">
                                <NavLink
                                    to="users"
                                    className={cn(
                                        ({ isActive, isPending }: any) => (isPending ? "pending" : isActive ? "active" : ""),
                                        "flex px-4 py-2 w-full space-x-2 items-center justify-start"
                                    )}
                                >
                                    <span className="w-6 flex justify-center">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </span>
                                    <span>Users</span>
                                    {/* <span><FaThList color="white" /></span> */}
                                </NavLink>
                            </li>
                        )}
                    </div>
                </nav>
            </Card>
        </>
    );
};

export default DashboardSidenav;
