import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t mt-auto transition-colors backdrop-blur-sm ${
        theme === "dark"
          ? "border-neutral-800 bg-neutral-950/50"
          : "border-neutral-200 bg-neutral-50/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3
              className={`text-lg font-bold mb-2 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
            >
              Task Manager
            </h3>
            <p
              className={`text-sm transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
            >
              Organize and manage your tasks efficiently with our modern task
              management application.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-sm font-semibold mb-4 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
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
              </li>
              <li>
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
              </li>
              <li>
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
              </li>
            </ul>
          </div>

          {/* Theme Info */}
          <div>
            <h4
              className={`text-sm font-semibold mb-4 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
            >
              Settings
            </h4>
            <p
              className={`text-sm transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
            >
              Current theme:{" "}
              <span
                className={`capitalize font-medium transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-900"}`}
              >
                {theme}
              </span>
            </p>
            <p
              className={`text-xs mt-2 transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
            >
              Use the toggle in the header to switch between light and dark
              modes.
            </p>
          </div>
        </div>

        <div
          className={`border-t pt-8 transition-colors ${theme === "dark" ? "border-neutral-800" : "border-neutral-200"}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p
              className={`text-xs transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
            >
              © {currentYear} Task Manager. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className={`text-xs transition-colors ${
                  theme === "dark"
                    ? "text-neutral-500 hover:text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`text-xs transition-colors ${
                  theme === "dark"
                    ? "text-neutral-500 hover:text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`text-xs transition-colors ${
                  theme === "dark"
                    ? "text-neutral-500 hover:text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
