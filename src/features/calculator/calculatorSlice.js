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
		setInput: (state, action) => {
			// if input is 0 and the payload is 0 and there has been no history, push the 0 to the history
			if (
				action.payload === "0" &&
				state.input.join("") === "0" &&
				state.history.length === 0
			) {
				state.history.push(action.payload);
				return;
			}
			// if the input is 0 and the payload is 0, do nothing
			else if (action.payload === "0" && state.input.join("") === "0") {
				return;
			}
			// if the input is a decimal
			else if (action.payload === ".") {
				// if the input already has a decimal, do nothing
				if (!state.input.includes(".")) {
					state.input.push(action.payload);
					state.history.push(action.payload);
				}
			}
			// if the payload is not 0 and the input is 0, replace input with payload
			else if (action.payload !== "0" && state.input.join() === "0") {
				state.input = [action.payload];
				state.history.push(action.payload);
			}
			// if the input is an operator, replace it with the payload
			else if (
				state.input.join() === state.operator.join() &&
				state.operator !== action.payload
			) {
				state.input = [action.payload];
				state.history.push(action.payload);
			}
			// todo: add ability to make negative numbers
			// ...
			// else if (state.input === "-" && state.history.includes(/[+-/*]/g)) {
			// 	state.input.push(action.payload);
			// 	state.history.push(action.payload);
			// }

			// default case, push the payload to the input
			else {
				state.input.push(action.payload);
				state.history.push(action.payload);
			}
		},
		setOperator: (state, action) => {
			// if the input is 0, do nothing
			if (state.input.join() === "0" && action.payload !== "-") {
				return;
			}
			// if the action payload is an operator that is already in the input, do nothing
			else if (
				state.operator.join("") === action.payload &&
				state.operator.join("") !== "-"
			) {
				return;
			}
			// if the input is an operator, but the action payload is a different operator, replace the operator with the action payload
			else if (
				state.input.join("") === state.operator.join("") &&
				state.operator !== action.payload
			) {
				state.operator = [action.payload];
				state.input = [action.payload];
				state.history.pop();
				state.history.push(action.payload);
			}
			// todo: add ability to create a negative number
			// //  If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign).
			// else if (action.payload === "-") {
			// 	state.operator = [action.payload];
			// 	state.input = [action.payload];
			// }

			// todo: add ability to do consectutive calculations like 4 + 8 - 6 * 3 / 2 = 3

			// if you calculate a total and then click an operator, it should use the previous total as the previous input
			else if (state.prevTotal !== 0 && state.history.includes("=")) {
				state.prevInput = [`${state.prevTotal}`];
				state.history = [state.prevInput, action.payload];
				state.operator.push(action.payload);
				state.input = [action.payload];
			}
			// default case, set the operator
			else {
				state.operator = [action.payload];
				state.history.push(action.payload);
				state.prevInput = [state.input.join("")];
				state.history = [state.input.join(""), action.payload];
				state.input = state.operator;
			}
		},
		calculate: (state) => {
			const input = state.input.join("");
			const prevInput = state.prevInput.join("");
			const operator = state.operator.join("");

			// calculate the total
			if (operator === "+") {
				state.total = parseFloat(prevInput) + parseFloat(input);
			} else if (operator === "-") {
				state.total = parseFloat(prevInput) - parseFloat(input);
			} else if (operator === "*") {
				state.total = parseFloat(prevInput) * parseFloat(input);
			} else if (operator === "/") {
				state.total = parseFloat(prevInput) / parseFloat(input);
			} else {
				return;
			}

			state.history = [prevInput, operator, input, "=", `${state.total}`];
			// state.history.push("=", state.total); // add to history
			state.input = [`${state.total}`]; // set total

			state.operator = [];
			state.prevTotal = state.total;
			state.total = 0;
		},
		clear: (state) => {
			state.input = ["0"];
			state.prevInput = ["0"];
			state.operator = [];
			state.history = [];
			state.total = 0;
			state.prevTotal = 0;
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
