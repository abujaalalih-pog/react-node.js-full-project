import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function ReportCard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data || []));
  }, []);

  const getAvg = (m) => {
    if (!m) return 0;
    const v = Object.values(m);
    return (v.reduce((a,b)=>a+b,0)/v.length).toFixed(1);
  };

  const downloadPDF = (student) => {
    const doc = new jsPDF();

    doc.text(`Report Card`, 10, 10);
    doc.text(`Name: ${student.first_name} ${student.last_name}`, 10, 20);

    doc.text(`Math: ${student.marks?.math || 0}`, 10, 40);
    doc.text(`English: ${student.marks?.english || 0}`, 10, 50);
    doc.text(`Science: ${student.marks?.science || 0}`, 10, 60);

    doc.text(`Average: ${getAvg(student.marks)}`, 10, 80);

    doc.save(`${student.first_name}-report.pdf`);
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">📄 Report Cards</h1>

      {students.map((s) => (
        <div key={s._id} className="bg-white p-4 shadow mb-3 rounded flex justify-between">

          <div>
            <b>{s.first_name} {s.last_name}</b>
            <p>Avg: {getAvg(s.marks)}</p>
          </div>

          <button
            onClick={() => downloadPDF(s)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Download
          </button>

        </div>
      ))}

    </div>
  );
}

export default ReportCard;