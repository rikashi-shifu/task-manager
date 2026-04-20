import PropTypes from "prop-types";

const StatCard = ({ label, value, icon }) => {
  return (
    <div className="card group cursor-pointer hover:border-gray-700/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
          <p className="text-4xl font-bold text-gray-50">{value}</p>
        </div>
        <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
      </div>
      <div className="h-1 w-12 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
};

export default StatCard;
