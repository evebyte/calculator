const Footer = () => {
	return (
		<footer className="w-full fixed bottom-0 text-center p-2">
			<p>
				made by <span> </span>
				<a
					href="https://github.com/evebyte"
					target="_blank"
					className="font-bold underline
					text-rose-300 dark:text-rose-500  
					hover:text-emerald-400 dark:hover:text-emerald-400
                    hover:scale-110 active:scale-90
					"
					rel="noopener noreferrer"
				>
					eve
				</a>
			</p>
		</footer>
	);
};

export default Footer;
