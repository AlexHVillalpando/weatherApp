import React from 'react';

function CardButton({ toggle, setToggle, temp }) {
	return (
		<div>
			<button className="card__button" onClick={() => setToggle(!toggle)}>
				{toggle ? <p>{temp} °C</p> : <p>{temp} °F</p>}
			</button>
		</div>
	);
}

export default CardButton;
