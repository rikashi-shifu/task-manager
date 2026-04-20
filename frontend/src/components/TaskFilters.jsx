import { PREDEFINED_CATEGORIES } from "../constants/categories";
import { useTheme } from "../context/ThemeContext";

export function TaskFilters({ filters, setFilters }) {
  const { theme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ status: "", category: "", search: "" });
  };

  const hasActiveFilters = filters.search || filters.status || filters.category;

  return (
    <div className="card p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1">
          <label
            className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
          >
            Search
          </label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search tasks..."
            className={`w-full px-3 py-2 border rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              theme === "dark"
                ? "bg-neutral-950 border-neutral-800 text-neutral-50 placeholder-neutral-600"
                : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400"
            }`}
          />
        </div>

        <div className="flex-1">
          <label
            className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
          >
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              theme === "dark"
                ? "bg-neutral-950 border-neutral-800 text-neutral-50"
                : "bg-white border-neutral-300 text-neutral-900"
            }`}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
          </select>
        </div>

        <div className="flex-1">
          <label
            className={`block text-xs font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
          >
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              theme === "dark"
                ? "bg-neutral-950 border-neutral-800 text-neutral-50"
                : "bg-white border-neutral-300 text-neutral-900"
            }`}
          >
            <option value="">All</option>
            {PREDEFINED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="btn btn-outline text-xs px-3 py-2"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
