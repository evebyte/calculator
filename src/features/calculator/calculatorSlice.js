import { createSlice } from "@reduxjs/toolkit";

// Initial state of the calculator
const initialState = {
	input: "0", // The current input value (string)
	currentOperation: null, // The current operation (+, -, *, /) or null if no operation is set
	prevValue: null, // The previous input value stored when an operator is set (number)
	displayValue: "0", // The value currently displayed on the calculator (string)
	afterEqual: false, // A flag to indicate if the calculator is in a state just after the equals button has been pressed
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	reducers: {
		// Appends a number (or decimal point) to the current input
		appendNumber: (state, action) => {
			const number = action.payload;

			// If the previous operation was "=", reset the displayValue and input
			if (state.afterEqual) {
				state.displayValue = number;
				state.input = number;
				state.afterEqual = false;
			} else if (state.input === "0" && number !== "0") {
				// If the current input is "0" and the input number is not "0", update the displayValue and input
				state.displayValue = number;
				state.input = number;
			} else if (state.input === "0" && number === "0") {
				// If the current input is "0" and the input number is "0", do nothing
			} else if (number !== ".") {
				// If the input number is not a decimal point, append it to the displayValue and input
				state.displayValue += number;
				state.input += number;
			} else if (!state.input.includes(".")) {
				// If the input number is a decimal point and the current input doesn't have one, append it to the displayValue and input
				state.displayValue += ".";
				state.input += ".";
			}
		},
		// Sets the current operator and updates the prevValue if necessary
		setOperator: (state, action) => {
			const operator = action.payload;

			// If the input is an operator, replace it with the new operator
			if (
				state.input === "+" ||
				state.input === "-" ||
				state.input === "*" ||
				state.input === "/"
			) {
				state.displayValue = operator;
				state.input = operator;
				state.currentOperation = operator;
				return;
			}

			// Handle negative numbers
			if (operator === "-" && state.input === "0") {
				state.displayValue = "-";
				state.input = "-";
				return;
			}

			// Calculate the result if the previous operation was not "="
			if (!state.afterEqual) {
				if (state.prevValue === null) {
					// If prevValue is null, store the current input value as a number
					state.prevValue = parseFloat(state.input);
				} else if (state.currentOperation) {
					// If there is a current operation, calculate the result using prevValue, input and the current operation
					state.prevValue = calculateValue(
						state.prevValue,
						parseFloat(state.input),
						state.currentOperation
					);
				}
			}

			// Update the state after setting a new operator
			state.afterEqual = false;
			state.displayValue = operator;
			state.input = "0";
			state.currentOperation = operator;
		},
		// Calculates and updates the displayValue based on the current input, prevValue and currentOperation
		calculate: (state) => {
			if (state.prevValue !== null && state.currentOperation) {
				const currentValue = parseFloat(state.input);

				// Calculate the result using prevValue, input and currentOperation
				state.prevValue = calculateValue(
					state.prevValue,
					currentValue,
					state.currentOperation
				);

				// Update the displayValue and reset input, afterEqual and currentOperation
				state.displayValue = roundValue(state.prevValue).toString();
				state.input = "0";
				state.afterEqual = true;
				state.currentOperation = null;
			}
		},
		// Resets the calculator state to the initial state
		clear: (state) => {
			state.input = "0";
			state.currentOperation = null;
			state.prevValue = null;
			state.displayValue = "0";
			state.afterEqual = false;
		},
	},
});

// Helper function to perform a calculation with two numbers and an operator
function calculateValue(num1, num2, operator) {
	switch (operator) {
		case "+":
			return num1 + num2;
		case "-":
			return num1 - num2;
		case "*":
			return num1 * num2;
		case "/":
			return num1 / num2;
		default:
			return num1;
	}
}

// Helper function to round a number to a fixed decimal place (4 decimal places by default)
function roundValue(value, decimalPlaces = 4) {
	return parseFloat(value.toFixed(decimalPlaces));
}

export const { appendNumber, setOperator, calculate, clear } =
	calculatorSlice.actions;

export const selectDisplayValue = (state) => state.calculator.displayValue;

export default calculatorSlice.reducer;
