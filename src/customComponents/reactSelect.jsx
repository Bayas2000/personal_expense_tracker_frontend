import React from "react";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";

// Custom Option
export const CustomOption = (props) => {
  const { data, innerRef, innerProps } = props;
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center gap-2 px-3 py-2   cursor-pointer text-black
        ${
          mode == "dark"
            ? "hover:bg-gray-100 hover:text-black text-white"
            : "hover:bg-gray-100"
        }
        `}
    >
      {data.icon && <img className=" w-4 h-4 object-cover" src={data.icon} />}
      <span>{data.label}</span>
    </div>
  );
};

// Custom Single Value (selected item)
export const CustomSingleValue = (props) => {
  const { data } = props;

  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {data.icon && <img className=" w-5 h-5 object-cover" src={data.icon} />}
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};
