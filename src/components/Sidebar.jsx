// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleSidebar } from "../Store/sidebarSlice";

// const Sidebar = () => {
//   const dispatch = useDispatch();

//   const state = useSelector((state) => state.sidebar?.sidebarToggle);
//   const mode = useSelector((state) => state.theme.mode);

//   return (
//     <nav className="">
//       <ul
//         className={`flex flex-col justify-center items-center gap-y-4 w-14 bg-[#2D3A45] text-[#E1E1E1]  p-8 px-10 rounded-lg shadow-md
//         transition-all duration-300 ease-in-out
//         ${
//           mode == "dark" ? "bg-[#2D3A45] text-[#E1E1E1]" : "bg-white text-black"
//         }
//          `}
//       >
//         <li
//           className={`group flex items-center flex-col text-[12px] cursor-pointer transition-all duration-200 ease-in-out
//             ${state === "home" ? "text-blue-800" : ""}
//             hover:text-blue-600 hover:scale-105 hover:bg-gray-200  p-2 rounded-md`}
//           onClick={() => dispatch(toggleSidebar("home"))}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke={`${state == "home" ? "blue" : "currentColor"}`}
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             class="lucide lucide-house-icon"
//           >
//             <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
//             <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//           </svg>
//           <span className={`${state == "home" && "text-blue-800"} `}>Home</span>
//         </li>
//         <li
//           className={`group flex items-center flex-col text-[12px] cursor-pointer transition-all duration-200 ease-in-out
//             ${state === "stats" ? "text-blue-800" : ""}
//             hover:text-blue-600 hover:scale-105 hover:bg-gray-200 p-2 rounded-md`}
//           onClick={() => dispatch(toggleSidebar("stats"))}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke={`${state == "stats" ? "blue" : "currentColor"}`}
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             class="lucide lucide-chart-no-axes-column-increasing-icon"
//           >
//             <line x1="12" x2="12" y1="20" y2="10"></line>
//             <line x1="18" x2="18" y1="20" y2="4"></line>
//             <line x1="6" x2="6" y1="20" y2="16"></line>
//           </svg>
//           <span className={`${state == "stats" && "text-blue-800"} `}>
//             Stats
//           </span>
//         </li>{" "}
//         <li
//           className={`group flex items-center flex-col text-[12px] cursor-pointer transition-all duration-200 ease-in-out
//     ${state === "goals" ? "text-blue-800" : ""}
//     hover:text-blue-600 hover:scale-105 hover:bg-gray-200 p-2 rounded-md`}
//           onClick={() => dispatch(toggleSidebar("goals"))}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke={`${state === "goals" ? "blue" : "currentColor"}`}
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-goal-icon"
//           >
//             <circle cx="12" cy="12" r="10"></circle>
//             <circle cx="12" cy="12" r="6"></circle>
//             <circle cx="12" cy="12" r="2"></circle>
//           </svg>
//           <span className={`${state === "goals" && "text-blue-800"} `}>
//             Goals
//           </span>
//         </li>
//         <li
//           className={`group flex items-center flex-col text-[12px] cursor-pointer transition-all duration-200 ease-in-out
//           ${state === "profile" ? "text-blue-800" : ""}
//           hover:text-blue-600 hover:scale-105 hover:bg-gray-200  p-2 rounded-md`}
//           onClick={() => dispatch(toggleSidebar("profile"))}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke={`${state == "profile" ? "blue" : "currentColor"}`}
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             class="lucide lucide-user-icon"
//           >
//             <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </svg>
//           <span className={`${state == "profile" && "text-blue-800"} `}>
//             Profile
//           </span>
//         </li>{" "}
//         <li
//           className={`group flex items-center flex-col text-[12px] cursor-pointer transition-all duration-200 ease-in-out
//           ${state === "setting" ? "text-blue-800" : ""}
//           hover:text-blue-600 hover:scale-105 hover:bg-gray-200 p-2 rounded-md`}
//           onClick={() => dispatch(toggleSidebar("setting"))}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke={`${state == "setting" ? "blue" : "currentColor"}`}
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             class="lucide lucide-settings-icon"
//           >
//             <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
//             <circle cx="12" cy="12" r="3"></circle>
//           </svg>
//           <span className={`${state == "setting" && "text-blue-800"} `}>
//             Setting
//           </span>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Store/sidebarSlice";
import { Home, BarChart, Target, User, Settings } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.sidebar?.sidebarToggle);
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  const sidebarLinks = [
    { key: "home", label: "Home", icon: Home },
    { key: "stats", label: "Stats", icon: BarChart },
    { key: "goals", label: "Goals", icon: Target },
    { key: "profile", label: "Profile", icon: User },
    { key: "setting", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`h-screen fixed top-0 w-56 bg-white shadow-lg  p-4 transition-all
    ${isDark ? "bg-[#2D3A45] text-white" : "bg-white text-gray-900"}`}
    >
      {/* App Branding */}
      <div className="flex items-center gap-3 mb-4 px-2">
        <div>
          <h1 className="text-gray-700 text-xl sm:text-2xl font-bold">
            INVESTMATE
          </h1>
          <p className="text-[8px] sm:text-[9px] text-gray-500 -mt-1 ml-[2px] font-medium">
            Start small. Think big. Grow together.
          </p>
        </div>
      </div>

      <hr
        className={`border-t my-2 ${
          isDark ? "border-gray-600" : "border-gray-200"
        }`}
      />

      <nav className="flex flex-col gap-2 mt-2">
        {sidebarLinks.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => dispatch(toggleSidebar(key))}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-all
          ${
            activeTab === key
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100 text-gray-600"
          }
          ${isDark && activeTab === key && "bg-blue-800 text-white"}
        `}
          >
            <Icon
              className={`w-5 h-5 ${
                activeTab === key ? "stroke-blue-600" : "stroke-current"
              }`}
            />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
