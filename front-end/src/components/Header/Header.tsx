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
            <header className="container mx-auto h-12 border-b-2 border-blue-500 drop-shadow-md lg:h-14">
                {/* For LG screen */}
                <div className="hidden h-full w-full lg:block">
                    <div className="flex h-full w-full items-center justify-between px-2">
                        <div className="text-xl text-blue-500 lg:text-2xl">
                            <Link to="/" className="left-0 px-2 font-bold hover:text-blue-700">
                                #WebApp
                            </Link>
                        </div>

                        <div className="flex">
                            <div className="text-xl text-blue-500 lg:text-xl">
                                <Link to="login" className="left-0 px-2 font-bold hover:text-blue-700">
                                    Login
                                </Link>
                            </div>
                            <div className="text-xl text-blue-500 lg:text-xl">
                                <Link to="register" className="left-0 px-2 font-bold hover:text-blue-700">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* For SM screen */}
                <div className="visible relative flex h-full items-center justify-center lg:hidden">
                    <div className="text-xl text-blue-500 lg:text-2xl">
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
                                className="h-8 w-8 pt-1"
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
                className={`absolute top-[3rem] z-50 flex w-full flex-col bg-white py-1 text-xl font-bold drop-shadow-md ${
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
