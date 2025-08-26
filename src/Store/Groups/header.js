import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const GroupHeader = createSlice({
  name: "GroupHeader",
  initialState: {
    notification_list: [],
    notification_animate: false,
  },
  reducers: {
    ListNotification: (state, action) => {
      state.notification_list = action.payload;
    },
    NotificationAnimate: (state, action) => {
      state.notification_animate = action.payload;
    },
  },
});

export const { ListNotification, NotificationAnimate } = GroupHeader.actions;

export const ListNotificationDetails = (month, year) => async (dispatch) => {
  try {
    const response = await api.get("/groupMember/get-notifications");
    dispatch(ListNotification(response.data));
  } catch (error) {
    throw new Error();
  }
};

export default GroupHeader.reducer;
