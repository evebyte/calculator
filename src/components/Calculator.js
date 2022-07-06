import Display from "./Display";
import Keys from "./Keys";

const Calculator = () => {
	return (
		<div
			id="calculator"
			className=" w-11/12 md:w-6/12 lg:w-5/12 mx-auto my-0 rounded-lg shadow-lg"
		>
			<Display />
			<Keys />
		</div>
	);
};

export default Calculator;
