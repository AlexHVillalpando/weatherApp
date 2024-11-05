import React from 'react';

function CardButton({ toggle, setToggle }) {
	return (
		<div>
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

export default CardButton;
