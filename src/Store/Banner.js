import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const BannerSlice = createSlice({
  name: "Banner",
  initialState: {
    banner_list: [],
    date_Filter: null,
    Expense_List: [],
    Income_List: [],
    Expense_Modal_List: [],
    Income_Modal_List: [],
    Recurring_List: [],
    Recurring_Edit_List: [],
    Recurring_Loading: false,
  },
  reducers: {
    Listbanner: (state, action) => {
      state.banner_list = action.payload;
    },
    DateFilter: (state, action) => {
      state.date_Filter = action.payload;
    },
    ListExpense: (state, action) => {
      state.Expense_List = action.payload;
    },
    ListExpenseModalData: (state, action) => {
      state.Expense_Modal_List = action.payload;
    },
    ClearExpenseModalData: (state) => {
      state.Expense_Modal_List = [];
    },
    ListIncome: (state, action) => {
      state.Income_List = action.payload;
    },
    ListRecurring: (state, action) => {
      state.Recurring_List = action.payload;
    },
    EditRecurring: (state, action) => {
      state.Recurring_Edit_List = action.payload;
    },
    ListIncomeModalData: (state, action) => {
      state.Income_Modal_List = action.payload;
    },
    ClearIncomeModalData: (state, action) => {
      state.Income_Modal_List = [];
    },
    ClearRecurringModalData: (state, action) => {
      state.Recurring_Edit_List = [];
    },
    SetRecurringLoading: (state, action) => {
      state.Recurring_Loading = action.payload;
    },
  },
});

export const {
  Listbanner,
  DateFilter,
  ListExpense,
  ListIncome,
  ListExpenseModalData,
  ListIncomeModalData,
  ClearExpenseModalData,
  ClearIncomeModalData,
  ListRecurring,
  ClearRecurringModalData,
  EditRecurring,
  SetRecurringLoading,
} = BannerSlice.actions;

export const LoadBannerDetails = (searchValue) => async (dispatch) => {
  const payload = {
    dateFilter: searchValue,
  };
  try {
    const response = await api.get("/transaction/transaction-history", {
      params: payload,
    });
    dispatch(Listbanner(response.data.data));
  } catch (error) {
    throw new Error();
  }
};

export const LoadExpenses = (searchValue) => async (dispatch) => {
  const payload = {
    dateFilter: searchValue,
  };
  try {
    const response = await api.get("/transaction/get-all-data", {
      params: payload,
    });
    const data = response.data.data.filter((data) => data.type == "Expense");
    dispatch(ListExpense(data));
  } catch (error) {
    throw new Error();
  }
};

export const LoadIncome = (searchValue) => async (dispatch) => {
  const payload = {
    dateFilter: searchValue,
  };
  try {
    const response = await api.get("/transaction/get-all-data", {
      params: payload,
    });
    const data = response.data.data.filter((data) => data.type == "Income");
    dispatch(ListIncome(data));
  } catch (error) {
    throw new Error();
  }
};

export const LoadRecurring = () => async (dispatch) => {
  try {
    dispatch(SetRecurringLoading(true));
    const response = await api.get("/recurring/get-all-data");
    const data = response.data.data;
    dispatch(ListRecurring(data));
  } catch (error) {
    throw new Error();
  } finally {
    dispatch(SetRecurringLoading(false));
  }
};

export default BannerSlice.reducer;
