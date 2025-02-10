import { useState } from "react";
import Sidebar from "./Sidebar";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";

export default function LayoutPage({ children }) {
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dark:bg-dark min-h-screen flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className={`fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md flex items-center p-4 transition-all duration-300 ${sidebarOpen ? "pl-64" : "pl-4"}`}>
          <button className="transition-all duration-300" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
          <div className="flex-1 flex justify-end"></div>
        </div>
        <div className="pt-20 p-4 min-h-screen dark:bg-dark transition-all duration-300">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
