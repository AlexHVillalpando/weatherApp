import React from 'react';

function CardAbout() {
	return (
		<div className="card__about">
			{' '}
			<link
				href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
				rel="stylesheet"
			/>{' '}
			<a href="https://github.com/AlexHVillalpando/weatherApp" target="_blank">
				<i className="bx bxl-github bx-tada-hover"></i>
			</a>
		</div>
	);
}

export default CardAbout;
