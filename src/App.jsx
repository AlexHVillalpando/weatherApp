import { useState, useEffect } from 'react';
import axios from 'axios';
import conditionCodes from './utils/conditionCodes.js';
import url from './utils/URL.js';
import key from './key.js';
import {
	thunderstormSvg,
	drizzleSvg,
	rainSvg,
	snowSvg,
	atmosphereSvg,
	clearSvg,
	cloudSvg,
} from './assets/images/index.js';

import Card from './components/Card.jsx';

const initialState = {
	latitude: 0,
	longitude: 0,
};

const icons = {
	thunderstorm: thunderstormSvg,
	drizzle: drizzleSvg,
	rain: rainSvg,
	snow: snowSvg,
	atmosphere: atmosphereSvg,
	clear: clearSvg,
	clouds: cloudSvg,
};

let errorL = '';

function App() {
	const [coords, setCoords] = useState(initialState);
	const [weather, setWeather] = useState({});
	const [toggle, setToggle] = useState(true);
	const [errorAPI, setErrorAPI] = useState(null);
	const [isLoaded, setIsLoaded] = useState(true);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setCoords({ latitude, longitude }); //desestructuramos
			},
			(error) => {
				errorL = `${error.message}. Showing weather at 0°00'00"N 0°00'00"E.`;
				console.log(error.message);
			},
		);
	}, []);
	console.log(coords.latitude, coords.longitude);

	useEffect(() => {
		setIsLoaded(false);
		if (coords) {
			axios
				.get(
					`${url}lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`,
				)
				.then((res) => {
					console.log(res); //imprimimos en consola para ver la estructura de la respuesta res
					const keys = Object.keys(conditionCodes);

					const iconName = keys.find((key) =>
						conditionCodes[key].includes(res.data?.weather[0]?.id),
					);
					setWeather({
						city: res.data?.name,
						country: res.data?.sys?.country,
						icon: icons[iconName],
						main: res.data?.weather[0]?.main,
						wind: res.data?.wind?.speed,
						clouds: res.data?.clouds?.all,
						pressure: res.data?.main?.pressure,
						temperature: Math.floor(res.data?.main?.temp - 273.15),
					});
				})
				.catch((err) => {
					setErrorAPI(
						'Error al comunicarse con la API, inténtelo de nuevo más tarde.',
					);
					setInterval(() => {
						setErrorAPI(null);
					}, 3000);
				})
				.finally(() => {
					setIsLoaded(true);
				});
		}
	}, [coords]); //cuanto el segundo parámetro se ejecute(dependencia), va a hacer lo del primero

	return (
		<div>
			{isLoaded ? (
				<Card
					errorL={errorL}
					errorAPI={errorAPI}
					weather={weather}
					toggle={toggle}
					setToggle={setToggle}
				/>
			) : (
				<h2>
					<img src="/loading.gif" alt="loading" />
					<br />
					Loading...
				</h2>
			)}
		</div>
	);
}

export default App;
