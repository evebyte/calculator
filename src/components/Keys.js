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
	faSun,
	faMoon,
} from "@fortawesome/free-solid-svg-icons";

// dark mode
import useDarkMode from "../hooks/useDarkMode";

const Keys = () => {
	const dispatch = useDispatch();

	// todo: add handle key press

	const [darkTheme, setDarkTheme] = useDarkMode();
	const handleTheme = () => setDarkTheme(!darkTheme);

	const darkModeIcon = darkTheme ? (
		<FontAwesomeIcon icon={faSun} />
	) : (
		<FontAwesomeIcon icon={faMoon} />
	);

	return (
		<div id="keys" className="grid grid-cols-4 grid-rows-5">
			{[
				// parameters: id, keyText, keycode, onClick, className

				// row 1
				[
					"add",
					<FontAwesomeIcon icon={faPlus} />,
					"187",
					() => dispatch(setOperator("+")),
					"!bg-black/20 dark:!bg-white/20",
				],
				[
					"subtract",
					<FontAwesomeIcon icon={faMinus} />,
					"189",
					() => dispatch(setOperator("-")),
					"!bg-black/20 dark:!bg-white/20",
				],
				[
					"multiply",
					<FontAwesomeIcon icon={faXmark} />,
					"188",
					() => dispatch(setOperator("*")),
					"!bg-black/20 dark:!bg-white/20",
				],
				[
					"divide",
					<FontAwesomeIcon icon={faDivide} />,
					"191",
					() => dispatch(setOperator("/")),
					"!bg-black/20 dark:!bg-white/20",
				],

				// row 2
				["seven", "7", "55", () => dispatch(setInput("7")), ""],
				["eight", "8", "56", () => dispatch(setInput("8")), ""],
				["nine", "9", "57", () => dispatch(setInput("9")), ""],
				[
					"equals",
					"=",
					"13",
					() => dispatch(calculate()),
					"row-span-3 !bg-black/30 dark:!bg-white/30",
				],

				// row 3
				["four", "4", "52", () => dispatch(setInput("4")), ""],
				["five", "5", "53", () => dispatch(setInput("5")), ""],
				["six", "6", "54", () => dispatch(setInput("6")), ""],

				// row 4

				["one", "1", "49", () => dispatch(setInput("1")), ""],
				["two", "2", "50", () => dispatch(setInput("2")), ""],
				["three", "3", "51", () => dispatch(setInput("3")), ""],

				// row 5
				[
					"darkmode",
					darkModeIcon,
					"84",
					handleTheme,
					"rounded-bl-lg !bg-black/20 dark:!bg-white/20",
				],
				["zero", "0", "48", () => dispatch(setInput("0")), ""],
				["decimal", ".", "190", () => dispatch(setInput(".")), ""],
				// todo: if no input, display CE, else display AC
				[
					"clear",
					"AC",
					"8",
					() => dispatch(clear()),
					"rounded-br-lg !bg-black/20 dark:!bg-white/20",
				],
			].map(([id, keyText, keycode, onClick, className]) => (
				<button
					id={id}
					keycode={keycode}
					onClick={onClick}
					className={`key p-3 text-xl font-bold
						
                            bg-white/30 dark:bg-black/20 

                            hover:opacity-50 

                            text-black dark:text-white 
                            hover:text-black dark:hover:text-white
                            active:scale-90 
							select-none
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
