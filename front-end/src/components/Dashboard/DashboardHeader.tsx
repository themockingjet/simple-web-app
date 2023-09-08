//
//
//

import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../utils/NavbarAdminItems";
import { useAuth } from "../../hooks/useAuth";
import axios from "../../api/axios";
import FormLogout from "../Forms/FormLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@uidotdev/usehooks";

const DashboardHeader = () => {
    //
    const [show, setShow] = useState<boolean>(false);
    const [settingsShow, setSettingsShow] = useState<boolean>(false);
    const isLargeDevice = useMediaQuery("only screen and (min-width : 993px) ");

    const curLocation = useLocation();
    let curDirectory = menuItems.filter((item) => item.path === curLocation.pathname.split("/")[2])[0];

    const { logout, cookies } = useAuth();

    const handleLogout = async (e: any) => {
        //
        e.preventDefault();
        try {
            const response = await axios.get("/auth/logout");

            if (response) {
                logout();
            }
        } catch (error: any) {
            if (error) {
                // Do something when logout fails
            }
        }
    };

    const handleMiniDropDownLink = () => {
        setShow((prev) => !prev);
    };

    const handleDropDownLink = () => {
        setSettingsShow((prev) => !prev);
    };

    return (
        <>
            <header className="relative h-12 border-b-2 border-blue-500 drop-shadow-md lg:h-16">
                {/* For LG screen */}
                <div className="hidden h-full w-full flex-row items-center justify-between px-4 lg:inline-flex">
                    <div className="flex h-full items-center px-2 text-blue-500">
                        <Link
                            to={cookies.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
                            className="left-0 px-2 text-3xl font-bold hover:text-blue-700"
                        >
                            <span className="drop-shadow-md">#WebApp</span>
                        </Link>
                    </div>
                    <div className="group relative flex items-center space-x-4">
                        {/* Details */}
                        <div className="rounded-md bg-gray-100 px-3 drop-shadow-md">
                            <p className="text-center font-medium group-hover:text-slate-900">{cookies.email}</p>
                            <p className="text-center text-sm font-medium text-slate-500 group-hover:text-slate-700">
                                {cookies.role === 1 ? "Admin" : "User"}
                            </p>
                        </div>
                        {/* Profile */}
                        <button onClick={handleDropDownLink} className="h-full w-full drop-shadow-md">
                            <FontAwesomeIcon icon={faUserCircle} color="white" size="3x" className="drop-shadow-md" />
                        </button>
                    </div>
                </div>
                {/* For SM screen */}
                <div className="relative inline-flex h-full w-full items-stretch justify-center lg:hidden">
                    <button onClick={handleMiniDropDownLink} className="w-full text-xl font-bold text-blue-500">
                        {curDirectory.title}
                    </button>
                    <button onClick={handleDropDownLink} className="absolute inset-y-0 right-2">
                        <img
                            className=""
                            width="32"
                            height="32"
                            src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
                            alt="user-male-circle"
                        />
                    </button>
                </div>
            </header>
            {/* SM Screen Nav Links */}
            {!isLargeDevice && (
                <div
                    className={`absolute top-[3rem] z-50 flex w-full flex-col bg-white py-1 text-xl font-bold drop-shadow-md ${
                        show ? "" : "hidden"
                    }`}
                >
                    {menuItems
                        .filter((item) => item.role.includes(cookies.role))
                        .map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className="flex justify-center"
                                onClick={handleMiniDropDownLink}
                            >
                                {({ isActive }: any) => <span className={isActive ? "hidden" : "block"}>{item.title}</span>}
                            </NavLink>
                        ))}
                </div>
            )}

            {/* Settings/Logout DropDown */}
            {settingsShow && (
                <div className="container relative mx-auto">
                    <div
                        className={`container absolute right-0 top-0 z-50 block flex w-auto flex-col gap-1 bg-white px-5 py-2 drop-shadow-md`}
                    >
                        <Link
                            to="/"
                            className="w-full text-start text-base font-bold hover:text-blue-300"
                            onClick={handleDropDownLink}
                        >
                            Settings
                        </Link>
                        {/* form logout */}
                        <FormLogout onSubmit={handleLogout} />
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardHeader;
