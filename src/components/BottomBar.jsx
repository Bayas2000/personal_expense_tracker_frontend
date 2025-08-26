import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Store/sidebarSlice";
import "react-toastify/dist/ReactToastify.css";

const BottomBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.sidebar?.sidebarToggle);
  const mode = useSelector((state) => state.theme.mode);

  return (
    <nav className="w-[100%] zIndex-60">
      <ul
        className={`${
          mode == "dark" ? "bg-[#f5f6fa]" : "bg-white"
        } grid grid-cols-5 items-center  p-3 shadow-lg`}
      >
        <li
          className={`flex items-center flex-col  text-[12px] cursor-pointer 
             ${state === "home" ? "text-blue-800" : ""}
            hover:text-blue-600 hover:scale-105  rounded-md`}
          onClick={() => dispatch(toggleSidebar("home"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${state == "home" ? "blue" : "currentColor"}`}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-house-icon"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span className={`${state == "home" && "text-blue-800"} `}>Home</span>
        </li>
        <li
          className={`flex items-center flex-col  text-[12px] cursor-pointer 
            ${state === "stats" ? "text-blue-800" : ""}
           hover:text-blue-600 hover:scale-105  rounded-md`}
          onClick={() => {
            dispatch(toggleSidebar("stats"));
            notify();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${state == "stats" ? "blue" : "currentColor"}`}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chart-no-axes-column-increasing-icon"
          >
            <line x1="12" x2="12" y1="20" y2="10"></line>
            <line x1="18" x2="18" y1="20" y2="4"></line>
            <line x1="6" x2="6" y1="20" y2="16"></line>
          </svg>
          <span className={`${state == "stats" && "text-blue-800"} `}>
            Stats
          </span>
        </li>{" "}
         <li
          className={`flex items-center flex-col  text-[12px] cursor-pointer 
             ${state === "goals" ? "text-blue-800" : ""}
            hover:text-blue-600 hover:scale-105  rounded-md`}
          onClick={() => dispatch(toggleSidebar("goals"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${state === "goals" ? "blue" : "currentColor"}`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-goal-icon"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
          <span className={`${state === "goals" && "text-blue-800"} `}>
            Goals
          </span>
        </li>
        <li
          className={`flex items-center flex-col  text-[12px] cursor-pointer 
            ${state === "profile" ? "text-blue-800" : ""}
           hover:text-blue-600 hover:scale-105  rounded-md`}
          onClick={() => dispatch(toggleSidebar("profile"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${state == "profile" ? "blue" : "currentColor"}`}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user-icon"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className={`${state == "profile" && "text-blue-800"} `}>
            Profile
          </span>
        </li>{" "}
        <li
          className={`flex items-center flex-col  text-[12px] cursor-pointer 
            ${state === "setting" ? "text-blue-800" : ""}
           hover:text-blue-600 hover:scale-105  rounded-md`}
          onClick={() => dispatch(toggleSidebar("setting"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${state == "setting" ? "blue" : "currentColor"}`}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-settings-icon"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span className={`${state == "setting" && "text-blue-800"} `}>
            Setting
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default BottomBar;
