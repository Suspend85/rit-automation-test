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
	};

	swapilService = new SwapiService();

	componentDidMount() {
		this.swapilService.getAllPlanets().then(this.onPlanetListLoaded).catch(this.onError);
	}

	onPlanetListLoaded = (planetList) => {
		this.setState({ planetList, loading: false });
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	renderItems(arr) {
		const items = arr.map((item) => {
			return (
				<li className="planet__item" key={item.name} onClick={() => this.props.onPlanetSelected(item.name)}>
					{/* <img src={item.thumbnail} alt={item.name} /> */}
					{/* <div className="planet__name">{item.name}</div> */}
					<div className="planet__name">{item.name}</div>
					<p><span>Created: </span>{new Date(item.created).toLocaleString()}</p>
					<p><span>Climate: </span>{item.climate}</p>
					<p><span>Diameter: </span>{ new Intl.NumberFormat('ru-RU').format(item.diameter)}</p>
					<p><span>Gravity: </span>{item.gravity}</p>
					<p><span>Orbital period: </span>{item.orbitalPeriod}</p>
					<p><span>Population: </span>{isNaN(item.population) ? 'unknown' : new Intl.NumberFormat('ru-RU').format(item.population)} </p>
					<p><span>Terrain: </span>{ item.terrain}</p>
				</li>
			);
		});
		return <ul className="planet__grid">{items}</ul>;
	}

	render() {
		const { planetList, error, loading } = this.state;
		const items = this.renderItems(planetList);
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="planet__list">
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default PlanetList;
