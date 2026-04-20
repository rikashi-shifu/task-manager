import { useState, useEffect } from "react";
import { tasksAPI } from "../api/tasks";
import { useToast } from "../hooks/useToast";
import { Loading } from "../components/Loading";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { TaskFilters } from "../components/TaskFilters";

export function TasksPage() {
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
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await tasksAPI.delete(id);
      showSuccess("Task deleted successfully");
      fetchTasks();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
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

  if (loading) return <Loading />;

  const filteredTasks = getFilteredTasks();
  const categories = [...new Set(tasks.map((t) => t.category))];

  return (
    <div className="flex-1 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-5xl font-bold text-neutral-50">Tasks</h1>
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
          <p className="text-neutral-400">Organize and manage your work</p>
        </div>

        <TaskFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />

        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
            categories={categories}
          />
        )}

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            categories={categories}
          />
        )}

        {filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg">No tasks found</p>
            <p className="text-neutral-600 text-sm mt-2">
              Create one to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
