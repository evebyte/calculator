/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/**/*.{js,jsx}",
		"./src/components/**/*.{js,jsx}",
		"./public/index.html",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"primary-light": "",
				"primary-dark": "",
				"secondary-light": "",
				"secondary-dark": "",
			},
		},
	},
	plugins: [],
};
