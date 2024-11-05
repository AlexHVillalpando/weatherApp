import React from 'react';

function CardBody({ weather }) {
	return (
		<div className="card__body">
			<img src={weather.icon} alt={weather.main} width={100} />
			<div className="card__info">
				<h3 className="card__main">{`"${weather.main}"`}</h3>
				<p className="card__wind-speed">Wind speed: {weather.wind} m/s</p>
				<p className="card__clouds">Clouds: {weather.clouds}%</p>
				<p className="card__pressure">
					Barometric Pressure: {weather.pressure} hPa
				</p>
			</div>
		</div>
	);
}

export default CardBody;
