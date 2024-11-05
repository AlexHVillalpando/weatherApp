import React from 'react';

function CardTemperature({ temp, toggle }) {
	return (
		<div>
			<h2 className="card__temperature">
				{temp}
				{toggle ? '°C' : '°F'}
			</h2>
		</div>
	);
}

export default CardTemperature;
