import React from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { ArrowLeft, MessageSquare, Trash2 } from "lucide-react";

const Setting = () => {
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const [feedbackModal, setFeedbackModal] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [deleteModal, setDeleteModal] = React.useState(false);

  const handleReset = () => {
    api
      .delete("transaction/reset")
      .then(() => {
        toast.warning("All data has been cleared");
        setDeleteModal(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const handleSubmit = () => {
    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty");
      return;
    }
    toast.success("Successfully sent the feedback");
    setFeedback("");
    setFeedbackModal(false);
  };

  const cardBase = `rounded-2xl shadow-md ${
    mode === "dark" ? "bg-[#f1f1f1] text-[#2D3A45]" : "bg-white text-gray-900"
  }`;

  return (
    <div className="lg:w-[80%] w-full px-4 py-8 mx-auto space-y-6">
      {/* Top Settings Card with Header inside */}
      <div className={`${cardBase} p-5 space-y-4`}>
        <div className="flex items-center gap-3 border-b pb-3">
         
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-black"
          >
            Settings
          </motion.h1>
        </div>

        {/* Feedback Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="text-blue-500" />
            <h2 className="text-lg font-semibold">Feedback</h2>
          </div>
          <p className="text-sm">
            I’d love to hear your thoughts! Let me know if you have any
            suggestions or issues. Click{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => setFeedbackModal(true)}
            >
              here
            </span>{" "}
            to send feedback.
          </p>
        </div>
      </div>

      {/* Reset Section */}
      <div className={`${cardBase} p-5`}>
        <div className="flex items-center gap-2 mb-2">
          <Trash2 className="text-red-500" />
          <h2 className="text-lg font-semibold">Reset All Data</h2>
        </div>
        <div className="border-b border-gray-200 mb-4" />
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-sm">This will delete all saved transactions.</p>
          <button
            onClick={() => setDeleteModal(true)}
            className={`px-4 py-2 rounded-md transition ${
              mode === "dark"
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-red-200 hover:bg-red-500 hover:text-white text-black"
            }`}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {feedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md p-6 rounded-xl shadow-lg ${
              mode === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold">Send Feedback</h3>
              <button
                onClick={() => setFeedbackModal(false)}
                className="text-xl leading-none hover:text-red-500"
              >
                &times;
              </button>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your message..."
              className={`w-full min-h-[100px] p-3 rounded-md border resize-none focus:outline-none focus:ring-2 ${
                mode === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400"
              }`}
            />
            <div className="flex justify-end gap-3 mt-4 border-t pt-3">
              <button
                onClick={() => setFeedbackModal(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm p-6 rounded-xl shadow-lg ${
              mode === "dark"
                ? "bg-[#F1F1F1] text-[#2D3A45]"
                : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">Confirm Reset</h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete all your records? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3 border-t pt-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
