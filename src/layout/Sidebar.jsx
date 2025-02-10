import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out sm:translate-x-0`}>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Sidebar</h2>
        <button className="sm:hidden" onClick={toggleSidebar}>
          <FiX size={24} />
        </button>
      </div>
      <nav className="p-4">
        <ul>
          <li className="py-2">
            <Link to="/" className="block">
              All post
            </Link>
          </li>
          <li className="py-2">
            <Link to="/add-new" className="block">
              Add new
            </Link>
          </li>
          <li className="py-2">
            <Link to="/preview" className="block">
              Preview
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
