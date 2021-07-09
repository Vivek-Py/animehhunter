import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "@material-ui/icons/Search";
import Movie from "./components/Movie";
import Swipeable from "./components/Swipeable";

function App() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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
      .then((data) => setMovies(data.anime));
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

      <div className="movie-container">
        {movies &&
          movies.map((movie) => (
            <Movie
              key={movie.rank}
              title={movie.title}
              poster_path={movie.image_url}
              vote_average={movie.score}
              overview={movie.synopsis}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
