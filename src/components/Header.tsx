//
//
//

import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleDropDownLink = () => {
        setShow((prev) => !prev);
    };
    return (
        <>
            <header className="container mx-auto h-12 lg:h-14 border-b-2 border-blue-500 drop-shadow-md">
                <div className="flex h-full justify-center lg:justify-start items-center relative">
                    <div className="flex-none text-xl lg:text-2xl text-blue-500">
                        <Link to="/" className="left-0 px-2 font-bold hover:text-blue-700">
                            #WebApp
                        </Link>
                    </div>
                    {/* npm i react-router-hash-link */}
                    {/* https://stackoverflow.com/questions/66297039/scroll-to-a-specific-div-on-a-new-page-using-react-router-dom */}
                    {/* <div className="flex-none text-xl lg:text-2xl text-blue-500">
                        <Link to="/" className="left-0 px-2 font-bold hover:text-blue-700">
                            About
                        </Link>
                    </div> */}
                    <nav className="absolute right-2 text-blue-500 lg:hidden">
                        <button onClick={handleDropDownLink}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 pt-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </nav>
                    <div className="text-xl lg:text-2xl text-blue-500">
                        <Link to="/reservation" className="left-0 px-2 font-bold hover:text-blue-700">
                            Book Reservation
                        </Link>
                    </div>
                </div>
            </header>
            <div
                className={`z-50 absolute flex flex-col w-full gap-1 bg-white border border-gray-300 md:hidden block ${
                    show ? "" : "hidden"
                }`}
                hidden={show}
            >
                <Link
                    to="/about"
                    className="w-full text-center font-bold text-xl hover:text-blue-300"
                    onClick={handleDropDownLink}
                >
                    About
                </Link>
                <Link
                    to="/schedule"
                    className="w-full text-center font-bold text-xl hover:text-blue-300"
                    onClick={handleDropDownLink}
                >
                    Login
                </Link>
            </div>
        </>
    );
};

export default Header;
