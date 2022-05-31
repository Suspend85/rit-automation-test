import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import PlanetInfo from '../planetInfo/PlanetInfo';
import PlanetList from '../planetList/PlanetList';

class App extends Component {
	state = {
		selectedPlanet: null,
	};

	onPlanetSelected = (name) => {
		this.setState({
			selectedPlanet: name,
		});
	};

	render() {
		return (
			<div className="app">
				<AppHeader />
				<main>
					<div className="planet__content">
						<PlanetList
							onPlanetSelected={this.onPlanetSelected}
						/>
						<PlanetInfo
							planetName={this.state.selectedPlanet}
						/>
					</div>
				</main>
			</div>
		);
	}
}

export default App;

