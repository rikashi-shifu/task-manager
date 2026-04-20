import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export function NotFoundPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex-1 min-h-screen flex items-center justify-center px-4 transition-colors ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="text-center">
        <div className="mb-6">
          <p
            className={`text-6xl font-bold mb-4 transition-colors ${theme === "dark" ? "text-neutral-600" : "text-neutral-400"}`}
          >
            404
          </p>
          <h1
            className={`text-3xl font-bold mb-2 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
          >
            Page Not Found
          </h1>
          <p
            className={`transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            The page you&apos;re looking for doesn&apos;t exist
          </p>
        </div>
        <Link
          to="/"
          className="btn btn-outline hover:no-underline hover:text-white hover:bg-accent hover:border-transparent"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
