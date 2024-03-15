import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  ExpenseItem: [],
  premium: false,
  totalExpeses: 0,
};

const ExpenseSlice = createSlice({
  name: "Expenses",
  initialState: initialExpensesState,
  reducers: {
    setExpense(state, action) {
      console.log(action.payload);
      state.ExpenseItem = action.payload;
    },
    addUpTotal(state, action) {
      console.log("this is function of add up to");
      console.log(state.totalExpeses);
      console.log(action.payload);
      state.totalExpeses += action.payload;
      if (state.totalExpeses > 10000) {
        state.premium = true;
        localStorage.setItem("premium", true);
      }
    },
  },
});

export const ExpenseActions = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
