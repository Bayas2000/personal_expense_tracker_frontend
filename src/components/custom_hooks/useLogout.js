import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import api from "../../api/api";
import { persistor } from "../../Store/store";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../Store/AuthSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useCallback(async () => {
    try {
      await api.post("/userAuth/logout");
      await persistor.purge();
      dispatch(clearUserData());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [navigate]);

  return logout;
};

export default useLogout;
