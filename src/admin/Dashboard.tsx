import { Outlet } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import { useState } from "react";
import Sidebar from "./sidebar";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin";
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900">
     
      <Sidebar/>


      <div className="flex-1 flex flex-col">
       
        <AdminNavbar onLogout={handleLogout} />

       
        <div className="flex-1 p-6 overflow-y-auto rounded-tl-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
