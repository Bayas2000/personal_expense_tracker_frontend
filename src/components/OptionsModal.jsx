import { useSelector } from "react-redux";
import personal from "../assets/personal.png";
import business from "../assets/business.png";
import { useNavigate } from "react-router-dom";

const OptionModal = ({ optionModal, setOptionModal }) => {
  const UserData = useSelector((state) => state.Auth.UserData);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
      <div className="w-full max-w-lg bg-gray-200 text-gray-900 rounded-2xl shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="sm:p-6 text-center">
          <div
            className="flex justify-end sm:-mt-2 sm:-mr-2 p-2 cursor-pointer"
            onClick={() => setOptionModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
              className="hover:text-red-500 transition-colors"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-blue-500">
            Hey, {UserData?.userName || "Guest"} 👋
          </h1>
          <h2 className="text-lg font-medium text-gray-800 mt-2">
            Choose how you'd like to get started
          </h2>

          {/* Responsive paragraph */}
          <p className="text-sm text-gray-500 mt-1 hidden sm:block">
            Select a mode that best fits your needs to proceed.
          </p>
          <p className="text-sm text-gray-500 mt-1 sm:hidden">
            Pick a mode to continue.
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6 py-4 pb-6">
          {/* Personal */}
          <div
            onClick={() => navigate("/ForPersonal")}
            className="w-full sm:w-44 p-4 flex flex-col items-center rounded-lg cursor-pointer shadow-sm hover:shadow-md transition bg-gray-100 hover:bg-gray-200"
          >
            <img
              className="w-16 h-16 object-contain"
              src={personal}
              alt="Personal"
            />
            <p className="font-semibold mt-2 text-center">Personal</p>
            <p className="text-xs text-center text-gray-600 mt-1">
              Track your individual income, expenses, and budget.
            </p>
          </div>

          {/* Business */}
          <div
            onClick={() => navigate("/business/dashboard")}
            className="w-full sm:w-44 p-4 flex flex-col items-center rounded-lg cursor-pointer shadow-sm hover:shadow-md transition bg-gray-100 hover:bg-gray-200"
          >
            <img
              className="w-16 h-16 object-contain"
              src={business}
              alt="Business"
            />
            <p className="font-semibold mt-2 text-center">Group Saving</p>
            <p className="text-xs text-center text-gray-600 mt-1">
              Manage savings and investments with your group or community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionModal;
