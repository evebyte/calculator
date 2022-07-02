// react-redux
import { useSelector, useDispatch } from "react-redux";
import {
	setInput,
	setOperator,
	calculate,
	clear,
} from "../features/calculator/calculatorSlice";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faMinus,
	faXmark,
	faDivide,
} from "@fortawesome/free-solid-svg-icons";

const Keys = () => {
	const dispatch = useDispatch();

	// todo: add handle key press

	return (
		<div id="keys" className="grid grid-cols-4 grid-rows-5 gap-3">
			{[
				// parameters: id, keyText, keycode, onClick, className

				// row 1
				[
					"add",
					<FontAwesomeIcon icon={faPlus} />,
					"187",
					() => dispatch(setOperator("+")),
					"bg-green-300 dark:bg-green-900",
				],
				[
					"subtract",
					<FontAwesomeIcon icon={faMinus} />,
					"189",
					() => dispatch(setOperator("-")),
					"bg-green-300 dark:bg-green-900",
				],
				[
					"multiply",
					<FontAwesomeIcon icon={faXmark} />,
					"188",
					() => dispatch(setOperator("*")),
					"bg-green-300 dark:bg-green-900",
				],
				[
					"divide",
					<FontAwesomeIcon icon={faDivide} />,
					"191",
					() => dispatch(setOperator("/")),
					"bg-green-300 dark:bg-green-900",
				],

				// row 2
				["one", "1", "49", () => dispatch(setInput("1"))],
				["two", "2", "50", () => dispatch(setInput("2"))],
				["three", "3", "51", () => dispatch(setInput("3"))],
				[
					"equals",
					"=",
					"13",
					() => dispatch(calculate()),
					"row-span-4 bg-orange-500 dark:bg-orange-900",
				],

				// row 3
				["four", "4", "52", () => dispatch(setInput("4"))],
				["five", "5", "53", () => dispatch(setInput("5"))],
				["six", "6", "54", () => dispatch(setInput("6"))],

				// row 4
				["seven", "7", "55", () => dispatch(setInput("7"))],
				["eight", "8", "56", () => dispatch(setInput("8"))],
				["nine", "9", "57", () => dispatch(setInput("9"))],

				// row 5
				["decimal", ".", "190", () => dispatch(setInput("."))],
				["zero", "0", "48", () => dispatch(setInput("0"))],
				// todo: if no input, display CE, else display AC
				["clear", "AC", "8", () => dispatch(clear())],
			].map(([id, keyText, keycode, onClick, className]) => (
				<button
					id={id}
					keycode={keycode}
					onClick={onClick}
					className={`key rounded-lg p-3 text-xl
                            bg-white/50 dark:bg-black/50 
                            hover:opacity-50 
                            text-black dark:text-white 
                            hover:text-black dark:hover:text-white
                            active:scale-90 font-bold select-none
							${className} 
                        `}
				>
					{keyText}
				</button>
			))}
		</div>
	);
};

export default Keys;
