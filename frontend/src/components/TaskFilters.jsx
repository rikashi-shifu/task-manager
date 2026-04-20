export function TaskFilters({ filters, setFilters, categories }) {
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
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Search
          </label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search tasks..."
            className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-md text-gray-50 placeholder-gray-600 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>

        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-md text-gray-50 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <option value="">All</option>
            <option value="TODO">TODO</option>
            <option value="COMPLETED">Done</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-300 mb-2">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-md text-gray-50 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <option value="">All</option>
            {categories.map((cat) => (
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
