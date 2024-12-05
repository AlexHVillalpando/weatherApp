import React from 'react';

function CardTitle({ errorAPI, errorL, weather }) {
	return (
		<div>
			<h1 className="card__title">Weather App</h1>
			<h2 className="card__subtitle">
				{errorAPI && <p>❌ {errorAPI}</p>}
				{errorL ? `❌ ${errorL}` : `${weather.city},${weather.country}`}
			</h2>
		</div>
	);
}

export default CardTitle;
