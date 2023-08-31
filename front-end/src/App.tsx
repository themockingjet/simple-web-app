//
//
//

import {Navigate, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import Anonymous from "./components/Anonymous";
import Unauthorized from "./pages/Unauthorized";

// Layouts
import Layout from "./components/Layout/Layout";
import LayoutDashboard from "./components/Layout/LayoutDashboard";

// Login/Register
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminUsers from "./pages/admin/AdminUsers";

// User
import UserDashboard from "./pages/user/UserDashboard";
import UserSchedule from "./pages/user/UserSchedule";
import AdminAccounts from "./pages/admin/AdminAccounts";

export default function App() {
    return (
        <Routes>
            <Route element={<Anonymous />}>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Route>

            {/* admin */}
            {/* <AuthProvider> */}
            <Route element={<RequireAuth allowedRoles={[1]} />}>
                <Route path="/admin">
                    <Route element={<LayoutDashboard />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="reservations" element={<AdminReservations />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="accounts" element={<AdminAccounts />} />
                    </Route>
                    <Route path="/admin" element={<Navigate to="dashboard" replace />} />
                </Route>
            </Route>
            {/* </AuthProvider> */}

            {/* user */}
            {/* <AuthProvider> */}
            <Route element={<RequireAuth allowedRoles={[0]} />}>
                <Route path="/user">
                    <Route element={<LayoutDashboard />}>
                        <Route path="dashboard" element={<UserDashboard />} />
                        <Route path="schedule" element={<UserSchedule />} />
                    </Route>
                    <Route path="/user" element={<Navigate to="dashboard" replace />} />
                </Route>
            </Route>
            {/* </AuthProvider> */}

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
