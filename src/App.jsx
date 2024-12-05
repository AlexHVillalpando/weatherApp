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

import {
	thunderstormDay,
	drizzleDay,
	rainDay,
	snowDay,
	atmosphereDay,
	clearDay,
	cloudDay,
} from './assets/images/backgrounds/day/index.js';

import {
	thunderstormNight,
	drizzleNight,
	rainNight,
	snowNight,
	atmosphereNight,
	clearNight,
	cloudNight,
} from './assets/images/backgrounds/night/index.js';

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

const backgroundsDaytime = {
	thunderstorm: thunderstormDay,
	drizzle: drizzleDay,
	rain: rainDay,
	snow: snowDay,
	atmosphere: atmosphereDay,
	clear: clearDay,
	clouds: cloudDay,
};

const backgroundsNighttime = {
	thunderstorm: thunderstormNight,
	drizzle: drizzleNight,
	rain: rainNight,
	snow: snowNight,
	atmosphere: atmosphereNight,
	clear: clearNight,
	clouds: cloudNight,
};

let errorL = '';

function App() {
	const [coords, setCoords] = useState(initialState);
	const [weather, setWeather] = useState({});
	const [toggle, setToggle] = useState(true);
	const [errorAPI, setErrorAPI] = useState(null);
	const [isLoaded, setIsLoaded] = useState(true);
	const [icons, setIcons] = useState(iconsDaytime);
	const [bgs, setBgs] = useState(backgroundsDaytime);
	const [currentBg, setCurrentBg] = useState('');

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setCoords({ latitude, longitude }); //desestructuramos
			},
			(error) => {
				errorL = `${error.message}. Showing weather at 0°00'00"N 0°00'00"E.`;
			},
		);
	}, []);

	useEffect(() => {
		setIsLoaded(false);
		axios
			.get(`${url}lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`)
			.then((res) => {
				//imprimimos en consola para ver la estructura de la respuesta res
				const keys = Object.keys(conditionCodes);

				const iconName = keys.find((key) =>
					conditionCodes[key].includes(res.data?.weather[0]?.id),
				);
				setCurrentBg(iconName);
				setWeather({
					city: res.data?.name,
					country: res.data?.sys?.country,
					icon: icons[iconName],
					main: res.data?.weather[0]?.main,
					wind: res.data?.wind?.speed,
					clouds: res.data?.clouds?.all,
					pressure: res.data?.main?.pressure,
					temperature: Math.floor(res.data?.main?.temp - 273.15),
					localTimeSec: res.data?.dt + 21600 + res.data?.timezone,
					localTime: new Date(
						(res.data?.dt + 21600 + res.data?.timezone) * 1000,
					)
						.toString()
						.slice(16, 24),
					sunrise: new Date(
						(res.data?.sys?.sunrise + 21600 + res.data?.timezone) * 1000,
					)
						.toString()
						.slice(16, 24),
					sunset: new Date(
						(res.data?.sys?.sunset + 21600 + res.data?.timezone) * 1000,
					)
						.toString()
						.slice(16, 24),
					timezone: res.data?.timezone / 3600,
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
	}, [coords]); //cuanto el segundo parámetro se ejecute(dependencia), va a hacer lo del primero

	useEffect(() => {
		const isBeforeSunrise =
			parseInt(weather.localTime?.toString().split(':').join(''), 10) <
			parseInt(weather.sunrise?.toString().split(':').join(''), 10);
		const isAfterSunset =
			parseInt(weather.sunset?.toString().split(':').join(''), 10) <
			parseInt(weather.localTime?.toString().split(':').join(''), 10);

		if (weather.localTime && (isBeforeSunrise || isAfterSunset)) {
			setIcons(iconsNighttime);
			setBgs(backgroundsNighttime);
			//console.log(`hora local: ${weather.localTime}`);
			//console.log('es de noche');
		} else {
			setIcons(iconsDaytime);
			setBgs(backgroundsDaytime);
			//console.log(`hora local: ${weather.localTime}`);
			//console.log('es de día');
		}
	}, [weather]);

	const handleSearch = (input) => {
		setIsLoaded(false);
		axios
			.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=3&appid=${key}`,
			)
			.then((res) => {
				setCoords({
					latitude: res.data[0]?.lat,
					longitude: res.data[0].lon,
				});
			})
			.catch(() => {
				setErrorAPI(
					'Error al comunicarse con la API, inténtelo de nuevo más tarde refrescando la página.',
				);
			})
			.finally(() => {
				setIsLoaded(true);
			});
	};

	return (
		<div
			className="container"
			style={{ backgroundImage: `url(${bgs[currentBg]})` }}
		>
			<Card
				errorL={errorL}
				errorAPI={errorAPI}
				isLoaded={isLoaded}
				weather={weather}
				toggle={toggle}
				setToggle={setToggle}
				handleSearch={handleSearch}
			/>
		</div>
	);
}

export default App;
