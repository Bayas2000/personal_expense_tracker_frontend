import React from "react";
import Banner from "./Banner";
import Expenses from "./Expenses";
import Income from "./Income";
import ExpenseModal from "./ExpenseModal";
import AddIcon from "../assets/addIcon.png";
import useIsLargeScreen from "./hooks/useLargeScreen";
import { useDispatch, useSelector } from "react-redux";
import MonthlyExpenseOverview from "./monthlyExpense/MonthlyExpenseOverview";
import Recurring from "./Recurring/Recurring";
import RecurringModal from "./Recurring/RecurringModal";
import { ClearRecurringModalData, LoadRecurring } from "@/Store/Banner";
import api from "@/api/api";
import AddRecurringExpenseModal from "./goals/RecurringModal";
import { toast } from "react-toastify";

const Content = () => {
  const dateFilter = useSelector((state) => state.banner?.date_Filter);

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openRecurringModal, setOpenRecurringModal] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("expense");
  const [activeButton, setActiveButton] = React.useState("daily");
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(LoadRecurring());
  }, []);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dateFilter]);

  const isLargeScreen = useIsLargeScreen();

  const handleAddRecurring = async (data) => {
    try {
      await api.post("/recurring/create", data);
      dispatch(LoadRecurring());
      toast.success("Recurring expense added successfully");
    } catch (err) {
      toast.error("Failed to add recurring expense ", err);
      console.log(err, "err");
    }
  };

  return (
    <div className={`relative`}>
      <div className="">
        <Banner />
      </div>

      <div className="flex justify-center items-center w-full pt-4 px-4 gap-0">
        <button
          onClick={() => {
            setActiveButton("daily");
            setOpenRecurringModal(false);
          }}
          className={`sm:w-56  w-[100%] py-2 px-4 font-semibold text-sm rounded-l-full border border-gray-300 
      transition-all duration-200 focus:outline-none 
      ${
        activeButton === "daily"
          ? "bg-blue-500 text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
        >
          Daily
        </button>
        <button
          onClick={() => {
            setActiveButton("recurring");
            // setOpenRecurringModal(true);
          }}
          className={`sm:w-56  w-[100%] py-2 px-4 font-semibold text-sm rounded-r-full border border-gray-300 border-l-0
      transition-all duration-200 focus:outline-none 
      ${
        activeButton === "recurring"
          ? "bg-blue-500 text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
        >
          Recurring
        </button>
      </div>

      {loading == true ? (
        <div className="flex justify-center items-center w-full h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid" />
        </div>
      ) : activeButton === "daily" ? (
        <div className=" flex gap-x-2 lg:flex-row md:flex-row sm:flex-row  flex-col ml-2">
          <Expenses
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            setActiveTab={setActiveTab}
          />
          <Income
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            setActiveTab={setActiveTab}
          />
        </div>
      ) : (
        <Recurring setOpenRecurringModal={setOpenRecurringModal} />
      )}

      <div
        className="fixed lg:bottom-6 md:bottom-20 sm:bottom-22 bottom-25 right-6 z-50 cursor-pointer"
        onClick={() => {
          if (activeButton == "daily") {
            setOpenAddModal(!openAddModal);
            setActiveTab("expense");
          } else if (activeButton == "recurring") {
            setOpenRecurringModal(true);
            dispatch(ClearRecurringModalData());
          }
        }}
      >
        <img
          className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 "
          src={AddIcon}
          alt="Add Icon"
        />
      </div>

      {openAddModal && !openRecurringModal && (
        <div className="position-fixed  top-15 left-[16%] absolute ">
          <ExpenseModal
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {openRecurringModal && (
        <div className="position-fixed  top-15 left-[16%] absolute ">
          <AddRecurringExpenseModal
            isOpen={openRecurringModal}
            onClose={() => {
              setOpenRecurringModal(false);
              dispatch(LoadRecurring());
            }}
            onSubmit={handleAddRecurring}
          />
        </div>
      )}
    </div>
  );
};

export default Content;
