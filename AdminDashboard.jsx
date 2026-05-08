import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const API = "http://localhost:5000/register";

  // ===============================
  // FETCH STUDENTS
  // ===============================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data || []);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ===============================
  // DELETE STUDENT
  // ===============================
  const deleteStudent = async (id) => {
    if (!id) {
      toast.error("Invalid student ID");
      return;
    }

    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`${API}/${id}`);

      toast.success("Student deleted successfully");

      // remove instantly from UI (better UX)
      setStudents((prev) => prev.filter((s) => s._id !== id));

    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // ===============================
  // UPDATE STUDENT
  // ===============================
  const updateStudent = async (id) => {
    if (!id) {
      toast.error("Invalid student ID");
      return;
    }

    try {
      // ⚠ backend must expect data
      await axios.put(`${API}/${id}`, {
        updatedAt: new Date()
      });

      toast.success("Student updated");

      fetchStudents();

    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  // ===============================
  // SEARCH FILTER SAFE
  // ===============================
  const filteredStudents = students.filter((s) =>
    `${s.first_name || ""} ${s.last_name || ""} ${s.unique_code || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* NAV */}
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-600 font-semibold">
          Dashboard
        </Link>

        <Link to="/register" className="text-blue-600 font-semibold">
          Register Student
        </Link>
      </nav>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="bg-white px-4 py-2 rounded shadow">
          Total Students: {students.length}
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 border rounded-lg"
      />

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Code</th>
              <th>Trade</th>
              <th>Class</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">

                  <td className="p-3">
                    {s.first_name} {s.last_name}
                  </td>

                  <td>{s.unique_code}</td>
                  <td>{s.trade}</td>
                  <td>{s.class}</td>
                  <td>{s.email}</td>

                  <td className="space-x-2">

                    <button
                      onClick={() => updateStudent(s._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteStudent(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;