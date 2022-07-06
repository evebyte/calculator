// react-redux
import { useSelector } from "react-redux";
import {
	selectTotal,
	selectInput,
	selectHistory,
} from "../features/calculator/calculatorSlice";

const Display = () => {
	const history = useSelector(selectHistory);
	const input = useSelector(selectInput);

	return (
		<div
			id=""
			className="
            bg-white/40 dark:bg-black/30
            rounded-t-lg 
            p-2
            text-4xl text-right
            "
		>
			<p id="history" className="text-black/50 dark:text-white/50">
				{history}
			</p>
			<p id="display" className="">
				{input}
			</p>
		</div>
	);
};

export default Display;
