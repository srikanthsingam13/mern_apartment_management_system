import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import ApartmentList from "./pages/ApartmentList";
import ApartmentDetails from "./pages/ApartmentDetails";
import Payment from "./pages/Payment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApartments from "./pages/AdminApartments";
import AdminRequests from "./pages/AdminRequests";
import AdminPayments from "./pages/AdminPayments";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/apartments" element={<ApartmentList />} />
        <Route path="/apartment/:id" element={<ApartmentDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/apartments" element={<AdminApartments />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
      </Routes>
    </>
  );
}

export default App;