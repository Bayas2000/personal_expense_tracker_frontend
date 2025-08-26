import React from "react";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { ListIncomeModalData, LoadIncome } from "../Store/Banner";
import moment from "moment";

const Income = ({ setOpenAddModal, setActiveTab }) => {
  const dateFilter = useSelector((state) => state.banner?.date_Filter);
  const IncomeState = useSelector((state) => state.banner?.Income_List);
  const mode = useSelector((state) => state.theme.mode);

  const [income, setIncome] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (dateFilter) {
      dispatch(LoadIncome(dateFilter));
    }
  }, [dateFilter]);

  React.useEffect(() => {
    if (IncomeState) {
      setIncome(IncomeState);
    }
  }, [IncomeState]);

  return (
    <div className=" w-[93%] lg:w-[45%] md:w-[40%] sm:w-[40%] m-4 ">
      <div className="flex ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2dd50b"
        >
          <path d="M440-320h80v-168l64 64 56-56-160-160-160 160 56 56 64-64v168Zm40 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
        <span className=" font-semibold ml-2">Income</span>
      </div>
      <div className=" grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-x-6 ">
        {income?.length > 0 &&
          income.map((data) => (
            <div
              key={data._id}
              className={` ${
                mode == "dark" ? "bg-[#2A3A47] text-[#F1F1F1]" : "bg-white"
              }   h-16 mt-4 p-4 lg:min-w-[230px] min-w-[180px]
              flex items-center gap-2 rounded-md shadow-md cursor-pointer
                 hover:scale-105 transform-gpu transition duration-300 ease-out 
                   border-l-4 border-green-800`}
              onClick={() => {
                dispatch(ListIncomeModalData(data));
                setOpenAddModal(true);
                setActiveTab("income");
              }}
            >
              <div className="bg-green-100 p-2 rounded-full">
                <img
                  alt="category"
                  className=" w-8 "
                  src={data?.categoryIcon}
                />
              </div>
              <div className="w-[100%]">
                <div className="flex justify-between items-center">
                  <h2 className=" font-semibold text-[14px]">
                    {data?.categoryName}
                  </h2>
                  {/* <span className=" text-sm text-green-700 font-semibold">
                    {" "}
                    +${data.amount}
                  </span> */}
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    +${data?.amount}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-[1px]">
                  <p className=" text-[12px]">{`${data?.description || ""}`}</p>
                  <p className=" text-[11px] text-gray-400">{`${
                    data.transactionDate
                      ? moment(data?.transactionDate).format("MMM DD")
                      : ""
                  }`}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Income;
