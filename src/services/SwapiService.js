class SwapiService {
	_apiBase = 'https://swapi.dev/api/';
	// _apiKey = 'apikey=a3f3e1bb52e9dfbb1dcd77116fe51560';

	getResourse = async (url) => {
		let res = await fetch(url);
		// console.log(res);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}

		return await res.json();
	};

	getAllPlanets = async () => {
		const res = await this.getResourse(`${this._apiBase}planets/`);
		return res.results.map(this._transformPlanet);
	};
	getPlanet = async (name) => {
		const res = await this.getResourse(`${this._apiBase}planets/1`);
		// return this._transformPlanet(res.results.name);
		return this._transformPlanet(res);
	};

	getAllResidents = async () => {
		const res = await this.getResourse(`${this._apiBase}people/`);
		return res.results.map(this._transformResident);
	};

	getResident = async () => {
		const res = await this.getResourse(`${this._apiBase}people/1`);
		// console.log(res);
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

	_transformPlanet = (planet) => {
		return {
			// id: planet.id,
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
