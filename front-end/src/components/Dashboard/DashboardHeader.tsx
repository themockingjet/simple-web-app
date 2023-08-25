//
//
//

import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { menuItems } from "../../utils/adminNavbarItems";
import { cn } from "../../utils/utils";

const DashboardHeader = () => {
    const [show, setShow] = useState<boolean>(false);
    const curLocation = useLocation();

    let curDirectory = menuItems.filter((item) => item.path === curLocation.pathname.split("/")[2])[0];
    const handleMiniDropDownLink = () => {
        setShow((prev) => !prev);
    };

    const handleDropDownLink = () => {
        setShow((prev) => !prev);
    };

    return (
        <>
            <header className="container mx-auto h-12 lg:h-16 border-b-2 border-blue-500 drop-shadow-md">
                {/* For LG screen */}
                <div className="h-full w-full hidden lg:block">
                    <div className="flex h-full w-full justify-between items-center px-4">
                        <div className="flex h-full w-full justify-between items-center px-2 text-3xl font-bold text-blue-500">
                            <Link to="/admin/dashboard" className="left-0 px-2 font-bold hover:text-blue-700">
                                #WebApp
                            </Link>
                        </div>
                        <div className="flex flex-row justify-between hidden lg:block">
                            {/* left */}
                            <ul></ul>
                            {/* right */}
                            <div className="group flex items-center relative">
                                <div className="ltr:ml-3 rtl:mr-3 bg-gray-100 rounded-md px-3 mr-3 w-[70px]">
                                    <p className="text-center font-medium text-slate-800 group-hover:text-slate-900">
                                        User!
                                    </p>
                                    <p className="text-center text-sm font-medium text-slate-500 group-hover:text-slate-700">
                                        Role!
                                    </p>
                                </div>
                                <button onClick={handleDropDownLink} className="">
                                    <img
                                        className=""
                                        width="48"
                                        height="48"
                                        src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
                                        alt="user-male-circle"
                                    />
                                </button>
                                <div
                                    className={`z-50 absolute top-[60px] right-0 flex flex-col w-auto gap-1 bg-white px-5 py-2 drop-shadow-md block ${
                                        show ? "" : "hidden"
                                    }`}
                                >
                                    <Link
                                        to="/"
                                        className="w-full text-start font-bold text-base hover:text-blue-300"
                                        onClick={handleDropDownLink}
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        to="/"
                                        className="w-full text-start font-bold text-base hover:text-blue-300"
                                        onClick={handleDropDownLink}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* For SM screen */}
                <div className="flex w-full h-full justify-center items-stretch">
                    <button onClick={handleMiniDropDownLink} className="w-full text-blue-500 font-bold text-xl">
                        {curDirectory.title}
                    </button>
                </div>
            </header>
            <div
                className={`z-50 absolute top-[3rem] flex flex-col w-full py-1 bg-white font-bold text-xl drop-shadow-md ${
                    show ? "" : "hidden"
                }`}
            >
                {menuItems.map((item, index) => (
                    <NavLink to={item.path} key={index} className="flex justify-center" onClick={handleMiniDropDownLink}>
                        {({ isActive }: any) => <span className={isActive ? "hidden" : "block"}>{item.title}</span>}
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default DashboardHeader;
