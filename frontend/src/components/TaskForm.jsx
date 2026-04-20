import { useState, useEffect } from "react";

export function TaskForm({ task, onSubmit, onCancel, categories }) {
  const [formData, setFormData] = useState(
    task || {
      title: "",
      description: "",
      status: "TODO",
      category: categories[0] || "General",
    },
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData(task);
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-40">
      <div className="card w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-300 transition"
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
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-950 border rounded-md text-gray-50 placeholder-gray-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                errors.title
                  ? "border-gray-700/80 ring-1 ring-gray-700/50"
                  : "border-gray-800"
              }`}
              placeholder="e.g., Buy groceries"
            />
            {errors.title && (
              <p className="text-gray-400/80 text-xs mt-1.5">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-md text-gray-50 placeholder-gray-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
              placeholder="Add details (optional)"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-md text-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <option value="TODO">TODO</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-gray-950 border rounded-md text-gray-50 placeholder-gray-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  errors.category
                    ? "border-gray-700/80 ring-1 ring-gray-700/50"
                    : "border-gray-800"
                }`}
                placeholder="e.g., Work"
                list="categoryList"
              />
              <datalist id="categoryList">
                {categories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
              {errors.category && (
                <p className="text-gray-400/80 text-xs mt-1.5">
                  {errors.category}
                </p>
              )}
            </div>
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
