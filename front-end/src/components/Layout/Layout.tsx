//
//
//

import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto flex min-h-[calc(100vh-3rem)] flex-col lg:min-h-[calc(100vh-3.5rem)]">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
