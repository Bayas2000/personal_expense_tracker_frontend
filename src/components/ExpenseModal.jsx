import React from "react";
import ExpenseAdd from "./ExpenseAdd/ExpenseAdd";
import IncomeAdd from "./ExpenseAdd/IncomeAdd";
import { ClearExpenseModalData, ClearIncomeModalData } from "../Store/Banner";
import { useDispatch, useSelector } from "react-redux";

const ExpenseModal = ({
  openAddModal,
  setOpenAddModal,
  activeTab,
  setActiveTab,
}) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <>
      {openAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div
            className={`w-[90%] max-w-md m-4 pb-2 min-h-[410px] rounded-lg shadow-lg ${
              isDark ? "bg-[#1f2937] text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-start m-3">
              <h1 className="text-xl font-semibold ml-2">Transaction</h1>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setOpenAddModal(false);
                  dispatch(ClearExpenseModalData());
                  dispatch(ClearIncomeModalData());
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill={isDark ? "#ddd" : "#666"}
                >
                  <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                </svg>
              </button>
            </div>

            <div
              className={`h-[1px] ${
                isDark ? "bg-gray-600" : "bg-gray-200"
              } my-2 mb-4`}
            />

            {/* Tabs */}
            <div className="flex mx-4 mt-2 justify-center gap-4">
              <button
                className={`text-md px-6 py-[4px] rounded-lg border transition flex gap-2 ${
                  activeTab === "expense"
                    ? "bg-red-500 text-white border-red-500"
                    : `${
                        isDark
                          ? "bg-gray-700 text-red-400"
                          : "bg-gray-100 text-red-500"
                      } border-white`
                }`}
                onClick={() => setActiveTab("expense")}
              >
                Expense
              </button>

              <button
                className={`text-md px-6 py-[4px] rounded-lg border transition flex gap-2 ${
                  activeTab === "income"
                    ? "bg-green-500 text-white border-green-500"
                    : `${
                        isDark
                          ? "bg-gray-700 text-green-400"
                          : "bg-gray-100 text-green-500"
                      } border-white`
                }`}
                onClick={() => setActiveTab("income")}
              >
                Income
              </button>
            </div>

            {/* Modal Content */}
            {activeTab === "expense" ? (
              <ExpenseAdd setOpenAddModal={setOpenAddModal} />
            ) : (
              <IncomeAdd
                setOpenAddModal={setOpenAddModal}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseModal;
