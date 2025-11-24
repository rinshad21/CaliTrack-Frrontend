import { LogOut, User } from "lucide-react";

function AdminNavbar({ onLogout }:any) {
  return (
    <div className="w-full h-16 bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 shadow-md flex items-center justify-between px-6">
      
      
      <div className="flex items-center gap-3">
        <User className="w-6 h-6 text-gray-200" />
        <h1 className="text-lg font-semibold text-white">
          Welcome, Admin
        </h1>
      </div>

      
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg 
                   hover:bg-red-600 transition"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
}

export default AdminNavbar;
