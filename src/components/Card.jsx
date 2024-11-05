import React from 'react';

import './Card.css';

import CardTitle from './CardTitle.jsx';
import CardBody from './CardBody.jsx';
import CardTemperature from './CardTemperature.jsx';
import CardButton from './CardButton.jsx';

function Card({ errorAPI, errorL, isLoaded, weather, toggle, setToggle }) {
	const temp = toggle
		? weather.temperature
		: parseInt((weather.temperature * 9) / 5 + 32);

	return (
		<div className="card">
			{isLoaded ? (
				<>
					<CardTitle errorAPI={errorAPI} errorL={errorL} weather={weather} />
					<CardBody weather={weather} />
					<CardTemperature temp={temp} toggle={toggle} />
					<CardButton toggle={toggle} setToggle={setToggle} />
				</>
			) : (
				<>
					<img src="/loading.gif" alt="loading" />
					<br />
					Loading...
				</>
			)}
		</div>
	);
}

export default Card;
