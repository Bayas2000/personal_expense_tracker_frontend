import api from "@/api/api";
import {
  ClearExpenseModalData,
  ClearRecurringModalData,
  LoadRecurring,
} from "@/Store/Banner";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddRecurringExpenseModal = ({ isOpen, onClose, onSubmit }) => {
  const recurring = useSelector((state) => state.banner);
  const { Recurring_Edit_List = {} } = recurring;

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setId(Recurring_Edit_List?._id || "");
    setTitle(Recurring_Edit_List?.title || "");
    setAmount(Recurring_Edit_List?.amount?.toString() || "");
    setDueDate(Recurring_Edit_List?.dueDate?.substring(0, 10) || "");
    setNotes(Recurring_Edit_List?.notes || "");
  }, [Recurring_Edit_List]);

  const handleSubmit = () => {
    if (!title || !amount || !dueDate) return;
    onSubmit({
      title,
      amount: Number(amount),
      dueDate,
      notes,
    });
    setTitle("");
    setAmount("");
    setDueDate("");
    setNotes("");
    onClose();
  };

  const handleUpdate = () => {
    const payload = {
      _id: id,
      title,
      amount,
      dueDate,
    };
    if (notes) {
      payload.notes = notes;
    }

    api
      .put("/recurring/update", payload)
      .then(() => {
        dispatch(LoadRecurring());
        dispatch(ClearRecurringModalData());
        toast.info("Records updated successfully");
        onClose();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.error(error);
      });
  };

  const handleDelete = () => {
    api
      .put("/recurring/update-status", { _id: id, isActive: false })
      .then(() => {
        dispatch(LoadRecurring());
        dispatch(ClearRecurringModalData());
        setDeleteModal(false);
        toast.warning("Record successfully moved to Inactive ");
        onClose();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setDeleteModal(false);
        console.error(error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">
            {id ? "Edit Recurring Expense" : "Add Recurring Expense"}
          </h2>
          <button
            className="text-gray-500 hover:text-red-600 text-2xl font-bold"
            onClick={() => {
              onClose();
              dispatch(ClearExpenseModalData());
            }}
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Wifi, Rent, Subscription"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional notes..."
          />
        </div>
        <div className=" flex items-center mb-2 ">
          <button
            onClick={id ? handleUpdate : handleSubmit}
            className={`${
              id ? "bg-blue-500 rounded-l-lg" : "bg-red-500 rounded-lg"
            } text-white pl-4 py-1   w-full border border-gray-200 shadow-lg `}
          >
            {id ? "Update" : "Add"}
          </button>
          {id && (
            <button
              className="pl-10 py-[4px]  rounded-r-lg  text-center cursor-pointer w-[30%] bg-red-500"
              onClick={() => setDeleteModal(true)}
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
              </svg>
            </button>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30 px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Confirmation !</h3>
                <button
                  onClick={() => setDeleteModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close delete confirmation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="mb-6">
                Are you sure you want to Inactive this recurring expense?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecurringExpenseModal;
