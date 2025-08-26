import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const Groups = createSlice({
  name: "Groups",
  initialState: {
    groups_list: [],
    group_view_list: [],
    investment_list: [],
    records_list: [],
  },
  reducers: {
    ListGroups: (state, action) => {
      state.groups_list = action.payload;
    },
    ListGroupDetailsView: (state, action) => {
      state.group_view_list = action.payload;
    },
    InvestmentList: (state, action) => {
      state.investment_list = action.payload;
    },
    GroupsRecordsList: (state, action) => {
      state.records_list = action.payload;
    },
  },
});

export const {
  ListGroups,
  ListGroupDetailsView,
  InvestmentList,
  GroupsRecordsList,
} = Groups.actions;

export const ListGroupsDetails = () => async (dispatch) => {
  try {
    const response = await api.get("/group/get-all-data");

    dispatch(ListGroups(response.data.data));
  } catch (error) {
    throw new Error();
  }
};
export const ListInvestmentDetails = () => async (dispatch) => {
  try {
    const response = await api.get("/investment/get-all-data");

    dispatch(InvestmentList(response.data.data));
  } catch (error) {
    throw new Error();
  }
};

export const ListGroupRecords = (groupId) => async (dispatch) => {
  try {
    const payload = {
      groupId: groupId,
    };
    const response = await api.get("/group/group-overview", {
      params: payload,
    });
    dispatch(GroupsRecordsList(response.data.data));
  } catch (error) {
    throw new Error();
  }
};

export default Groups.reducer;
