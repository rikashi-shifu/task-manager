import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`border-b sticky top-0 z-50 transition-colors backdrop-blur-sm ${
        theme === "dark"
          ? "border-neutral-800 bg-black/50"
          : "border-neutral-200 bg-white/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className={`text-lg font-bold transition-colors ${
            theme === "dark"
              ? "text-neutral-50 hover:text-accent"
              : "text-neutral-900 hover:text-accent"
          }`}
        >
          Task Manager
        </Link>

        {isAuthenticated ? (
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm transition-colors ${
                theme === "dark"
                  ? "text-neutral-400 hover:text-neutral-50"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className={`text-sm transition-colors ${
                theme === "dark"
                  ? "text-neutral-400 hover:text-neutral-50"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Tasks
            </Link>
            <Link
              to="/history"
              className={`text-sm transition-colors ${
                theme === "dark"
                  ? "text-neutral-400 hover:text-neutral-50"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              History
            </Link>
            <div
              className={`h-4 w-px ${theme === "dark" ? "bg-neutral-800" : "bg-neutral-300"}`}
            />
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                theme === "dark"
                  ? "text-neutral-400 hover:text-neutral-50 hover:bg-neutral-900"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <MdLightMode className="text-lg" />
              ) : (
                <MdDarkMode className="text-lg" />
              )}
            </button>
            <span
              className={`text-xs ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
            >
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline text-xs px-3 py-1.5"
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                theme === "dark"
                  ? "text-neutral-400 hover:text-neutral-50 hover:bg-neutral-900"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <MdLightMode className="text-lg" />
              ) : (
                <MdDarkMode className="text-lg" />
              )}
            </button>
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
