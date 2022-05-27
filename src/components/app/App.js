import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import PlanetInfo from '../planetInfo/PlanetInfo';
import PlanetList from '../planetList/PlanetList';

class App extends Component {
	state = {
		selectedPlanet: null,
		selectedResident: null,
	};

	onPlanetSelected = (name, resi) => {
		this.setState({
			selectedPlanet: name,
			selectedResident: resi
		});
	};

	render() {
		return (
			<div className="app">
				<AppHeader />
				<main>
					<div className="planet__content">
						<PlanetList onPlanetSelected={this.onPlanetSelected} />
						<PlanetInfo planetName={this.state.selectedPlanet} residentUrl={ this.state.selectedResident}/>
					</div>
				</main>
			</div>
		);
	}
}

export default App;

