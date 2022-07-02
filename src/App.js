// react
import React from "react";

// components
import Header from "./components/Header";
import Calculator from "./components/Calculator";
import Footer from "./components/Footer";

// css
import "./App.css";

function App() {
	return (
		<div className="App">
			<Header />
			<Calculator />
			<Footer />
		</div>
	);
}

export default App;
