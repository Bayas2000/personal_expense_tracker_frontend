import React, { useState } from "react";

const AddRecurringExpenseModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!title || !amount || !dueDate) return;
    onSubmit({
      title,
      amount: Number(amount),
      dueDate,
      notes
    });
    setTitle("");
    setAmount("");
    setDueDate("");
    setNotes("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-lg font-semibold mb-4">Add Recurring Expense</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-sm"
            placeholder="e.g. Wifi, Rent, Subscription"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded text-sm"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded text-sm resize-none"
            placeholder="Optional notes..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecurringExpenseModal;
