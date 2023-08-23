//
//
//

import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
    const [show, setShow] = useState<boolean>(false);
    const isLargeDevice = useMediaQuery("only screen and (min-width : 993px)");

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
                            #WebApp
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
            </header>
        </>
    );
};

export default DashboardHeader;