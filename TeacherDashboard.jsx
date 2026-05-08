import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data || []);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ======================
  // SAFE AVERAGE
  // ======================
  const getAverage = (m) => {
    if (!m) return 0;
    const vals = Object.values(m);
    if (!vals.length) return 0;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  // ======================
  // CHART DATA
  // ======================
  const chartData = students.map(s => ({
    name: s.first_name,
    average: Number(getAverage(s.marks))
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        📊 Teacher Dashboard
      </h1>

      {/* ================= CHART ================= */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Student Performance</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="average" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= TOP STUDENTS ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">🏆 Top Students</h2>

        {students
          .sort((a, b) =>
            getAverage(b.marks) - getAverage(a.marks)
          )
          .slice(0, 5)
          .map((s) => (
            <div key={s._id} className="flex justify-between border-b p-2">
              <span>{s.first_name} {s.last_name}</span>
              <b>{getAverage(s.marks)}</b>
            </div>
          ))}
      </div>

    </div>
  );
}

export default TeacherDashboard;