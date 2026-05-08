import { useEffect, useState } from "react";
import axios from "axios";

function Teachers() {

  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    fullnames: "",
    id_number: "",
    location: "",
    trade_that_teach: "",
    email: "",
    telephone: "",
    module_teaches: "",
    password: ""
  });

  const [editId, setEditId] = useState(null);

  // ======================
  // FETCH
  // ======================
  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:5000/teachers");
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ======================
  // RESET FORM
  // ======================
  const resetForm = () => {
    setForm({
      fullnames: "",
      id_number: "",
      location: "",
      trade_that_teach: "",
      email: "",
      telephone: "",
      module_teaches: "",
      password: ""
    });
    setEditId(null);
  };

  // ======================
  // CREATE / UPDATE
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(
        `http://localhost:5000/teachers/${editId}`,
        form
      );
    } else {
      await axios.post(
        "http://localhost:5000/teachers",
        form
      );
    }

    resetForm();
    fetchTeachers();
  };

  // ======================
  // DELETE
  // ======================
  const deleteTeacher = async (id) => {
    await axios.delete(`http://localhost:5000/teachers/${id}`);
    fetchTeachers();
  };

  // ======================
  // EDIT
  // ======================
  const editTeacher = (t) => {
    setForm(t);
    setEditId(t.id);
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Teacher Management System
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded mb-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      >

        <input name="fullnames" placeholder="Full Names"
          value={form.fullnames} onChange={handleChange}
          className="border p-2 rounded" required />

        <input name="id_number" placeholder="ID Number"
          value={form.id_number} onChange={handleChange}
          className="border p-2 rounded" required />

        <input name="location" placeholder="Location"
          value={form.location} onChange={handleChange}
          className="border p-2 rounded" />

        <input name="trade_that_teach" placeholder="Trade They Teach"
          value={form.trade_that_teach} onChange={handleChange}
          className="border p-2 rounded" />

        <input name="email" placeholder="Email"
          value={form.email} onChange={handleChange}
          className="border p-2 rounded" required />

        <input name="telephone" placeholder="Telephone"
          value={form.telephone} onChange={handleChange}
          className="border p-2 rounded" />

        <input name="module_teaches" placeholder="Module Teaches"
          value={form.module_teaches} onChange={handleChange}
          className="border p-2 rounded" />

        <input name="password" type="password" placeholder="Password"
          value={form.password} onChange={handleChange}
          className="border p-2 rounded" required />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded md:col-span-2"
        >
          {editId ? "Update Teacher" : "Add Teacher"}
        </button>

      </form>

      {/* ================= TABLE ================= */}
      <table className="w-full bg-white shadow rounded">

        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2">Full Names</th>
            <th>ID</th>
            <th>Email</th>
            <th>Trade</th>
            <th>Module</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t.id} className="text-center border-b">

              <td className="p-2">{t.fullnames}</td>
              <td>{t.id_number}</td>
              <td>{t.email}</td>
              <td>{t.trade_that_teach}</td>
              <td>{t.module_teaches}</td>

              <td className="space-x-2">

                <button
                  onClick={() => editTeacher(t)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTeacher(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Teachers;