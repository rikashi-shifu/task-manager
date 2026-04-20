import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useTheme } from "../context/ThemeContext";
import { EyeIcon } from "../components/EyeIcon";

export function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useAuth();
  const { error: showError } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const { success, error } = await login(email, password);

    if (success) {
      navigate("/");
    } else {
      setServerError(error || "Login failed. Please try again.");
      showError(error);
    }

    setLoading(false);
  };

  return (
    <div
      className={`flex-1 min-h-screen flex items-center justify-center px-4 transition-colors ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="card w-full max-w-md">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 text-center transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
          >
            Welcome Back
          </h1>
          <p
            className={`text-center text-sm transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            Sign in to your account
          </p>
        </div>

        {serverError && (
          <div className="mb-5 p-3 rounded-md border-2 border-red-900 ring-2 ring-red-400 bg-red-900/20">
            <p className="text-sm font-medium text-red-700">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                theme === "dark"
                  ? "bg-neutral-950 text-neutral-50 placeholder:text-neutral-600"
                  : "bg-white text-neutral-900 placeholder:text-neutral-400"
              } ${
                errors.email
                  ? theme === "dark"
                    ? "border-neutral-700/80 ring-1 ring-neutral-700/50"
                    : "border-red-300 ring-1 ring-red-300/50"
                  : theme === "dark"
                    ? "border-neutral-800"
                    : "border-neutral-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p
                className={`text-xs mt-1.5 transition-colors ${theme === "dark" ? "text-neutral-400/80" : "text-red-600"}`}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  theme === "dark"
                    ? "bg-neutral-950 text-neutral-50 placeholder:text-neutral-600"
                    : "bg-white text-neutral-900 placeholder:text-neutral-400"
                } ${
                  errors.password
                    ? theme === "dark"
                      ? "border-neutral-700/80 ring-1 ring-neutral-700/50"
                      : "border-red-300 ring-1 ring-red-300/50"
                    : theme === "dark"
                      ? "border-neutral-800"
                      : "border-neutral-300"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${theme === "dark" ? "text-neutral-400 hover:text-neutral-300" : "text-neutral-600 hover:text-neutral-900"}`}
              >
                <EyeIcon isOpen={showPassword} className="w-5 h-5" />
              </button>
            </div>
            {errors.password && (
              <p
                className={`text-xs mt-1.5 transition-colors ${theme === "dark" ? "text-neutral-400/80" : "text-red-600"}`}
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          className={`mt-6 pt-6 border-t transition-colors ${theme === "dark" ? "border-neutral-800" : "border-neutral-200"}`}
        >
          <p
            className={`text-sm text-center transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-accent hover:text-accent-light font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
