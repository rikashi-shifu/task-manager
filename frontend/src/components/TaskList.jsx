export function TaskList({ tasks, onEdit, onDelete }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    return status === "COMPLETED" ? "badge-success" : "badge-default";
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="card p-4 group">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-50 truncate">
                  {task.title}
                </h3>
                <span
                  className={`badge text-xs ${getStatusBadge(task.status)}`}
                >
                  {task.status === "COMPLETED" ? "✓ Done" : "○ Todo"}
                </span>
              </div>
              {task.description && (
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-3 flex-wrap text-xs text-gray-500">
                <span className="badge badge-default">{task.category}</span>
                <span>{formatDate(task.createdAt)}</span>
                {task.updatedAt && task.updatedAt !== task.createdAt && (
                  <span className="text-gray-600">
                    Updated {formatDate(task.updatedAt)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="btn btn-outline text-xs px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="btn btn-outline text-xs px-2 py-1 text-gray-400 border-gray-600/50 hover:bg-gray-800/50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
