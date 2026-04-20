export function Toast({ toast, onClose }) {
  const bgColor =
    toast.type === "success"
      ? "bg-gray-800/40 border-gray-700/50 text-gray-300"
      : toast.type === "error"
        ? "bg-gray-800/40 border-gray-700/50 text-gray-300"
        : "bg-gray-800/40 border-gray-700/50 text-gray-300";

  return (
    <div
      className={`${bgColor} border rounded-lg px-4 py-3 shadow-lg animate-fade-in flex items-center justify-between gap-4`}
      role="alert"
    >
      <span className="text-sm">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="text-lg opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 pointer-events-auto">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
