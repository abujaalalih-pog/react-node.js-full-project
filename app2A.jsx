import { Routes, Route } from "react-router-dom";
import TeacherDashboard from "./pages/teachers/TeacherDashboard";
import ReportCard from "./pages/teachers/ReportCard";

function App2A() {
  return (
    <Routes>
      <Route path="/" element={<TeacherDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/reports" element={<ReportCard />} />
    </Routes>
  );
}

export default App2A;