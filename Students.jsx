import { useEffect, useState } from "react";
import axios from "axios";

function Students() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  // ======================
  // EDIT STATE
  // ======================
  const [editModal, setEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ======================
  // FETCH
  // ======================
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ======================
  // DELETE
  // ======================
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    setStudents(students.filter(s => s.id !== id));
  };

  // ======================
  // OPEN EDIT MODAL
  // ======================
  const openEdit = (student) => {
    setSelectedStudent(student);
    setEditModal(true);
  };

  // ======================
  // HANDLE EDIT CHANGE
  // ======================
  const handleChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value
    });
  };

  // ======================
  // UPDATE STUDENT
  // ======================
  const updateStudent = async () => {
    await axios.put(
      `http://localhost:5000/students/${selectedStudent.id}`,
      selectedStudent
    );

    setEditModal(false);
    fetchStudents();
  };

  // ======================
  // SEARCH
  // ======================
  const filtered = students.filter(s =>
    `${s.first_name} ${s.last_name} ${s.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Students List
      </h1>

      {/* SEARCH */}
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded">

        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Trade</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} className="text-center border-b">

              <td className="p-2">{s.first_name} {s.last_name}</td>
              <td>{s.email}</td>
              <td>{s.trade}</td>
              <td>{s.class}</td>

              <td className="space-x-2">

                <button
                  onClick={() => openEdit(s)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteStudent(s.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

      {/* ===================== */}
      {/* EDIT MODAL */}
      {/* ===================== */}
      {editModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Edit Student
            </h2>

            <input
              name="first_name"
              value={selectedStudent.first_name}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="last_name"
              value={selectedStudent.last_name}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="email"
              value={selectedStudent.email}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="trade"
              value={selectedStudent.trade}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="class"
              value={selectedStudent.class}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />

            {/* ACTION BUTTONS */}
            <div className="flex justify-between">

              <button
                onClick={() => setEditModal(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateStudent}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Students;