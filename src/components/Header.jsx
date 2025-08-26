import React, { useEffect } from "react";
import expense from "../assets/expense4.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeButton";
import { FaUserCircle } from "react-icons/fa";
import { getUserData } from "../Store/AuthSlice";
import api from "../api/api";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.Auth);
  const { UserLoggedIn, UserData } = isLoggedIn;
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!UserLoggedIn) {
  //     navigate("/login");
  //   } else {
  //     navigate("/ForPersonHome");
  //   }
  // }, [UserLoggedIn]);

  React.useEffect(() => {
    api
      .get("/userAuth/get-user")
      .then((res) => {
        const response = res.data.data;
        dispatch(getUserData(response));
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  return (
    <header
      className={`${
        mode === "dark" ? "bg-[#f5f6fa] text-black" : "bg-[#1D2730] text-white"
      } flex justify-between items-center shadow-md px-4 py-3 sticky top-0 z-50`}
    >
      <div className="flex items-center gap-3">
        <img className="w-10 h-10" src={expense} alt="Logo" />
        <h1 className="text-2xl font-semibold">INVESTMATE</h1>
      </div>

      <div className="flex items-center gap-4">
        {UserLoggedIn && UserData?.userName && (
          <div className="flex items-center gap-2">
            {UserData.profileImage ? 
            <img className='w-5 h-5 border-1 object-cover border-blue-400 bg-blue-300 rounded-full' src={UserData?.profileImage} /> : 
            <FaUserCircle size={20} />
            }
            
            <span className="text-md">{UserData.userName}</span>
          </div>
        )}

        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
