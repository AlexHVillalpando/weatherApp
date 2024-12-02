import React from 'react';
import { FaSearch } from 'react-icons/fa';

function CardBody({ weather }) {
	return (
		<div className="card__body">
			<div className="card__body--leftbar">
				<div className="icon__container">
					<img src={weather.icon} alt={weather.main} width={100} />
				</div>
				<h3 className="card__main">{`"${weather.main}"`}</h3>
			</div>
			<div className="card__info">
				<form className="card__form" action="">
					<button className="card__form--btn">
						<FaSearch />
					</button>
					<div className="card__form--box-container">
						<input
							className="card__form--box"
							type="text"
							placeholder="Enter city..."
						/>
					</div>
				</form>
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
