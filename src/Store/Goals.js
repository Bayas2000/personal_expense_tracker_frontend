import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const GoalsSlice = createSlice({
  name: "GoalsSlice",
  initialState: {
    goals_list: [],
  },
  reducers: {
    ListGoals: (state, action) => {
      state.goals_list = action.payload;
    },
  },
});

export const { ListGoals } = GoalsSlice.actions;

export const LoadGoalsDetails = (month, year) => async (dispatch) => {
  const payload = {
    month: month,
    year: year,
  };
  try {
    const response = await api.get("/transaction/goals_graph", {
      params: payload,
    });
    dispatch(ListGoals(response.data.data));
  } catch (error) {
    throw new Error();
  }
};

export default GoalsSlice.reducer;
