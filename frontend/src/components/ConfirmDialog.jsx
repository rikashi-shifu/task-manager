import { useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

export function useConfirm() {
  const confirm = useCallback((message, onConfirm, onCancel) => {
    return { message, onConfirm, onCancel };
  }, []);

  return { confirm };
}

export function ConfirmDialog({ confirm, onConfirm, onCancel }) {
  const { theme } = useTheme();

  if (!confirm) return null;

  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors ${theme === "dark" ? "bg-black/60" : "bg-white/60"}`}
    >
      <div className="card w-full max-w-sm">
        <div className="mb-6">
          <h2
            className={`text-lg font-semibold mb-2 transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
          >
            Confirm Action
          </h2>
          <p
            className={`text-sm transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            {confirm.message}
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              onCancel?.();
            }}
            className="btn btn-outline text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm?.();
            }}
            className="btn btn-error text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
