import nextId from 'react-id-generator';

class SwapiService {
	_apiBase = 'https://swapi.dev/api/';

	// асинхронный запрос для получения объекта.
	getResourse = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}
		return await res.json();
	};

	// получаем кол-во планет.
	getPlanetsCount = async () => {
		const res = await this.getResourse(`${this._apiBase}planets/`);
		return res.count;
	};
	
	//получаем объект с планетами постранично.
	getAllPlanets = async (page = 1) => {
		const res = await this.getResourse(`${this._apiBase}planets/?page=${page}`);
		return res.results.map(this._transformPlanet);
	};

	// получаем 1 планету по определенному номеру (id)
	getPlanet = async (id) => {
		const res = await this.getResourse(`${this._apiBase}planets/${id}`);
		return this._transformPlanet(res);
	};
	
	// для будущей реализации. получаем всех жителей планеты.
	getAllResidents = async () => {
		const res = await this.getResourse(`${this._apiBase}people/`);
		return res.results.map(this._transformResident);
	};

	// для будущей реализации. получаем 1го жителя.
	getResident = async (id) => {
		const res = await this.getResourse(`${this._apiBase}people/${id}`);
		return this._transformResident(res);
	};

	_transformResident = (resident) => {
		return {
			name: resident.name,
			height: resident.height,
			mass: resident.mass,
			hairColor: resident.hair_color,
			skinColor: resident.skin_color,
			eyeColor: resident.eye_color,
			birthYear: resident.birth_year,
			gender: resident.gender,
			homeWorld: resident.homeworld,
		};
	};

	// преобразуем данные из полученного объекта.
	_transformPlanet = (planet) => {
		return {
			name: planet.name,
			climate: planet.climate,
			created: planet.created,
			diameter: planet.diameter,
			edited: planet.edited,
			films: planet.films,
			gravity: planet.gravity,
			orbitalPeriod: planet.orbital_period,
			population: planet.population,
			residents: planet.residents,
			rotationPeriod: planet.rotation_period,
			surfaceWater: planet.surface_water,
			terrain: planet.terrain,
			url: planet.url,
		};
	};
}

export default SwapiService;
