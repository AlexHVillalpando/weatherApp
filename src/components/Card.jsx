import React from 'react';
import './Card.css';

function Card({ errorAPI, errorL, weather, toggle, setToggle }) {
	const temp = toggle
		? weather.temperature
		: parseInt((weather.temperature * 9) / 5 + 32);

	return (
		<div className="card">
			<h1 className="card__title">Weather App</h1>
			<h2 className="card__subtitle">
				{errorAPI && <p>❌ {errorAPI}</p>}
				{errorL ? `❌ ${errorL}` : `${weather.city},${weather.country}`}
			</h2>
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
			<h2 className="card__temperature">
				{temp}
				{toggle ? '°C' : '°F'}
			</h2>

			<button className="card__button" onClick={() => setToggle(!toggle)}>
				{toggle ? (
					<p>
						<b>°C</b>/<small>°F</small>
					</p>
				) : (
					<p>
						<small>°C</small>/<b>°F</b>
					</p>
				)}
			</button>
		</div>
	);
}

export default Card;
