import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	input: ["0"],
	prevInput: ["0"],
	operator: [],
	history: [],
	total: 0,
	prevTotal: 0,
	error: null,
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	reducers: {
		// todo: add ability to have negative numbers
		// bug: when you click 0.5 as the first input, it displays .5 in the history, fix this
		setInput: (state, action) => {
			// if input is 0 and the payload is 0, do nothing
			if (state.input.join() === "0" && action.payload === "0") {
				return;
			}
			// if the input is 0 and the payload is a decimal, push the decimal to the input
			else if (state.input.join() === "0" && action.payload === ".") {
				state.input.push(action.payload);
				state.history.push(action.payload);
			}
			// if input is 0 and the payload is not 0, replace input with payload
			else if (state.input.join() === "0" && action.payload !== "0") {
				state.input = [action.payload];
				state.history.push(action.payload);
			}
			// if the payload is a decimal, do nothing if it already exists
			else if (action.payload === ".") {
				if (!state.input.includes(".")) {
					state.input.push(action.payload);
					state.history.push(action.payload);
				}
			}
			// if the input is an operator, replace it with the payload
			else if (
				state.input.join() === state.operator.join() &&
				state.operator !== action.payload
			) {
				state.input = [action.payload];
				state.history.push(action.payload);
			}
			// default case, push the payload to the input
			else {
				state.input.push(action.payload);
				state.history.push(action.payload);
			}
		},
		setOperator: (state, action) => {
			// if the input is 0, do nothing
			if (state.input.join() === "0") {
				return;
			}
			// if the action payload is an operator that is already in the input, do nothing
			else if (state.operator === action.payload) {
				return;
			}
			// if the input is an operator, but the action payload is a different operator, replace the operator with the action payload
			else if (
				state.input === state.operator &&
				state.operator !== action.payload
			) {
				state.operator = action.payload;
				state.history.pop();
				state.history.push(action.payload);
			}
			// default case, set the operator
			else {
				state.operator.push(action.payload);
				state.history.push(action.payload);
				state.prevInput = state.input;
				state.input = state.operator;
			}
			//
		},
		calculate: (state, action) => {
			const input = state.input.join("");
			const prevInput = state.prevInput.join("");
			const operator = state.operator.join("");

			// calculate the total
			if (operator === "+") {
				state.total = parseFloat(prevInput) + parseFloat(state.input);
			} else if (operator === "-") {
				state.total = parseFloat(prevInput) - parseFloat(input);
			} else if (operator === "*") {
				state.total = parseFloat(prevInput) * parseFloat(input);
			} else if (operator === "/") {
				state.total = parseFloat(prevInput) / parseFloat(input);
			} else {
				return;
			}

			state.history.push("=", state.total); // add to history
			state.input = state.total; // set total

			// todo: add ability to calculate multiple times using the same operator and previous total
		},
		clear: (state) => {
			state.input = ["0"];
			state.prevInput = ["0"];
			state.operator = [];
			state.history = [];
			state.total = 0;
			state.error = null;
		},
	},
});

export const { setInput, setOperator, calculate, clear } =
	calculatorSlice.actions;

export const selectInput = (state) => state.calculator.input;
export const selectOperator = (state) => state.calculator.operator;
export const selectHistory = (state) => state.calculator.history;
export const selectTotal = (state) => state.calculator.total;

export default calculatorSlice.reducer;
