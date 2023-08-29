//
//
//

import { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../../utils/NavbarHomeItems";

const Header = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleDropDownLink = () => {
        setShow((prev) => !prev);
    };

    return (
        <>
            <header className="container mx-auto h-12 lg:h-14 border-b-2 border-blue-500 drop-shadow-md">
                {/* For LG screen */}
                <div className="h-full w-full hidden lg:block">
                    <div className="flex h-full w-full justify-between items-center px-2">
                        <div className="text-xl lg:text-2xl text-blue-500">
                            <Link to="/" className="left-0 px-2 font-bold hover:text-blue-700">
                                #WebApp
                            </Link>
                            <Link to="/" className="left-0 px-2 font-bold hover:text-blue-700">
                                #About
                            </Link>
                        </div>

                        <div className="flex">
                            <div className="text-xl lg:text-xl text-blue-500">
                                <Link to="login" className="left-0 px-2 font-bold hover:text-blue-700">
                                    Login
                                </Link>
                            </div>
                            <div className="text-xl lg:text-xl text-blue-500">
                                <Link to="register" className="left-0 px-2 font-bold hover:text-blue-700">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* For SM screen */}
                <div className="flex h-full justify-center items-center visible lg:hidden relative">
                    <div className="text-xl lg:text-2xl text-blue-500">
                        <Link
                            to="/"
                            className="left-0 px-2 font-bold hover:text-blue-700"
                            onClick={() => {
                                if (show) handleDropDownLink();
                            }}
                        >
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
                </div>
            </header>
            <div
                className={`z-50 absolute top-[3rem] flex flex-col w-full py-1 bg-white font-bold text-xl drop-shadow-md ${
                    show ? "" : "hidden"
                }`}
            >
                {menuItems.map((item, index) => (
                    <Link to={item.path} key={index} className="flex justify-center" onClick={handleDropDownLink}>
                        {item.title}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Header;
