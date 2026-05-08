import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b flex items-center justify-between px-6">

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
        <Search size={18}/>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer hover:text-indigo-600" />

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full cursor-pointer"
        />
      </div>

    </header>
  );
}