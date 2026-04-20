import { MdCheckCircle, MdWarning, MdInfo, MdClose } from "react-icons/md";

export function Toast({ toast, onClose }) {
  const bgColor =
    toast.type === "success"
      ? "bg-neutral-900 border-neutral-800"
      : toast.type === "error"
        ? "bg-neutral-900 border-neutral-800"
        : "bg-neutral-900 border-neutral-800";

  const textColor =
    toast.type === "success"
      ? "text-neutral-300"
      : toast.type === "error"
        ? "text-neutral-300"
        : "text-neutral-300";

  const getIcon = () => {
    if (toast.type === "success")
      return <MdCheckCircle className="text-neutral-400" />;
    if (toast.type === "error")
      return <MdWarning className="text-neutral-400" />;
    return <MdInfo className="text-neutral-400" />;
  };

  return (
    <div
      className={`${bgColor} border rounded-lg px-4 py-3 shadow-lg animate-fade-in flex items-center justify-between gap-4`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <div className="text-lg flex-shrink-0">{getIcon()}</div>
        <span className={`text-sm ${textColor}`}>{toast.message}</span>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="text-lg opacity-70 hover:opacity-100 transition-opacity flex-shrink-0 text-neutral-400"
      >
        <MdClose />
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
