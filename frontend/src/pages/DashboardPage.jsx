import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tasksAPI } from "../api/tasks";
import { useToast } from "../hooks/useToast";
import { Loading } from "../components/Loading";
import StatCard from "../components/StatCard";

export function DashboardPage() {
  const { error: showError } = useToast();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAll();
      const tasks = response.data;

      const completed = tasks.filter((t) => t.status === "COMPLETED").length;
      const pending = tasks.filter((t) => t.status === "TODO").length;

      setStats({
        total: tasks.length,
        completed,
        pending,
      });
    } catch (err) {
      showError("Failed to load dashboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex-1 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-neutral-50 mb-2">Dashboard</h1>
          <p className="text-neutral-400">Overview of your tasks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Tasks" value={stats.total} icon="📋" />
          <StatCard label="Completed" value={stats.completed} icon="✓" />
          <StatCard label="Pending" value={stats.pending} icon="○" />
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Get Started</h2>
              <p className="text-neutral-400 text-sm">
                Manage your tasks efficiently
              </p>
            </div>
            <Link to="/tasks" className="btn btn-primary text-sm">
              View Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
