import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tasksAPI } from "../api/tasks";
import { useToast } from "../hooks/useToast";
import { useTheme } from "../context/ThemeContext";
import { Loading } from "../components/Loading";
import StatCard from "../components/StatCard";
import {
  MdEditNote,
  MdCheckCircle,
  MdAssignment,
  MdAccessTime,
  MdToday,
  MdCalendarMonth,
  MdEventNote,
} from "react-icons/md";

export function DashboardPage() {
  const { theme } = useTheme();
  const { error: showError } = useToast();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    dueToday: 0,
    dueThisWeek: 0,
    dueLater: 0,
    completionRate: 0,
    byCategory: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAll();
      const tasks = response.data.filter((t) => t.status !== "DELETED");

      const completed = tasks.filter((t) => t.status === "COMPLETED").length;
      const pending = tasks.filter(
        (t) => t.status === "PENDING" || t.status === "IN_PROGRESS",
      ).length;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      // Due date analytics
      let overdue = 0;
      let dueToday = 0;
      let dueThisWeek = 0;
      let dueLater = 0;
      const byCategory = {};

      tasks.forEach((task) => {
        // Category breakdown
        byCategory[task.category] = (byCategory[task.category] || 0) + 1;

        // Due date analytics (only for non-completed tasks)
        if (task.dueDate && task.status !== "COMPLETED") {
          const dueDate = new Date(task.dueDate);
          const dueDateOnly = new Date(
            dueDate.getFullYear(),
            dueDate.getMonth(),
            dueDate.getDate(),
          );

          if (dueDateOnly < today) {
            overdue++;
          } else if (dueDateOnly.getTime() === today.getTime()) {
            dueToday++;
          } else if (dueDateOnly < nextWeek) {
            dueThisWeek++;
          } else {
            dueLater++;
          }
        }
      });

      const completionRate =
        tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

      setStats({
        total: tasks.length,
        completed,
        pending,
        overdue,
        dueToday,
        dueThisWeek,
        dueLater,
        completionRate,
        byCategory,
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
    <div
      className={`flex-1 transition-colors ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1
            className={`text-5xl font-bold mb-2 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
          >
            Dashboard
          </h1>
          <p
            className={`transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            Overview of your tasks
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Tasks"
            value={stats.total}
            icon={<MdEditNote />}
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            icon={<MdCheckCircle />}
          />
          <StatCard
            label="Active"
            value={stats.pending}
            icon={<MdAssignment />}
          />
        </div>

        {/* Completion Rate */}
        <div className="card mb-8">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3
                className={`text-lg font-semibold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
              >
                Completion Rate
              </h3>
              <span
                className={`text-2xl font-bold transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
              >
                {stats.completionRate}%
              </span>
            </div>
            <div
              className={`w-full rounded-full h-3 overflow-hidden border transition-colors ${theme === "dark" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-300"}`}
            >
              <div
                className={`h-full transition-all duration-500 rounded-full ${theme === "dark" ? "bg-neutral-400" : "bg-neutral-600"}`}
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
          <p
            className={`transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            {stats.completed} of {stats.total} tasks completed
          </p>
        </div>

        {/* Due Date Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className={`card p-4 border transition-colors ${
              stats.overdue > 0
                ? theme === "dark"
                  ? "border-neutral-700 bg-neutral-950/80"
                  : "border-red-300 bg-red-50"
                : theme === "dark"
                  ? "border-neutral-800 bg-neutral-950/40"
                  : "border-neutral-200 bg-neutral-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-sm mb-1 transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
                >
                  Overdue
                </p>
                <p
                  className={`text-3xl font-bold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
                >
                  {stats.overdue}
                </p>
              </div>
              <MdAccessTime
                className={`text-2xl transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
              />
            </div>
            {stats.overdue > 0 && (
              <p
                className={`text-xs mt-3 transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
              >
                {stats.overdue} {stats.overdue === 1 ? "task" : "tasks"} need
                attention
              </p>
            )}
          </div>

          <div
            className={`card p-4 border transition-colors ${theme === "dark" ? "border-neutral-800 bg-neutral-950/40" : "border-neutral-200 bg-neutral-50"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-sm mb-1 transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
                >
                  Due Today
                </p>
                <p
                  className={`text-3xl font-bold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
                >
                  {stats.dueToday}
                </p>
              </div>
              <MdToday
                className={`text-2xl transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
              />
            </div>
            {stats.dueToday > 0 && (
              <p
                className={`text-xs mt-3 transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
              >
                Complete {stats.dueToday}{" "}
                {stats.dueToday === 1 ? "task" : "tasks"} today
              </p>
            )}
          </div>

          <div
            className={`card p-4 border transition-colors ${theme === "dark" ? "border-neutral-800 bg-neutral-950/40" : "border-neutral-200 bg-neutral-50"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-sm mb-1 transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
                >
                  This Week
                </p>
                <p
                  className={`text-3xl font-bold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
                >
                  {stats.dueThisWeek}
                </p>
              </div>
              <MdCalendarMonth
                className={`text-2xl transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
              />
            </div>
            {stats.dueThisWeek > 0 && (
              <p
                className={`text-xs mt-3 transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
              >
                {stats.dueThisWeek} {stats.dueThisWeek === 1 ? "task" : "tasks"}{" "}
                coming up
              </p>
            )}
          </div>

          <div
            className={`card p-4 border transition-colors ${theme === "dark" ? "border-neutral-800 bg-neutral-950/40" : "border-neutral-200 bg-neutral-50"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-sm mb-1 transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
                >
                  Later
                </p>
                <p
                  className={`text-3xl font-bold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
                >
                  {stats.dueLater}
                </p>
              </div>
              <MdEventNote
                className={`text-2xl transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
              />
            </div>
            <p
              className={`text-xs mt-3 transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
            >
              {stats.dueLater} {stats.dueLater === 1 ? "task" : "tasks"} due
              later
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        {Object.keys(stats.byCategory).length > 0 && (
          <div className="card mb-8">
            <h2
              className={`text-lg font-semibold mb-4 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
            >
              Tasks by Category
            </h2>
            <div className="space-y-3">
              {Object.entries(stats.byCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([category, count]) => {
                  const percentage = Math.round((count / stats.total) * 100);
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-sm font-medium transition-colors ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
                        >
                          {category}
                        </span>
                        <span
                          className={`text-sm transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
                        >
                          {count} {count === 1 ? "task" : "tasks"}
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-2 overflow-hidden border transition-colors ${theme === "dark" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-300"}`}
                      >
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${theme === "dark" ? "bg-neutral-400" : "bg-neutral-600"}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p
                        className={`text-xs mt-1 transition-colors ${theme === "dark" ? "text-neutral-600" : "text-neutral-500"}`}
                      >
                        {percentage}%
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        <div
          className={`card border transition-colors ${theme === "dark" ? "border-neutral-800" : "border-neutral-200"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className={`text-2xl font-semibold mb-1 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
              >
                Get Started
              </h2>
              <p
                className={`text-sm transition-colors ${theme === "dark" ? "text-neutral-500" : "text-neutral-600"}`}
              >
                Manage your tasks efficiently
              </p>
            </div>
            <Link
              to="/tasks"
              className="btn btn-outline text-sm hover:text-white hover:no-underline"
            >
              View Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
