import React from "react";
import api from "../api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Store/AuthSlice";
import useLogout from "./custom_hooks/useLogout";
import { ArrowLeft, Mail, Calendar, UserCircle } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";

const Profile = () => {
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useLogout();

  const [profile, setProfile] = React.useState({
    userName: "",
    emailId: "",
    profileImage: "",
    createdAt: "",
  });
  const [showPreview, setShowPreview] = React.useState(false);

  React.useEffect(() => {
    api
      .get("/userAuth/get-user")
      .then((res) => {
        const response = res.data.data;
        setProfile(response);
        dispatch(getUserData(response));
      })
      .catch((error) => console.log(error));
  }, []);

  const containerStyle =
    mode === "dark" ? "bg-[#f5f6fa] text-[#2D3A45]" : "bg-white";
      
   return (
  <div className="max-w-4xl mx-auto px-4 py-8">
    {/* Profile Card */}
    <div
      className={`rounded-2xl shadow-md ${containerStyle} transition-all duration-300`}
    >
      {/* Header inside Card */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-black"
        >
          My Profile
        </motion.h1>
      </div>

      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 px-6 pt-6">
        {profile.profileImage ? (
          <img
            className="w-20 h-20 object-cover border border-blue-400 bg-blue-300 rounded-full cursor-pointer hover:scale-105 transition-transform"
            src={profile?.profileImage}
            alt="Profile"
            onClick={() => setShowPreview(true)}
          />
        ) : (
          <UserCircle className="w-20 h-20 text-gray-400" />
        )}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{profile.userName}</h2>
          <div className="flex items-center justify-center sm:justify-start text-sm text-gray-500 mt-1">
            <Mail className="w-4 h-4 mr-2" />
            <span>{profile.emailId}</span>
          </div>
        </div>
      </div>

      {/* Other Info + Logout */}
      <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex items-center gap-3">
          <Calendar className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="text-base font-medium">
              {profile.createdAt
                ? moment(profile.createdAt).format("MMM DD, YYYY")
                : "-"}
            </p>
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <button
            onClick={logout}
            className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200 shadow-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>

    {/* Image Preview */}
    {showPreview && (
      <Lightbox
        open={showPreview}
        close={() => setShowPreview(false)}
        slides={[{ src: profile?.profileImage }]}
      />
    )}
  </div>
);


};

export default Profile;
