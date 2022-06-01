import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import SwapiService from '../../services/SwapiService';

import './planetInfo.scss';

class PlanetInfo extends Component {
	state = {
		planet: null,
		charList: [],
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
			this.updateResident();
		}
	}

	updatePlanet = () => {
		const { planetName } = this.props;
		if (!planetName) {
			return;
		}

		this.onPlanetLoading();

		this.swapiService.getPlanet(planetName).then(this.onPlanetLoaded).catch(this.onError);
	};

	updateResident = (urls) => {
		this.state.charList.map(async (urls) => {
			const response = await fetch(urls);
			const data = await response.json();
			this.setState({
				charList: data,
			});
		});
	};

	onPlanetLoading = () => {
		this.setState({
			loading: true,
		});
	};

	onPlanetLoaded = (planet) => {
		this.setState({ planet, loading: false, error: false });
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
	const { name, created, climate, diameter, gravity, orbitalPeriod, rotationPeriod, population, residents, terrain, surfaceWater } =
		planet;

	const formatDate = new Date(created).toLocaleString();

	const formatNumber = (num) => {
		return isNaN(num) ? 'unknown' : new Intl.NumberFormat('ru-RU').format(num);
	};

	return (
		<>
			<div className="planet__basics">
				<div>
					<div className="planet__info-name">{name}</div>
				</div>
			</div>
			<div className="planet__descr">
				<div>
					<span>Created: </span> {formatDate}
				</div>
				<div>
					<span>Climate: </span> {climate}
				</div>
				<div>
					<span>Diameter: </span> {formatNumber(diameter)}
				</div>
				<div>
					<span>Gravity: </span>
					{gravity === 'N/A' ? 'unknown' : gravity}
				</div>
				<div>
					<span>Rotation period: </span>
					{rotationPeriod}
				</div>
				<div>
					<span>Orbital period: </span> {orbitalPeriod}
				</div>
				<div>
					<span>Population: </span> {formatNumber(population)}
				</div>
				<div>
					<span>Terrain: </span> {terrain}
				</div>
				<div>
					<span>Surface Water: </span>
					{surfaceWater}
				</div>
			</div>

			<div className="planet__residents">Residents:</div>
			<ul className="planet__residents-list">
				{residents.length === 0 ? 'there are no residents on this planet' : null}
				{residents.map((item, i) => {
					return (
						<li className="planet__residents-item" key={i}>
							<a href={item} target="_blank" rel="noreferrer">
								{item}
							</a>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default PlanetInfo;
