import './appHeader.scss';

const AppHeader = () => {
	return (
		<header className="app__header">
			<h1 className="app__title">
				<a href="https://swapi.dev/" target="_blank" rel="noreferrer">
					<span>STAR WARS</span> information portal
				</a>
			</h1>
			<nav className="app__menu">
				<ul>
					<li>
						<a href="https://swapi.dev/api/people/" target="_blank" rel="noreferrer">
							Characters
						</a>
					</li>
					/
					<li>
						<a href="https://swapi.dev/api/planets/" target="_blank" rel="noreferrer">
							Planets
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;
