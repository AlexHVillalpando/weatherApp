import React from 'react';

import './Card.css';

import CardTitle from './CardTitle.jsx';
import CardBody from './CardBody.jsx';
import CardButton from './CardButton.jsx';
import CardAbout from './CardAbout.jsx';
import CardLoader from './CardLoader.jsx';

function Card({
	errorAPI,
	errorL,
	isLoaded,
	weather,
	toggle,
	setToggle,
	handleSearch,
}) {
	const temp = toggle
		? weather.temperature
		: parseInt((weather.temperature * 9) / 5 + 32);

	return (
		<div className="card">
			{isLoaded ? (
				<>
					<CardTitle errorAPI={errorAPI} errorL={errorL} weather={weather} />
					<CardBody weather={weather} handleSearch={handleSearch} />
					<CardButton temp={temp} toggle={toggle} setToggle={setToggle} />
					<CardAbout />
				</>
			) : (
				<CardLoader />
			)}
		</div>
	);
}

export default Card;
