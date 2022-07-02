import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	input: 0,
	operator: null,
	history: [],
	total: 0,
	error: null,
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions

	// Redux Toolkit allows us to write "mutating" logic in reducers. It
	// doesn't actually mutate the state because it uses the Immer library,
	// which detects changes to a "draft state" and produces a brand new
	// immutable state based off those changes

	// Use the PayloadAction type to declare the contents of `action.payload`
	reducers: {
		setInput: (state, action) => {
			// todo: add rules for input (e.g. cannot equal 00)
			state.input = action.payload; // set input
			state.history.push(action.payload); // add to history
		},
		setOperator: (state, action) => {
			// todo: add rules for input (e.g. cannot equal ++, --, **, // )
			state.operator = action.payload; // set operator
			state.input = action.payload; // update display
			state.history.push(action.payload); // add to history
		},
		calculate: (state, action) => {
			// todo: calculate total and store in total
			state.history.push("=", state.total); // add to history
			state.input = state.total; // set total
		},
		clear: (state) => {
			state.total = 0;
			state.input = 0;
			state.operator = null;
			state.history = [];
			state.error = null;
		},
	},
});

export const { setInput, setOperator, calculate, clear } =
	calculatorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectInput = (state) => state.calculator.input;
export const selectOperator = (state) => state.calculator.operator;
export const selectHistory = (state) => state.calculator.history;
export const selectTotal = (state) => state.calculator.total;

export default calculatorSlice.reducer;
