//
//
//

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import LayoutDashboard from "./components/Layout/LayoutDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminUsers from "./pages/admin/AdminUsers";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="reservation" element={<Reservation />} />
                </Route>
                <Route path="/admin" element={<LayoutDashboard />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="reservations" element={<AdminReservations />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
