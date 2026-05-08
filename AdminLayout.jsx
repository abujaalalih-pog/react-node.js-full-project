import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}