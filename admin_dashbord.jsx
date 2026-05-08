import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import RegisterStudent from "./pages/Register_Student";
import Teachers from "./pages/Teachers";
import AdminDashboard from "./pages/AdminDashboard";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard */}
        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/register" element={<RegisterStudent />} />
            <Route path="/teachers" element={<Teachers />} />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;