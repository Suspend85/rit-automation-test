import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import SwapiService from '../../services/SwapiService';

import './planetList.scss';

class PlanetList extends Component {
	state = {
		planetList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		planetPage: 1,
		planetEnded: false,
		onScroll: false,
	};

	swapiService = new SwapiService();

	componentDidMount() {
		this.onPlanetsRequest();
		window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	}

	getPageBottom = () => {
		if (document.body.scrollHeight <= window.innerHeight + document.documentElement.scrollTop) {
			if (this.state.planetEnded) {
				window.removeEventListener('scroll', this.getPageBottom);
			} else {
				this.onPlanetsRequest(this.state.planetPage);
			}
		}
	};

	onPlanetsRequest = (planetPage) => {
		this.onPlanetListLoading();
		this.swapiService.getAllPlanets(planetPage).then(this.onPlanetListLoaded).catch(this.onError);
	};

	onPlanetListLoading = () => {
		this.setState({
			newItemLoading: true,
		});
	};

	onPlanetListLoaded = (newPlanetList) => {
		let ended = false;
		if (this.state.planetPage >= 6) {
			ended = true;
		}

		this.setState(({ planetPage, planetList }) => ({
			planetList: [...planetList, ...newPlanetList],
			loading: false,
			newItemLoading: false,
			planetPage: planetPage + 1,
			planetEnded: ended,
		}));
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	formatNumber = (num) => {
		return isNaN(num) ? 'unknown' : new Intl.NumberFormat('ru-RU').format(num);
	};

	renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li className="planet__item" key={item.name} onClick={() => this.props.onPlanetSelected(i + 1)}>
					<div className="planet__name">
						{i + 1} - {item.name}
					</div>
					<p>
						<span>Created: </span>
						{new Date(item.created).toLocaleString()}
					</p>
					<p>
						<span>Climate: </span>
						{item.climate}
					</p>
					<p>
						<span>Diameter: </span>
						{this.formatNumber(item.diameter)}
					</p>
					<p>
						<span>Gravity: </span>
						{item.gravity === 'N/A' ? 'unknown' : item.gravity}
					</p>
					<p>
						<span>Orbital period: </span>
						{item.orbitalPeriod}
					</p>
					<p>
						<span>Population: </span>
						{this.formatNumber(item.population)}
					</p>
					<p>
						<span>Terrain: </span>
						{item.terrain}
					</p>
					<p>
						{' '}
						<span>Residents count: </span>
						{item.residents.length}
					</p>
				</li>
			);
		});
		return <ul className="planet__grid">{items}</ul>;
	}

	render() {
		const { planetList, error, loading, newItemLoading, planetPage, planetEnded } = this.state;

		const items = this.renderItems(planetList);

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="planet__list">
				{errorMessage}
				{spinner}
				{content}

				<button
					className="button button__main button__long"
					disabled={newItemLoading}
					style={{ display: planetEnded ? 'none' : 'inline-block' }}
					onClick={() => this.onPlanetsRequest(planetPage)}>
					<div className="inner">Load more</div>
				</button>
			</div>
		);
	}
}

export default PlanetList;
