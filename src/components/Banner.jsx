import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { DateFilter, LoadBannerDetails } from "../Store/Banner";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const bannerState = useSelector((state) => state.banner?.banner_list);
  const mode = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [days, setDays] = React.useState({
    value: "thisMonth",
    label: "This Month",
  });
  const [pageRender, setPageRender] = React.useState(false);

  useEffect(() => {
    if (days) {
      const filter = days.value;
      dispatch(LoadBannerDetails(filter));
      dispatch(DateFilter(filter));
      setPageRender(!pageRender);
    }
  }, [days]);

  const [bannerData, setBannerDetails] = React.useState({
    myEarnings: "",
    myExpenses: "",
    balance: "",
  });

  useEffect(() => {
    if (bannerState) {
      setBannerDetails(bannerState);
    }
  }, [bannerState]);

  const daysOption = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "thisWeek", label: "This Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "thisYear", label: "This Year" },
  ];

  return (
    <div className="relative max-w-6xl mx-auto px-4 pt-6">
      {/* Header + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          

          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xl md:text-2xl font-bold tracking-tight ${
              mode === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Financial Summary
          </motion.h1>

          <Select
            className="w-fit min-w-[140px] ml-auto"
            value={days}
            onChange={(opt) => setDays(opt)}
            options={daysOption}
            isSearchable={false}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => (
                <ChevronDown className="text-gray-500 w-4 h-4 mr-2" />
              ),
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: mode === "dark" ? "#1f2937" : "#f3f4f6",
                borderColor: state.isFocused ? "#3b82f6" : "transparent",
                boxShadow: "none",
                padding: "2px 6px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                minHeight: "32px",
                cursor: "pointer",
              }),
              singleValue: (base) => ({
                ...base,
                color: mode === "dark" ? "#e5e7eb" : "#111827",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                zIndex: 20,
              }),
            }}
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-2 scrollbar-hide">
        {[
          {
            label: `${days?.label} Earnings`,
            value: bannerData?.myEarnings,
            color: "green",
            icon: (
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.105 0-2 .672-2 1.5s.895 1.5 2 1.5 2-.672 2-1.5-.895-1.5-2-1.5z M12 13v2m8 2a9.956 9.956 0 01-6 1.944A9.956 9.956 0 014 17V7a9.956 9.956 0 016-1.944A9.956 9.956 0 0120 7v10z"
                />
              </svg>
            ),
          },
          {
            label: `${days?.label} Expenses`,
            value: bannerData?.myExpenses,
            color: "red",
            icon: (
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9z"
                />
              </svg>
            ),
          },
          {
            label: `Balance`,
            value: bannerData?.balance,
            color: "blue",
            icon: (
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ),
          },
        ].map(({ label, value, color, icon }, idx) => (
          <div
            key={idx}
            className={`min-w-[220px] md:min-w-0 ${
              mode === "dark" ? "bg-[#f5f6fa] text-[#2D3A45]" : "bg-white/70"
            } border ${
              color === "green"
                ? "border-green-200"
                : color === "red"
                ? "border-red-200"
                : "border-blue-200"
            } shadow-lg rounded-xl p-4 flex justify-between items-center`}
          >
            <div>
              <p
                className={`text-sm ${
                  mode === "dark" ? "text-black" : "text-gray-500"
                }`}
              >
                {label}
              </p>
              <p className={`text-2xl font-bold text-${color}-600`}>
                {value ?? 0}
              </p>
            </div>
            <div className="p-2 rounded-full bg-white shadow hidden md:block">
              {icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
