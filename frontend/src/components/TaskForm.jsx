import { useState, useEffect } from "react";
import { PREDEFINED_CATEGORIES } from "../constants/categories";
import { useTheme } from "../context/ThemeContext";

export function TaskForm({ task, onSubmit, onCancel }) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(
    task || {
      title: "",
      description: "",
      status: "PENDING",
      category: PREDEFINED_CATEGORIES[0],
      dueDate: null,
    },
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate || null,
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateForInput = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      // Ensure we're working with UTC by accounting for timezone
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return "";
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-40 transition-colors ${theme === "dark" ? "bg-black/60" : "bg-white/60"}`}
    >
      <div className="card w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-semibold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
          >
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <button
            onClick={onCancel}
            className={`transition-colors ${theme === "dark" ? "text-neutral-400 hover:text-neutral-300" : "text-neutral-600 hover:text-neutral-900"}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                theme === "dark"
                  ? "bg-neutral-950 text-neutral-50 placeholder-neutral-600"
                  : "bg-white text-neutral-900 placeholder-neutral-400"
              } ${
                errors.title
                  ? theme === "dark"
                    ? "border-neutral-700/80 ring-1 ring-neutral-700/50"
                    : "border-red-300 ring-1 ring-red-300/50"
                  : theme === "dark"
                    ? "border-neutral-800"
                    : "border-neutral-300"
              }`}
              placeholder="e.g., Buy groceries"
            />
            {errors.title && (
              <p
                className={`text-xs mt-1.5 transition-colors ${theme === "dark" ? "text-neutral-400/80" : "text-red-600"}`}
              >
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none ${
                theme === "dark"
                  ? "bg-neutral-950 border-neutral-800 text-neutral-50 placeholder-neutral-600"
                  : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400"
              }`}
              placeholder="Add details (optional)"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  theme === "dark"
                    ? "bg-neutral-950 text-neutral-50 border-neutral-800"
                    : "bg-white text-neutral-900 border-neutral-300"
                } ${
                  errors.category
                    ? theme === "dark"
                      ? "ring-1 ring-neutral-700/50"
                      : "ring-1 ring-red-300/50"
                    : ""
                }`}
              >
                {PREDEFINED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p
                  className={`text-xs mt-1.5 transition-colors ${theme === "dark" ? "text-neutral-400/80" : "text-red-600"}`}
                >
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
            >
              Due Date (Optional)
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              min={getMinDateTime()}
              value={formatDateForInput(formData.dueDate)}
              onChange={(e) => {
                if (!e.target.value) {
                  setFormData((prev) => ({ ...prev, dueDate: null }));
                } else {
                  // Parse the datetime-local input as UTC
                  const [date, time] = e.target.value.split("T");
                  const [year, month, day] = date.split("-");
                  const [hours, minutes] = time.split(":");
                  const utcDate = new Date(
                    Date.UTC(
                      parseInt(year),
                      parseInt(month) - 1,
                      parseInt(day),
                      parseInt(hours),
                      parseInt(minutes),
                    ),
                  );
                  setFormData((prev) => ({
                    ...prev,
                    dueDate: utcDate.getTime(),
                  }));
                }
              }}
              className={`w-full px-3 py-2 border rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                theme === "dark"
                  ? "bg-neutral-950 border-neutral-800 text-neutral-50 placeholder-neutral-600"
                  : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400"
              }`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn btn-primary flex-1 text-sm">
              {task ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline flex-1 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
