import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Movie from "./components/Movie";
import Swipeable from "./components/Swipeable";
import ReactPlayer from "react-player";
import DotLoader from "react-spinners/DotLoader";
import { motion } from "framer-motion";

import "./App.css";
import logo from "./logo-ah.png";
const style = { position: "fixed", top: "50%", left: "50%" };

function App() {
	const [movies, setMovies] = useState([]);
	const [status, setStatus] = useState("1");
	const [searchTerm, setSearchTerm] = useState("");
	const [Playback, setPlayback] = useState(false);
	const [fetchUrl, setFetchUrl] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		let url = "https://jikan1.p.rapidapi.com/genre/anime/" + status + "/1";
		console.log(url);
		fetch(url, {
			method: "GET",
			headers: {
				"x-rapidapi-key": process.env.REACT_APP_KEY,
				"x-rapidapi-host": process.env.REACT_APP_HOST,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setMovies(data.anime);
				setLoading(false);
			});
	}, [status]);

	function handleSubmit(e) {
		e.preventDefault();
	}

	function findAnimeTrailer(name) {
		setLoading(true);
		let safeText = name;
		let apiKey = process.env.REACT_APP_GAPI;
		console.log(safeText);
		fetch(
			`https://www.googleapis.com/youtube/v3/search/?part=snippet&key=${apiKey}&q=${safeText}trailer`
		)
			.then((res) => res.json())
			.then((data) => {
				setFetchUrl(`https://www.youtube.com/watch?v=${data.items[0].id.videoId}`);
				setLoading(false);
			});
	}

	function searchMovie() {
		let url = "https://jikan1.p.rapidapi.com/search/anime?q=" + searchTerm;
		fetch(url, {
			method: "GET",
			headers: {
				"x-rapidapi-key": process.env.REACT_APP_KEY,
				"x-rapidapi-host": process.env.REACT_APP_HOST,
			},
		})
			.then((response) => response.json())
			.then((data) => setMovies(data.results));

		setSearchTerm("");
	}

	return (
		<div className="root-container">
			<header>
				<div className="genre-menu">
					<Swipeable setStatus={setStatus} />
				</div>

				<navbrand
					className="appName"
					onClick={() => {
						setStatus("1");
					}}
				>
					<img src={logo} height="170" width="170" alt="" srcset="" />
				</navbrand>

				<form className="search-form" onSubmit={handleSubmit}>
					<input
						type="search"
						className="search"
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button type="submit" onClick={searchMovie} className="searchBtn">
						<SearchIcon className="searchIcon" />
					</button>
				</form>
			</header>

			{Playback ? (
				<motion.div
					transition={{ ease: "easeOut", duration: 2 }}
					id="video-modal"
					className="video-modal"
				>
					<ReactPlayer url={fetchUrl} />

					<button
						onClick={() => {
							setPlayback(false);
						}}
					>
						Close
					</button>
				</motion.div>
			) : null}

			<div className="movie-container">
				{loading ? (
					<div style={style}>
						{" "}
						<DotLoader
							className="loader"
							color={"#1CE7BF"}
							loading={loading}
							size={150}
						/>{" "}
					</div>
				) : (
					movies &&
					movies.map((movie) => (
						<Movie
							key={movie.rank}
							title={movie.title}
							poster_path={movie.image_url}
							vote_average={movie.score}
							overview={movie.synopsis}
							setPlayback={setPlayback}
							findAnimeTrailer={findAnimeTrailer}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default App;
