import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
import SwapiService from './services/SwapiService';

// const swapiModule = new SwapiModule();
// console.log(swapiModule.getPlanets());
const swapiService = new SwapiService();
// swapiService.getAllCharacters().then((res) => res.data.results.forEach(item => console.log(item.name)));
// swapiService.getAllPlanets().then((res) => console.log('getAllPlanets',res));
// swapiService.getPlanet().then((res) => console.log('getPlanet', res));
// swapiService.getAllResidents().then((res) => console.log('getAllResidents', res));
// swapi.get('https://swapi.dev/api/people/?page=2').then((result) => {console.log(result)});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

