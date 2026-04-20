import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-gray-50 hover:text-accent transition-colors"
        >
          Task Manager
        </Link>

        {isAuthenticated ? (
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-gray-50 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className="text-sm text-gray-400 hover:text-gray-50 transition-colors"
            >
              Tasks
            </Link>
            <div className="h-4 w-px bg-gray-800" />
            <span className="text-xs text-gray-500">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="btn btn-outline text-xs px-3 py-1.5"
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-3">
            <Link to="/login" className="btn btn-ghost text-xs px-3 py-1.5">
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary text-xs px-3 py-1.5"
            >
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
