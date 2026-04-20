import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tasksAPI } from "../api/tasks";
import { useToast } from "../hooks/useToast";
import { useTheme } from "../context/ThemeContext";
import { Loading } from "../components/Loading";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { TaskFilters } from "../components/TaskFilters";
import { PREDEFINED_CATEGORIES } from "../constants/categories";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { MdHistory } from "react-icons/md";

export function TasksPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { success: showSuccess, error: showError } = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    search: "",
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAll();
      setTasks(response.data);
    } catch (err) {
      showError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await tasksAPI.create(taskData);
      showSuccess("Task created successfully");
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await tasksAPI.update(editingTask.id, taskData);
      showSuccess("Task updated successfully");
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    setConfirmDialog({
      message:
        "Are you sure you want to permanently delete this task? This action cannot be undone.",
    });
    setPendingAction(() => async () => {
      try {
        await tasksAPI.delete(id);
        showSuccess("Task permanently deleted");
        setConfirmDialog(null);
        fetchTasks();
      } catch (err) {
        showError(err.response?.data?.message || "Failed to delete task");
      }
    });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const taskToUpdate = tasks.find((t) => t.id === taskId);
      await tasksAPI.update(taskId, {
        ...taskToUpdate,
        status: newStatus,
      });
      showSuccess(`Task status updated to ${newStatus}`);
      fetchTasks();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update task status");
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      // Only show active tasks on main page
      if (task.status !== "PENDING" && task.status !== "IN_PROGRESS")
        return false;
      if (filters.status && task.status !== filters.status) return false;
      if (filters.category && task.category !== filters.category) return false;
      if (
        filters.search &&
        !task.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  };

  const sortTasks = (tasksToSort, sortBy) => {
    const sorted = [...tasksToSort];
    switch (sortBy) {
      case "dueDate":
        return sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate - b.dueDate;
        });
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "createdAt":
        return sorted.sort((a, b) => b.createdAt - a.createdAt);
      default:
        return sorted;
    }
  };

  if (loading) return <Loading />;

  const filteredTasks = getFilteredTasks();

  return (
    <div
      className={`flex-1 transition-colors ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1
              className={`text-5xl font-bold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
            >
              Tasks
            </h1>
            <div className="flex items-center gap-3">
              {tasks.length > 0 && (
                <button
                  onClick={() => navigate("/history")}
                  className="btn btn-outline text-sm flex items-center gap-2"
                >
                  <MdHistory />
                  View All
                </button>
              )}
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowForm(true);
                }}
                className="btn btn-primary text-sm"
              >
                + New Task
              </button>
            </div>
          </div>
          <p
            className={`transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            Organize and manage your work
          </p>
        </div>

        <TaskFilters filters={filters} setFilters={setFilters} />

        {filteredTasks.length > 0 && (
          <div className="mb-4 flex gap-2 flex-wrap">
            <span
              className={`text-sm flex items-center transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
            >
              Sort by:
            </span>
            <button
              onClick={() => setSortBy("createdAt")}
              className={`btn text-xs ${
                sortBy === "createdAt" ? "btn-primary" : "btn-outline"
              }`}
            >
              Created
            </button>
            <button
              onClick={() => setSortBy("name")}
              className={`btn text-xs ${
                sortBy === "name" ? "btn-primary" : "btn-outline"
              }`}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy("dueDate")}
              className={`btn text-xs ${
                sortBy === "dueDate" ? "btn-primary" : "btn-outline"
              }`}
            >
              Due Date
            </button>
          </div>
        )}

        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
          />
        )}

        {filteredTasks.length > 0 ? (
          <TaskList
            tasks={sortTasks(filteredTasks, sortBy)}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
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
              Create one to get started
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
