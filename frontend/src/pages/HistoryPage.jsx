import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tasksAPI } from "../api/tasks";
import { useToast } from "../hooks/useToast";
import { useTheme } from "../context/ThemeContext";
import { Loading } from "../components/Loading";
import { ConfirmDialog } from "../components/ConfirmDialog";
import {
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
  MdAutoFixHigh,
  MdArrowBack,
} from "react-icons/md";

export function HistoryPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { success: showSuccess, error: showError } = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStates, setSelectedStates] = useState([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAll();
      setTasks(response.data);
    } catch (err) {
      showError("Failed to load history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleState = (state) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state],
    );
  };

  const handlePermanentDelete = async (id) => {
    setConfirmDialog({
      message: "Permanently delete this task? This cannot be undone.",
    });
    setPendingAction(() => async () => {
      try {
        await tasksAPI.delete(id);
        showSuccess("Task permanently deleted");
        setConfirmDialog(null);
        fetchAllTasks();
      } catch (err) {
        showError(err.response?.data?.message || "Failed to delete task");
      }
    });
  };

  const handleClearHistory = async () => {
    setConfirmDialog({
      message:
        "Permanently delete ALL completed tasks? This action cannot be undone.",
    });
    setPendingAction(() => async () => {
      try {
        const completedTasks = tasks.filter((t) => t.status === "COMPLETED");
        await Promise.all(completedTasks.map((t) => tasksAPI.delete(t.id)));
        showSuccess("Completed tasks cleared");
        setConfirmDialog(null);
        fetchAllTasks();
      } catch (err) {
        showError("Failed to clear completed tasks");
      }
    });
  };

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
        return <MdRadioButtonChecked className="text-neutral-400" />;
      default:
        return null;
    }
  };

  const filteredTasks = tasks
    .filter((t) => selectedStates.includes(t.status))
    .sort((a, b) => b.createdAt - a.createdAt);

  const STATE_OPTIONS = [
    {
      value: "PENDING",
      label: "Pending",
      count: tasks.filter((t) => t.status === "PENDING").length,
    },
    {
      value: "IN_PROGRESS",
      label: "In Progress",
      count: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    },
    {
      value: "COMPLETED",
      label: "Completed",
      count: tasks.filter((t) => t.status === "COMPLETED").length,
    },
  ];

  const allStatesSelected = STATE_OPTIONS.every((state) =>
    selectedStates.includes(state.value),
  );

  const handleToggleAllStates = () => {
    if (allStatesSelected) {
      setSelectedStates([]);
    } else {
      setSelectedStates(STATE_OPTIONS.map((state) => state.value));
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className={`flex-1 transition-colors ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1
                className={`text-5xl font-bold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
              >
                History
              </h1>
              <p
                className={`text-sm mt-2 transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
              >
                View all tasks regardless of their state
              </p>
            </div>
            <button
              onClick={() => navigate("/tasks")}
              className="btn btn-outline text-sm flex items-center gap-2"
            >
              <MdArrowBack />
              Back to Tasks
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            onClick={handleToggleAllStates}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              allStatesSelected
                ? "bg-accent text-white"
                : theme === "dark"
                  ? "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                  : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            }`}
          >
            {allStatesSelected ? "Deselect All" : "Select All"}
          </button>

          {STATE_OPTIONS.map((state) => (
            <button
              key={state.value}
              onClick={() => toggleState(state.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedStates.includes(state.value)
                  ? "bg-accent text-white"
                  : theme === "dark"
                    ? "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
              }`}
            >
              {state.label} ({state.count})
            </button>
          ))}

          {tasks.some((t) => t.status === "COMPLETED") &&
            selectedStates.includes("COMPLETED") && (
              <button
                onClick={handleClearHistory}
                className="ml-auto btn btn-outline text-sm"
              >
                Clear History
              </button>
            )}
        </div>

        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div key={task.id} className="card p-4 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3
                        className={`text-base font-semibold truncate transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-1 px-2 py-1 rounded badge-default">
                        {getStatusIcon(task.status)}
                        <span className="text-xs">
                          {getStatusLabel(task.status)}
                        </span>
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
                      <span className="badge badge-default">
                        {task.category}
                      </span>
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
                      <span>Created {formatDate(task.createdAt)}</span>
                      {task.updatedAt && task.updatedAt !== task.createdAt && (
                        <span>Updated {formatDate(task.updatedAt)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handlePermanentDelete(task.id)}
                      className={`btn btn-outline text-xs px-2 py-1 ${theme === "dark" ? "text-red-400 border-red-400/50 hover:bg-red-950/50" : "text-red-600 border-red-300 hover:bg-red-50"}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p
              className={`text-lg transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
            >
              No tasks found
            </p>
            <p
              className={`text-sm mt-2 transition-colors ${theme === "dark" ? "text-neutral-600" : "text-neutral-500"}`}
            >
              Select a status to view tasks
            </p>
          </div>
        )}

        {confirmDialog && (
          <ConfirmDialog
            confirm={confirmDialog}
            onConfirm={() => {
              pendingAction?.();
              setPendingAction(null);
            }}
            onCancel={() => {
              setConfirmDialog(null);
              setPendingAction(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
