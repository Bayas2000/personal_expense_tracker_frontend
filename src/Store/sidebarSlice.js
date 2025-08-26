import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice = createSlice({
  name: "Sidebar",
  initialState: {
    sidebarToggle: "home",
    groupSidebarToggle: false,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebarToggle = action.payload;
    },
    groupSidebar: (state, action) => {
      state.groupSidebarToggle = action.payload;
    },
  },
});

export const { toggleSidebar, groupSidebar } = SideBarSlice.actions;

export default SideBarSlice.reducer;
