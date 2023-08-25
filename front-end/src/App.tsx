//
//
//

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

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
import Welcome from "./pages/user/Welcome";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route path="/admin">
                <Route element={<LayoutDashboard />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="reservations" element={<AdminReservations />} />
                    <Route path="users" element={<AdminUsers />} />
                </Route>
                <Route path="/admin" element={<Navigate to="dashboard" replace />} />
            </Route>
            <Route path="/user">
                <Route element={<LayoutDashboard />}>
                    <Route path="dashboard" element={<Welcome />} />
                    {/* <Route path="schedule" element={<AdminReservations />} /> */}
                </Route>
                <Route path="/user" element={<Navigate to="dashboard" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
