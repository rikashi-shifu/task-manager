import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  MdRadioButtonUnchecked,
  MdAutoFixHigh,
  MdCheckCircle,
} from "react-icons/md";

export function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  const { theme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(null);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return "badge-success";
      case "IN_PROGRESS":
        return "badge-warning";
      case "PENDING":
        return "badge-default";
      default:
        return "badge-default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "IN_PROGRESS":
        return "In Progress";
      case "COMPLETED":
        return "Completed";
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <MdRadioButtonUnchecked className="text-neutral-400" />;
      case "IN_PROGRESS":
        return <MdAutoFixHigh className="text-neutral-400" />;
      case "COMPLETED":
        return <MdCheckCircle className="text-neutral-400" />;
      default:
        return null;
    }
  };

  const STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const handleStatusChange = (taskId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(taskId, newStatus);
    }
    setOpenDropdown(null);
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "PENDING":
        return "IN_PROGRESS";
      case "IN_PROGRESS":
        return "COMPLETED";
      case "COMPLETED":
        return "COMPLETED"; // Stay at COMPLETED
      default:
        return "PENDING";
    }
  };

  const handleCycleStatus = (taskId, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    handleStatusChange(taskId, nextStatus);
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="card p-4 group">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3
                  className={`text-base font-semibold truncate transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
                >
                  {task.title}
                </h3>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === task.id ? null : task.id)
                    }
                    className={`badge text-xs cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 ${getStatusBadge(task.status)}`}
                  >
                    {getStatusIcon(task.status)}
                    {getStatusLabel(task.status)}
                  </button>
                  {openDropdown === task.id && (
                    <div
                      className={`absolute top-full left-0 mt-1 border rounded-md shadow-lg z-10 min-w-max transition-colors ${
                        theme === "dark"
                          ? "bg-neutral-950 border-neutral-700"
                          : "bg-white border-neutral-200"
                      }`}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleStatusChange(task.id, option.value)
                          }
                          className={`block w-full text-left px-3 py-2 text-xs transition-colors ${
                            task.status === option.value
                              ? `bg-accent/20 text-accent font-semibold`
                              : theme === "dark"
                                ? "text-neutral-300 hover:bg-neutral-800"
                                : "text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {task.description && (
                <p
                  className={`text-sm mb-3 line-clamp-2 transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
                >
                  {task.description}
                </p>
              )}
              <div
                className={`flex items-center gap-3 flex-wrap text-xs transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
              >
                <span className="badge badge-default">{task.category}</span>
                {task.dueDate && (
                  <span className="badge badge-info">
                    Due:{" "}
                    {new Date(task.dueDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
                <span>Created at {formatDate(task.createdAt)}</span>
                {task.updatedAt && task.updatedAt !== task.createdAt && (
                  <span>Updated at {formatDate(task.updatedAt)}</span>
                )}
              </div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleCycleStatus(task.id, task.status)}
                className={`btn btn-outline text-xs px-2 py-1 text-accent transition-colors ${theme === "dark" ? "border-accent/50 hover:bg-accent/20" : "border-accent/50 hover:bg-accent/20"}`}
              >
                {task.status == "PENDING" ? "Set In Progress" : "Set Completed"}
              </button>
              <button
                onClick={() => onEdit(task)}
                className="btn btn-outline text-xs px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className={`btn btn-outline text-xs px-2 py-1 transition-colors ${theme === "dark" ? "text-red-400 border-red-400/50 hover:bg-red-950/50" : "text-red-600 border-red-300 hover:bg-red-50"}`}
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
