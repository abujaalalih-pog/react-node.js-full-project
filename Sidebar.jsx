import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-blue-700 text-white p-6 space-y-4">

      <h1 className="text-xl font-bold mb-6">
        School Admin
      </h1>

      <Link to="/dashboard">Dashboard</Link><br/>
      <Link to="/students">Students</Link><br/>
      <Link to="/register">Register Student</Link><br/>
      <Link to="/teachers">Teachers</Link>

    </div>
  );
}

export default Sidebar;