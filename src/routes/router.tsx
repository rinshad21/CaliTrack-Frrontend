import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Exercise from "../pages/Exercise";
import Progress from "../pages/Progress";
import LoginPage from "@/components/login-01";
import Register from "@/components/Register";
import Profile from "@/pages/Profile";
import AdminLogin from "@/admin/Adminlogin";
import AdminRoutes from "./AdminRouter";
import Dashboard from "@/admin/Dashboard";
import WorkoutLevels from "@/admin/GetAllworkouts";
import AddWorkout from "@/admin/AddWorkout";
import AdminDashboardHome from "@/admin/AdminHome";
import DeleteWorkout from "@/admin/DeleteWorkouts";
import UpdateWorkout from "@/admin/UpdateWorkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "exercise", element: <Exercise /> },
      { path: "progress", element: <Progress /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <Register /> },
    { path: "admin", element: <AdminLogin/> },
  {
    path: "/admin-dashboard",
      element: (
         <AdminRoutes>
        <Dashboard/>
      </AdminRoutes>
    ),
    children: [
      { index: true, element: <AdminDashboardHome /> },
      {
        path: "all-workouts",
        element:<WorkoutLevels/>,
      },
      {
        path: "add-workouts",
        element:<AddWorkout/>
        
      },
       {
        path: "delete-workouts",
        element:<DeleteWorkout/>
        
      },
        {
        path: "update-workouts",
        element:<UpdateWorkout/>
        
      },
      ]
  
  }
]);
export default router;
