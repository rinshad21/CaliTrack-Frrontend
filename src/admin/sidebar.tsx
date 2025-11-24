import { NavLink, Outlet } from "react-router-dom";
import { Delete, Dumbbell, Edit, PlusIcon, Trash, TrendingUp, User } from "lucide-react";


function Sidebar() {
  
  return (
   <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="all-workouts"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-slate-700 transition ${
              isActive ? "bg-slate-700" : ""
            }`
          }
        >
          <Dumbbell className="inline w-5 h-5 mr-2" /> Workouts
        </NavLink>

        <NavLink
          to="add-workouts"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-slate-700 transition ${
              isActive ? "bg-slate-700" : ""
            }`
          }
        >
          <PlusIcon className="inline w-5 h-5 mr-2" /> Add Workout
        </NavLink>

        <NavLink
          to="delete-workouts"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-slate-700 transition ${
              isActive ? "bg-slate-700" : ""
            }`
          }
        >
          <Trash className="inline w-5 h-5 mr-2" /> Delete
              </NavLink>
              <NavLink
          to="update-workouts"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-slate-700 transition ${
              isActive ? "bg-slate-700" : ""
            }`
          }
        >
          <Edit className="inline w-5 h-5 mr-2" /> Edit
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
