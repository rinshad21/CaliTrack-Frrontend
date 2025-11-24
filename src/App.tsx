import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

function App() {
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading/>;
  return (
    <main
      className="  min-h-screen bg-white 
dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
text-linear-900 dark:text-white
text-slate-600  "
    >
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
export default App;
