import Display from "./Display";
import Keys from "./Keys";

const Calculator = () => {
	return (
		<div
			id="calculator"
			className=" w-5/6 md:w-3/6 lg:w-2/6 mx-auto my-0 rounded-lg shadow-lg"
		>
			<Display />
			<Keys />
		</div>
	);
};

export default Calculator;
