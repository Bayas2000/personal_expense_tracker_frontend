import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import rocket from "../../assets/target.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Line,
} from "recharts";
import Select from "react-select";
import CreateExpenseTargetModal from "./GoalsModal";
import { LoadGoalsDetails } from "../../Store/Goals";
import api from "../../api/api";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Legend } from "recharts";
import expenseImage from "../../assets/Expense_goals-Photoroom (1).png";
import { motion } from "framer-motion";
import { LoadRecurring } from "@/Store/Banner";
import AddRecurringExpenseModal from "./RecurringModal";

const Goals = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const monthOptions = [...Array(12)].map((_, i) => {
    const month = new Date(0, i).toLocaleString("default", { month: "long" });
    return { label: month, value: month };
  });

  const [selectedMonth, setSelectedMonth] = React.useState(
    monthOptions.find((m) => m.value === currentMonth)
  );

  useEffect(() => {
    dispatch(LoadGoalsDetails(selectedMonth?.label, currentYear));
    dispatch(LoadRecurring());
  }, [selectedMonth]);

  useEffect(() => {
    dispatch(LoadRecurring());
  }, []);

  const entry = useSelector((state) => state.goals?.goals_list);
  const recurring = useSelector((state) => state.banner);
  const { Recurring_List = [] } = recurring;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [recurringModalOpen, setRecurringModalOpen] = React.useState(false);

  const handleCreateTarget = (targetData) => {
    api
      .post("/budget/set-budget-amount", targetData)
      .then(() => {
        toast.success("Expense target added successfully");
        dispatch(LoadGoalsDetails(selectedMonth?.label, currentYear));
        setModalOpen(false);
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleAddRecurring = async (data) => {
    try {
      await api.post("/recurring/create", data);
      dispatch(LoadRecurring());
      toast.success("Recurring expense added successfully");
    } catch (err) {
      toast.error("Failed to add recurring expense");
    }
  };

  const limit = entry?.safeExpenseLimit ?? 0;
  const totalExpense =
    entry?.expense?.reduce((sum, e) => sum + e.amount, 0) ?? 0;

  const chartData =
    entry?.expense?.map((e) => {
      const day = new Date(e.transactionDate).getDate();
      const total = e.amount;
      return {
        date: `${day}`,
        total,
        green: Math.min(total, limit),
        red: total > limit ? total - limit : 0,
      };
    }) ?? [];

  const totalScheduled =
    Recurring_List.length > 0 &&
    Recurring_List.reduce((sum, item) => sum + item.amount, 0);

  const pieData = [
    { name: "Actual Expense", value: totalExpense },
    { name: "Recurring", value: totalScheduled },
    {
      name: "Remaining Budget",
      value: Math.max(
        0,
        (entry.expenseTargetAmount || 0) - totalExpense - totalScheduled
      ),
    },
  ];

  const COLORS = ["#3B82F6", "#FBBF24", "#10B981"];
  const COLORS2 = ["#FB923C", "#F87171", "#FCD34D"]; // orange, red, yellow
  return (
    <div className="px-4 py-4 max-w-screen-xl mx-auto w-full">
      <div
        className={`rounded-xl p-6 shadow-sm ${
          mode === "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2">
            <img className="h-7" src={rocket} alt="Target" />
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white"
            >
              Expense Goals
            </motion.h1>
          </div>
          {entry.length > 0 ||
            (entry?.expense && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center text-blue-600 hover:underline sm:text-lg text-sm"
              >
                Create Expense Target
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 512 512"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M368 128 L192 304 V368 H256 L432 192 Z" />
                  <path d="M352 64 H144 C117.5 64 96 85.5 96 112 v288 c0 26.5 21.5 48 48 48 h224 c26.5 0 48 -21.5 48 -48 V300" />
                </svg>
              </button>
            ))}
        </div>

        {/* Filter block above main content */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between justify-start sm:items-center items-start mb-4">
          {/* <h2 className="text-xl font-semibold">Overview</h2> */}
          <h2 className="sm:text-lg text-sm font-semibold">
            Expense Overview - {selectedMonth?.label}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Month:</span>
            <Select
              value={selectedMonth}
              onChange={(opt) => setSelectedMonth(opt)}
              options={monthOptions}
              className="w-[140px] text-sm"
            />
          </div>
        </div>

        {entry.expenseTargetAmount ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <SummaryCard
              title="Expense Target"
              value={`₹${entry.expenseTargetAmount}`}
              color="text-blue-600"
            />
            <SummaryCard
              title="Daily Limit"
              value={`₹${entry.safeExpenseLimit}`}
              color="text-green-600"
            />
            <SummaryCard
              title="Recurring Expense"
              value={`0`}
              color="text-yellow-500"
            />
            <SummaryCard
              title="Remaining Budget"
              value={`0`}
              color="text-purple-600"
            />
          </div>
        ) : (
          ""
        )}

        {entry && entry?.expense?.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500 mb-2 font-semibold flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"
                  ></path>
                </svg>
                This chart shows actual expenses recorded in{" "}
                {selectedMonth?.label}.
              </p>
            </div>
            <div className="h-[260px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap={8}>
                  <defs>
                    <linearGradient
                      id="greenGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#34D399" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#10B981"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                    <linearGradient
                      id="redGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#F87171" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#EF4444"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} width={35} />
                  <Tooltip
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div className="bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-200 text-sm">
                          <p className="text-gray-700 font-semibold">
                            Day {label}
                          </p>
                          <p>
                            Total:{" "}
                            <span className="text-gray-800 font-bold">
                              ₹{payload[0].payload.total}
                            </span>
                          </p>
                          <p className="text-green-600">
                            Within Limit: ₹{payload[0].payload.green}
                          </p>
                          <p className="text-red-500">
                            Over Limit: ₹{payload[0].payload.red}
                          </p>
                        </div>
                      ) : null
                    }
                  />

                  <ReferenceLine
                    y={limit}
                    stroke="#6366F1"
                    strokeDasharray="3 3"
                    label={{
                      value: `₹${limit} Daily Limit`,
                      position: "top",
                      fontSize: 10,
                      fill: "#6B7280",
                    }}
                  />

                  <Line
                    dataKey="total"
                    stroke="#FBBF24"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Bar
                    dataKey="green"
                    stackId="a"
                    fill="url(#greenGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={600}
                  />
                  <Bar
                    dataKey="red"
                    stackId="a"
                    fill="url(#redGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {entry && entry?.expense?.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-6 mt-3 ">
            <div className="lg:w-2/3 w-full">
              <div className="bg-white rounded-md shadow-md sm:h-[300px] h-[380px] pb-8  ">
                <h3 className="text-lg font-semibold px-4 pt-2 ">
                  Budget Distribution
                </h3>
                <div className="h-full sm:p-0 p-4 mb-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={40}
                        outerRadius={90}
                        paddingAngle={3}
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={60} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full bg-white border rounded-md shadow-md h-[300px] overflow-y-auto">
              <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-10 border-b">
                <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-lg whitespace-nowrap">📅</span>{" "}
                  Recurring
                </h3>
                <button
                  onClick={() => setRecurringModalOpen(true)}
                  className="flex items-center text-blue-600 hover:underline text-sm"
                >
                  Add
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 512 512"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M368 128 L192 304 V368 H256 L432 192 Z" />
                    <path d="M352 64 H144 C117.5 64 96 85.5 96 112 v288 c0 26.5 21.5 48 48 48 h224 c26.5 0 48 -21.5 48 -48 V300" />
                  </svg>
                </button>
              </div>

              <ul className="space-y-3 text-sm px-5 py-2">
                {Recurring_List.length > 0 &&
                  Recurring_List.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-all rounded-lg px-4 py-3 shadow-sm border border-gray-200"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item?.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Due: {item.dueDate}
                        </p>
                      </div>
                      <span className="text-blue-600 font-bold tracking-wide">
                        ₹{item.amount}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {entry && entry?.expense?.length === 0 && (
          <div className="flex flex-col justify-center items-center p-4 space-y-4">
            <img
              src={expenseImage}
              className="max-w-xl w-[100%]"
              alt="No expenses illustration"
            />
            <p className="text-lg text-gray-700 text-center font-bold">
              You have no expenses records for{" "}
              {selectedMonth && selectedMonth?.label}.
            </p>
            <p className="text-md text-gray-500 text-center font-semibold">
              Here you can set your expense goals and schedule your future
              expenses.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg border border-blue-300 hover:bg-blue-600 hover:text-white transition-colors duration-200 sm:text-lg text-sm"
            >
              Create Expense Target
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="18"
                viewBox="0 0 512 512"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M368 128 L192 304 V368 H256 L432 192 Z" />
                <path d="M352 64 H144 C117.5 64 96 85.5 96 112 v288 c0 26.5 21.5 48 48 48 h224 c26.5 0 48 -21.5 48 -48 V300" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {modalOpen && (
        <CreateExpenseTargetModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateTarget}
        />
      )}

      {recurringModalOpen && (
        <AddRecurringExpenseModal
          isOpen={recurringModalOpen}
          onClose={() => setRecurringModalOpen(false)}
          onSubmit={handleAddRecurring}
        />
      )}
    </div>
  );
};

const SummaryCard = ({ title, value, color }) => (
  <div className="bg-gray-100 rounded-lg p-4 shadow-sm text-center">
    <h4 className="text-gray-600 text-xs font-medium">{title}</h4>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
  </div>
);

export default Goals;
