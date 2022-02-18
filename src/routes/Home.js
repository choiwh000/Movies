import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import useInterval from "use-interval";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [num, setNum] = useState(0);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  useInterval(() => {
    if (num === movies.length - 1) {
      setNum(0);
    } else {
      setNum(num + 1);
    }
  }, 10000);

  return (
    <div>
      <header>
        <Link to={`/Movies`} id={styles.logo}>
          Logo
        </Link>
        <ul id={styles.home_ul}>
          <li>
            <Link to={`/Movies`}>Main</Link>
          </li>
          <li>
            <Link to={`/movie/category`}>Category</Link>
          </li>
          <li>
            <Link to={`/movie/My`}>My</Link>
          </li>
        </ul>
      </header>
      <div>{num}</div>
      <div>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <div>
            <img src={movies[num].large_cover_image} />
          </div>
        )}
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
