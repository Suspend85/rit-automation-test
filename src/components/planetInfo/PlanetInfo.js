import { Component } from 'react';

import SwapiService from '../../services/SwapiService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './planetInfo.scss';

class PlanetInfo extends Component {
	state = {
		planet: null,
		resident: null,
		loading: false,
		error: false,
	};

	swapiService = new SwapiService();

	componentDidMount() {
		this.updatePlanet();
	}

	componentDidUpdate(prevProps) {
		if (this.props.planetName !== prevProps.planetName) {
			this.updatePlanet();
			// this.updateResident();
		}
	}

	updatePlanet = () => {
		const { planetName } = this.props;
		if (!planetName) {
			return;
		}

		this.onPlanetLoading();

		this.swapiService.getPlanet(planetName).then(this.onPlanetLoaded).catch(this.onError);
		// this.swapiService.getAllResidents().then(this.onPlanetLoaded).catch(this.onError);
	};

	// updateResident = () => {
	// 	const { resident } = this.props;
	// 	if (!resident) {
	// 		return;
	// 	}
	// 	this.onPlanetLoading();
	// 	this.swapiService.getResident(resident).then(this.onPlanetLoaded).catch(this.onError);
	// };

	onPlanetLoading = () => {
		this.setState({
			loading: true,
		});
	};

	onPlanetLoaded = (planet) => {
		this.setState({ planet, loading: false, error: false });
		// console.log(resident);
	};

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		});
	};

	render() {
		const { planet, loading, error } = this.state;

		const skeleton = planet || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !planet) ? <View planet={planet} /> : null;

		return (
			<div className="planet__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		);
	}
}

const View = ({ planet }) => {
	const { name, created, climate, residents, population } = planet;

	return (
		<>
			<div className="planet__basics">
				<div>
					<div className="planet__info-name">{name}</div>
				</div>
			</div>
			<div className="planet__descr"> {population} </div>
			<div> {created}</div>
			<div> {climate}</div>
			<div className="planet__residents">Residents:</div>
			<ul className="planet__residents-list">
				{/* {residents.length === 0 ? 'there is no residents on this planet' : null} */}
				{residents.map((item, i) => {
					// console.log(item);
					return (
						<li	className="planet__residents-item" key={i}>{residents[i]}</li>
					);
				})}
			</ul>
		</>
	);
};

export default PlanetInfo;

