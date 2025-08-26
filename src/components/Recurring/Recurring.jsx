import React, { useEffect } from "react";
import { LoaderCircle, RepeatIcon } from "lucide-react";
import { EditRecurring, ListRecurring, LoadRecurring } from "@/Store/Banner";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Recurring = ({ setOpenRecurringModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadRecurring());
  }, [dispatch]);

  const recurring = useSelector((state) => state.banner);
  const { Recurring_List = [], Recurring_Loading } = recurring;

  const handleCardClick = (data) => {
    dispatch(EditRecurring(data));
    setOpenRecurringModal(true);
  };

  return (
    <div className="w-full px-4 py-6">
      {Recurring_Loading ? (
        <div className="flex justify-center items-center min-h-60">
          <LoaderCircle className="animate-spin w-8 h-8 text-blue-500" />
        </div>
      ) : Recurring_List?.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Recurring_List.filter((fil) => fil.isActive === true).map((data) => (
            <div
              key={data._id}
              onClick={() => handleCardClick(data)}
              className="bg-white p-3 rounded-md shadow-sm border-l-4 border-blue-700 hover:scale-[1.01] transition-transform duration-200 cursor-pointer min-h-[80px]"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                    <RepeatIcon className="w-4 h-4 text-blue-700" />
                    {data?.title}
                  </h2>
                  {data?.notes && (
                    <p className="text-xs text-gray-500 mt-[2px] truncate">
                      {data?.notes}
                    </p>
                  )}
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-[2px] rounded-full whitespace-nowrap">
                  -${data?.amount}
                </span>
              </div>
              <div className="mt-1 text-right text-[10px] text-gray-400">
                Due:{" "}
                {data?.dueDate
                  ? moment(data.dueDate).format("MMM DD, YYYY")
                  : "--"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white min-h-60 m-4 mt-6 shadow-md rounded-xl flex flex-col justify-center items-center p-6 text-center">
          <div className="mb-4">
            <RepeatIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-gray-700 text-lg font-semibold mb-1">
            No Recurring Expenses
          </h3>
          <p className="text-gray-500 max-w-xs">
            Start adding your recurring expenses like monthly subscriptions or
            bills to track them easily.
          </p>
        </div>
      )}
    </div>
  );
};

export default Recurring;
