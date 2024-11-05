import { useState, useEffect } from 'react';
import axios from 'axios';

import conditionCodes from './utils/conditionCodes.js';
import url from './utils/url.js';
import key from './utils/key.js';

import {
	thunderstormSvg,
	drizzleSvg,
	rainSvg,
	snowSvg,
	atmosphereSvg,
	clearSvg,
	cloudSvg,
} from './assets/images/index.js';
import {
	thunderstormNightSvg,
	drizzleNightSvg,
	rainNightSvg,
	snowNightSvg,
	atmosphereNightSvg,
	clearNightSvg,
	cloudNightSvg,
} from './assets/images/indexNight.js';

import Card from './components/Card.jsx';

const initialState = {
	latitude: 0,
	longitude: 0,
};

const iconsDaytime = {
	thunderstorm: thunderstormSvg,
	drizzle: drizzleSvg,
	rain: rainSvg,
	snow: snowSvg,
	atmosphere: atmosphereSvg,
	clear: clearSvg,
	clouds: cloudSvg,
};

const iconsNighttime = {
	thunderstorm: thunderstormNightSvg,
	drizzle: drizzleNightSvg,
	rain: rainNightSvg,
	snow: snowNightSvg,
	atmosphere: atmosphereNightSvg,
	clear: clearNightSvg,
	clouds: cloudNightSvg,
};

let errorL = '';

const d = new Date();
let time = d.getHours();
console.log(time);

function App() {
	const [coords, setCoords] = useState(initialState);
	const [weather, setWeather] = useState({});
	const [toggle, setToggle] = useState(true);
	const [errorAPI, setErrorAPI] = useState(null);
	const [isLoaded, setIsLoaded] = useState(true);
	const [icons, setIcons] = useState(iconsDaytime);

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

	useEffect(() => {
		setIsLoaded(false);

		if (18 < time || time < 6) {
			setIcons(iconsNighttime);
		}
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
						'Error al comunicarse con la API, inténtelo de nuevo más tarde refrescando la página.',
					);
				})
				.finally(() => {
					setIsLoaded(true);
				});
		}
	}, [coords]); //cuanto el segundo parámetro se ejecute(dependencia), va a hacer lo del primero

	return (
		<div>
			<Card
				errorL={errorL}
				errorAPI={errorAPI}
				isLoaded={isLoaded}
				weather={weather}
				toggle={toggle}
				setToggle={setToggle}
			/>
		</div>
	);
}

export default App;
