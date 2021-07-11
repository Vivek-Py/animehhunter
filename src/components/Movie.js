import React from "react";

const Movie = (props) => {
	const {
		title,
		poster_path,
		vote_average,
		overview,
		setPlayback,
		findAnimeTrailer,
	} = props;

	function setVoteColor(vote) {
		if (vote >= 8) {
			return "green";
		} else if (vote >= 6) {
			return "orange";
		} else {
			return "red";
		}
	}

	return (
		<div className="movie">
			<img src={poster_path} alt="Poster of the anime." />
			<div className="movie-info">
				<h3>{title}</h3>
				<span className={`tag ${setVoteColor(vote_average)}`}>{vote_average}</span>
			</div>
			<div className="movie-overview">
				<h2>Overview: </h2>
				<button
					className="trailer"
					onClick={() => {
						findAnimeTrailer(title);

						setPlayback(true);
					}}
				>
					Watch Trailer
				</button>
				<p>{overview}</p>
			</div>
		</div>
	);
};

export default Movie;
