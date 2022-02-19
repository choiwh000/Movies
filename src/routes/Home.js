import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import useInterval from "use-interval";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
  console.log(movies[num]);
  const onClickP = () => {
    if (num === 0) {
      setNum(movies.length - 1);
    } else {
      setNum(num - 1);
    }
  }
  const onClickN = () => {
    if (num === movies.length - 1) {
      setNum(0);
    } else {
      setNum(num + 1);
    }
  }

  const elementL = <FontAwesomeIcon icon={faChevronLeft} />
  const elementR = <FontAwesomeIcon icon={faChevronRight} />

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
      {loading ? null : (
        <div
          style={{
            backgroundImage: `url(${movies[num].background_image})`,
            backgroundSize: `cover`,
            height: `55vh`,
            backgroundPosition: `center center`,
          }}
        >
          <p className={styles.btnP} onClick={onClickP} style={{cursor: 'pointer'}}>{elementL}</p>
          <p className={styles.btnN} onClick={onClickN} style={{cursor: 'pointer'}}>{elementR}</p>
          <div className={styles.slideZip}>
            <div className={styles.slide}>
              <img
                src={movies[num].large_cover_image}
                style={{ width: "250px" }}
              />
            </div>
            <div className={styles.slideTitle}>
              <p id={styles.zemok}>{movies[num].title}</p>
              <p>
                {movies[num].summary.length > 240
                  ? `${movies[num].summary.slice(0, 240)}...`
                  : movies[num].summary}
              </p>
            </div>
          </div>
        </div>
      )}

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
