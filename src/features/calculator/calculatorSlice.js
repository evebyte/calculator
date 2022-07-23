import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	input: ["0"],
	prevInput: [],
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
		// todo: refactor for readability by using easy to read names for conditions + switch statements
		setInput: (state, action) => {
			// when the input is empty and you want to add a 0 to the history
			if (
				action.payload === "0" &&
				state.input.join("") === "0" &&
				state.history.length === 0
			) {
				state.history.push(action.payload);
				return;
			}

			//  prevent repeating 0's before a decimal
			else if (action.payload === "0" && state.input.join("") === "0") {
				return;
			}

			// prevents repeating decimals
			else if (action.payload === ".") {
				// if the input already has a decimal, do nothing
				if (!state.input.includes(".")) {
					state.input.push(action.payload);
					state.history.push(action.payload);
				}
			}

			// todo: make negative numbers possible
			// else if (
			// 	state.input[0] === "-" &&
			// 	action.payload !== "0" &&
			// 	state.operator !== []
			// ) {
			// 	state.input.push(action.payload);
			// 	state.input.join("");
			// 	state.history.push(action.payload);
			// }

			// prevents 05, would display as 5
			else if (action.payload !== "0" && state.input.join() === "0") {
				state.history.pop();
				state.input = [action.payload];
				state.history.push(action.payload);
			}

			// when the input is an operator (except -), replace it with a number
			else if (
				state.input.join() === state.operator.join() &&
				state.operator !== "-"
			) {
				state.input = [action.payload];
				state.history.push(action.payload);
			}

			// push the payload to the input
			else {
				state.input.push(action.payload);
				state.history.push(action.payload);
			}
		},
		setOperator: (state, action) => {
			// prevents operators from being added to the input if the input is empty
			if (state.input.join() === "0" && state.history.length === 0) {
				return;
			}

			// prevents repeat operators like ++, //, or **
			else if (
				state.input.join("") === action.payload &&
				action.payload !== "-"
			) {
				return;
			}

			// If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign.
			else if (
				state.operator.join("") === state.input.join("") &&
				action.payload !== "-"
			) {
				state.operator = [action.payload];
				state.input = [action.payload];
				state.history.pop();
				state.history.push(action.payload);
			}

			// todo: allows you to make negative numbers
			// else if (action.payload === "-" && !state.history.includes("-")) {
			// 	state.input = [action.payload];
			// 	state.history.push(action.payload);
			// }

			// for consectutive calculations using immediate calculation logic: like 3 + 5 * 6 - 2 / 4 = 11.5
			else if (
				state.history.length >= 2 &&
				state.prevInput.length !== 0 &&
				state.operator.length !== 0
			) {
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

				state.history = [`${state.total}${action.payload}`];
				state.input = [action.payload];
				state.operator = [action.payload];

				state.prevInput = [state.total];
				state.prevTotal = state.total;
				state.total = 0;
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
			state.prevInput = [];
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
