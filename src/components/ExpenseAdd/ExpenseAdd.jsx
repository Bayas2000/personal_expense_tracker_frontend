import React from "react";
import api from "../../api/api";
import Select from "react-select";
import {
  CustomOption,
  CustomSingleValue,
} from "../../customComponents/reactSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearExpenseModalData,
  LoadBannerDetails,
  LoadExpenses,
} from "../../Store/Banner";
import { toast } from "react-toastify";

const ExpenseAdd = ({ setOpenAddModal, openAddModal }) => {
  const expenseModal = useSelector((state) => state.banner?.Expense_Modal_List);
  const dateFilter = useSelector((state) => state.banner?.date_Filter);
  const mode = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (expenseModal) {
      setDetails({
        _id: expenseModal._id || "",
        amount: expenseModal.amount || "",
        notes: expenseModal.description || "",
      });
      setDate(expenseModal.transactionDate?.substring(0, 10) || "");
      setCategory({
        value: expenseModal.categoryId,
        label: expenseModal.categoryName,
        icon: expenseModal.categoryIcon,
      });
    }
  }, [expenseModal]);

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(ClearExpenseModalData());
  //     FormClear();
  //     console.log("form cleared");
  //   };
  // }, []);

  const FormClear = () => {
    setCategoryData([]);
    setCategory([]);
    setDate(null);
    setDetails("");
  };

  const [categoryData, setCategoryData] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [date, setDate] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [details, setDetails] = React.useState({
    _id: "",
    amount: "",
    notes: "",
  });

  React.useEffect(() => {
    api
      .get("/category/get-all-data")
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error in fetching category");
      });
  }, []);

  const categoryOption =
    categoryData.length > 0 &&
    categoryData.map((data) => {
      return {
        value: data._id,
        label: data.name,
        icon: data?.icon,
        color: data?.color,
      };
    });

  const handleChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  const handleDetails = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      categoryId: category.value,
      type: "Expense",
      transactionDate: date,
    };

    if (details.notes) {
      payload.description = details.notes;
    }
    if (details.amount) {
      payload.amount = details.amount;
    }

    api
      .post("/transaction/create", payload)
      .then((res) => {
        dispatch(LoadExpenses(dateFilter));
        dispatch(LoadBannerDetails(dateFilter));
        toast.success("Records Successfully added");
        setOpenAddModal(false);
      })
      .catch((error) => {
        console.log(error, "error");
        toast.error(error.response.data.errors[0] || "Something went wrong");
        setOpenAddModal(true);
      });
  };

  const handleUpdate = () => {
    const payload = {
      _id: details._id,
      categoryId: category.value,
      transactionDate: date,
    };
    if (details.notes) {
      payload.description = details.notes;
    }
    if (details.amount) {
      payload.amount = details.amount;
    }

    api
      .put("/transaction/update", payload)
      .then((res) => {
        dispatch(LoadExpenses(dateFilter));
        dispatch(ClearExpenseModalData());
        dispatch(LoadBannerDetails(dateFilter));
        toast.info("Records updated successfully");
        setOpenAddModal(false);
      })
      .catch((error) => {
        toast.error(error.response.data.errors[0] || "Something went wrong");
        console.log(error, "error");
      });
  };

  const handleDelete = () => {
    const payload = {
      _id: details._id,
    };
    api
      .delete("/transaction/delete", { params: payload })
      .then((res) => {
        dispatch(LoadExpenses());
        dispatch(ClearExpenseModalData());
        setDeleteModal(false);
        setOpenAddModal(false);
        toast.warning("Records Deleted successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.messgae || "Something went wrong");
        setDeleteModal(true);
        setOpenAddModal(true);
      });
  };

  const customStyles = (mode) => ({
    control: (provided) => ({
      ...provided,
      backgroundColor: mode === "dark" ? "#1F2937" : "#FFFFFF", // gray-800 or white
      color: mode === "dark" ? "#F9FAFB" : "#111827", // light or dark text
      borderColor: mode === "dark" ? "#374151" : "#D1D5DB", // gray-600 or gray-300
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: mode === "dark" ? "#1F2937" : "#FFFFFF",
      // maxHeight: "200px",
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? mode === "dark"
          ? "#374151"
          : "#E5E7EB"
        : "transparent",
      height: "10px",
      color: mode === "dark" ? "#F9FAFB" : "#111827",
      "&:hover": {
        backgroundColor: mode === "dark" ? "#4B5563" : "#E0F2FE", // gray-600 / sky-100
        color: mode === "dark" ? "#FCD34D" : "#1E40AF", // yellow-300 / blue-900
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: mode === "dark" ? "#F9FAFB" : "#111827",
    }),
  });

  return (
    <div className="px-4">
      <div className=" gap-2 mt-4 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:p-0 sm:p-2">
        <div className="flex flex-col justify-start">
          <span className=" text-sm ">Category</span>
          <Select
            size={"small"}
            options={categoryOption}
            value={category}
            onChange={handleChange}
            className="react-select-container mt-2"
            styles={customStyles(mode)}
            menuPortalTarget={document.body}
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
            }}
          />
        </div>
        <div className="w-full flex flex-col justify-start">
          <span className=" text-sm ">Transaction Date</span>
          <input
            type="date"
            className=" p-2 border border-gray-300  rounded-sm mt-2 h-[38px] min-w-[200px] text-sm   "
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-start">
          <span className=" text-sm  ">Amount</span>
          <input
            type="number"
            className="p-2 border border-gray-300 rounded-sm h-[38px] mt-1 min-w-[200px] text-sm "
            placeholder="Add Amount"
            value={details.amount}
            name="amount"
            onChange={(e) => handleDetails(e)}
          />
        </div>
      </div>
      <div className=" grid-cols-1 mt-1">
        <span className=" text-sm  ">Notes</span>
        <textarea
          type="textArea"
          className="p-4 border border-gray-300 rounded-lg mt-1 h-16 w-[100%] text-sm "
          placeholder="Add Notes"
          name="notes"
          value={details.notes}
          onChange={(e) => handleDetails(e)}
        />
      </div>
      <div className=" flex items-center mb-2 ">
        <button
          onClick={
            expenseModal && expenseModal?._id ? handleUpdate : handleSubmit
          }
          className={`${
            expenseModal && expenseModal?._id ? "bg-blue-500" : "bg-red-500"
          } text-white pl-4 py-1 rounded-l-lg mt-4 w-full border border-gray-200 shadow-lg `}
        >
          {expenseModal && expenseModal?._id ? "Update Expense" : "Add Expense"}
        </button>
        {expenseModal && expenseModal?._id && (
          <button
            className="pl-10 py-[4px] mt-4 rounded-r-lg  text-center cursor-pointer w-[30%] bg-red-500"
            onClick={() => setDeleteModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        )}
      </div>

      {deleteModal && (
        <div className=" fixed flex justify-center items-center inset-0 z-index-60 bg-black/30 h-[44]">
          <div
            className={`${
              mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-[#FFFFFF]"
            }  min-h-40  min-w-[30%] rounded-lg`}
          >
            <div className=" flex justify-between">
              <h1 className=" font-semibold text-[20px] p-3">Confirmation !</h1>
              <button
                className=" pr-4 cursor-pointer"
                onClick={() => setDeleteModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#666666"
                >
                  <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                </svg>
              </button>
            </div>
            <div className=" h-[1px] bg-gray-200 width-[100%] " />
            <p className="p-4 ">
              Are you sure you want to delete this Expense ?{" "}
            </p>
            <div className=" h-[1px] bg-gray-200 width-[100%] mt-3" />
            <div className=" flex items-center justify-end gap-x-2  p-2">
              <button
                className=" bg-blue-400 p-1 px-3 rounded-lg mt-1"
                onClick={() => setDeleteModal(false)}
              >
                Close
              </button>
              <button
                className="bg-red-400 p-1 px-3 rounded-lg mt-1"
                onClick={() => handleDelete()}
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

export default ExpenseAdd;
