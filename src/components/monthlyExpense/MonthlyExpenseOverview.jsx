import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArrowIcon = ({ isOpen }) => (
  <svg
    className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const MonthlyExpenseOverview = () => {
  const [isOpen, setIsOpen] = useState(false);

  const estimated = 2000;
  const actual = 1800;
  const difference = estimated - actual;
  const percentageDifference = ((difference / estimated) * 100).toFixed(1);
  const isPositive = difference >= 0;

  return (
    <div className="w-[100%] mx-auto p-2 px-6 bg-white/70 shadow-lg rounded-2xl border border-gray-100">
      {/* Accordion Header */}
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="expense-content"
      >
        <h2 className="text-md font-semibold text-gray-800">
         Scheduled Monthly Expense 
        </h2>
        <ArrowIcon isOpen={isOpen} />
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id="expense-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden mt-5"
          >
            <div className="space-y-5 text-gray-700 text-sm">
              {/* Values Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estimated:</span>
                  <span
                    className="bg-gray-100 px-3 py-1 rounded-md font-mono text-gray-900 shadow-inner"
                    title="Your estimated monthly expense"
                  >
                    ${estimated}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Actual:</span>
                  <span
                    className="bg-gray-100 px-3 py-1 rounded-md font-mono text-gray-900 shadow-inner"
                    title="Your actual monthly expense"
                  >
                    ${actual}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Difference:</span>
                  <span
                    className={`px-3 py-1 rounded-md font-mono font-semibold ${
                      isPositive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    } shadow-inner`}
                    title="Difference between estimated and actual"
                  >
                    {isPositive ? "+" : "-"}${Math.abs(difference)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">% Difference:</span>
                  <span
                    className={`px-3 py-1 rounded-md font-mono font-semibold ${
                      isPositive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    } shadow-inner`}
                    title="Percentage difference"
                  >
                    {isPositive ? "+" : "-"}
                    {Math.abs(percentageDifference)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
                      isPositive ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        Math.abs(percentageDifference),
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MonthlyExpenseOverview;
