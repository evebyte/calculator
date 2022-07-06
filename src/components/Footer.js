const Footer = () => {
	return (
		<footer className="w-full fixed bottom-0 text-center p-2">
			<p>
				made by<span> </span>
				<a
					href="https://github.com/evebyte"
					target="_blank"
					className="font-bold underline
					text-white/80 dark:text-black/80  
					hover:text-black/40 dark:hover:text-white/40
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
