import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "@material-ui/icons/Search";
import Movie from "./components/Movie";
import Swipeable from "./components/Swipeable";
import ReactPlayer from "react-player";
import DotLoader from "react-spinners/DotLoader";

/* function addVideoModal() {
	let testData = document.getElementById("video-modal");
  
} */
const style = { position: "fixed", top: "50%", left: "50%" };
function App() {
	const [movies, setMovies] = useState([]);
	const [status, setStatus] = useState("1");
	const [searchTerm, setSearchTerm] = useState("");
	const [Playback, setPlayback] = useState(false);
	const [loading, setLoading] = useState(false);
	

	useEffect(() => {
		setLoading(true)
		let url = "https://jikan1.p.rapidapi.com/genre/anime/" + status + "/1";
		console.log(url);
		fetch(url, {
			method: "GET",
			headers: {
				"x-rapidapi-key": "1009e66191mshe5e97aee1afe149p1bbb93jsne196af4902ac",
				"x-rapidapi-host": "jikan1.p.rapidapi.com",
			},
		})
			.then((response) => response.json())
			.then((data) => {setMovies(data.anime); setLoading(false)
			});
	}, [status]);

	function handleSubmit(e) {
		e.preventDefault();
	}

	function searchMovie() {
		let url = "https://jikan1.p.rapidapi.com/search/anime?q=" + searchTerm;
		fetch(url, {
			method: "GET",
			headers: {
				"x-rapidapi-key": "1009e66191mshe5e97aee1afe149p1bbb93jsne196af4902ac",
				"x-rapidapi-host": "jikan1.p.rapidapi.com",
			},
		})
			.then((response) => response.json())
			.then((data) => setMovies(data.results));

		setSearchTerm("");
	}

	return (
		<div className="root-container">
			<header>
				<Swipeable setStatus={setStatus} />
				<navbrand
					className="appName"
					onClick={() => {
						setStatus("1");
					}}
				>
					aNIME hUNTER
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

			<div id="video-modal" className="video-modal">
				{Playback === true ? (
					<>
						<ReactPlayer url="https://www.youtube.com/watch?v=kDaC3RNurvA" />
						<button
							onClick={() => {
								setPlayback(false);
							}}
						>
							Close
						</button>
					</>
				) : (
					""
				)}
			</div>

			<div className="movie-container">
				{
				loading ? <div style={style}> <DotLoader className="loader" color={"#1CE7BF"} loading={loading} size={150} /> </div>:movies &&
					movies.map((movie) => (
						<Movie
							key={movie.rank}
							title={movie.title}
							poster_path={movie.image_url}
							vote_average={movie.score} 
							overview={movie.synopsis}
							setPlayback={setPlayback}
						/>
					))}
			</div>
		</div>
	);
}

export default App;
