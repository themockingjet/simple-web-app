//
//
//

import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../utils/NavbarAdminItems";
import { useAuth } from "../../hooks/useAuth";
import axios from "../../api/axios";

const DashboardHeader = () => {
    const [show, setShow] = useState<boolean>(false);
    const [settingsShow, setSettingsShow] = useState<boolean>(false);

    const curLocation = useLocation();
    let curDirectory = menuItems.filter((item) => item.path === curLocation.pathname.split("/")[2])[0];

    const { logout } = useAuth();

    const handleLogout = async () => {
        //
        try {
            const response = await axios.post("/auth/logout");

            if (response) {
                logout();
            }
        } catch (error: any) {
            if (!error.response) {
                // setServerResponse({ status: "error", message: "No Server Response" });
            } else {
                // setServerResponse({ status: "error", message: "Login failed." });
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
            <header className="container mx-auto h-12 lg:h-16 border-b-2 border-blue-500 drop-shadow-md relative">
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
                                {/* Profile */}
                                <button onClick={handleDropDownLink} className="">
                                    <img
                                        className=""
                                        width="48"
                                        height="48"
                                        src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
                                        alt="user-male-circle"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* For SM screen */}
                <div className="flex w-full h-full justify-center items-stretch block lg:hidden relative">
                    <button onClick={handleMiniDropDownLink} className="w-full text-blue-500 font-bold text-xl">
                        {curDirectory.title}
                    </button>
                    <button onClick={handleDropDownLink} className="absolute right-2 inset-y-0">
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
            <div className="container mx-auto relative">
                <div
                    className={`z-50 container absolute top-0 right-0 flex flex-col w-auto gap-1 bg-white px-5 py-2 drop-shadow-md block ${
                        settingsShow ? "" : "hidden"
                    }`}
                >
                    <Link
                        to="/"
                        className="w-full text-start font-bold text-base hover:text-blue-300"
                        onClick={handleDropDownLink}
                    >
                        Settings
                    </Link>
                    {/* form logout */}
                    <form
                        className="w-full text-start font-bold text-base hover:text-blue-300"
                        onSubmit={(e: any) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
                        <input type="submit" value="Logout" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default DashboardHeader;
