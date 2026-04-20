import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const StatCard = ({ label, value, icon }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`card group cursor-pointer transition-colors ${theme === "dark" ? "hover:border-neutral-700/50" : "hover:border-neutral-400/50"}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p
            className={`text-sm font-medium mb-1 transition-colors ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
          >
            {label}
          </p>
          <p
            className={`text-4xl font-bold transition-colors ${theme === "dark" ? "text-neutral-50" : "text-neutral-900"}`}
          >
            {value}
          </p>
        </div>
        <div
          className={`text-3xl opacity-70 group-hover:opacity-100 transition-all ${theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}
        >
          {icon}
        </div>
      </div>
      <div
        className={`h-1 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${theme === "dark" ? "bg-neutral-600" : "bg-neutral-400"}`}
      ></div>
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
};

export default StatCard;
