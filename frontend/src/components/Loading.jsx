import { useTheme } from "../context/ThemeContext";

export function Loading() {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-colors ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div
        className={`w-12 h-12 border-4 border-t-white rounded-full animate-spin transition-colors ${theme === "dark" ? "border-neutral-800" : "border-neutral-200"}`}
      ></div>
    </div>
  );
}
