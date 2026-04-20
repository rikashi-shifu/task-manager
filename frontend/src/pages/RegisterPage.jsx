import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { error: showError } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const { success, error } = await register(email, password);

    if (success) {
      navigate("/");
    } else {
      showError(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 min-h-screen bg-black flex items-center justify-center px-4">
      <div className="card w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-2 text-center">
            Create Account
          </h1>
          <p className="text-center text-neutral-400 text-sm">
            Join to organize your tasks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 bg-neutral-950 border rounded-md text-neutral-50 placeholder:text-neutral-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                errors.email
                  ? "border-neutral-700/80 ring-1 ring-neutral-700/50"
                  : "border-neutral-800"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-neutral-400/80 text-xs mt-1.5">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 bg-neutral-950 border rounded-md text-neutral-50 placeholder:text-neutral-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                errors.password
                  ? "border-neutral-700/80 ring-1 ring-neutral-700/50"
                  : "border-neutral-800"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-neutral-400/80 text-xs mt-1.5">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 bg-neutral-950 border rounded-md text-neutral-50 placeholder:text-neutral-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                errors.confirmPassword
                  ? "border-neutral-700/80 ring-1 ring-neutral-700/50"
                  : "border-neutral-800"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-neutral-400/80 text-xs mt-1.5">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
          <p className="text-neutral-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent hover:text-accent-light font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
