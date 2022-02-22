import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import useInterval from "use-interval";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
    if (num + 2>= movies.length - 1) {
      setNum(0);
    } else {
      setNum(num + 2);
    }
  }, 7500);

  const onClickP = () => {
    if (num <= 0) {
      setNum(movies.length - 2);
    } else {
      setNum(num - 2);
    }
  };
  const onClickN = () => {
    if (num+2 >= movies.length-1) {
      setNum(0);
    } else {
      setNum(num + 2);
    }
  };

  const elementL = <FontAwesomeIcon icon={faChevronLeft} />;
  const elementR = <FontAwesomeIcon icon={faChevronRight} />;
  console.log(movies);
  return (
    <div>
      {loading ? null : (<header>
        <Link to={`/Movies`} id={styles.logo}>
          Logo
        </Link>
        <ul id={styles.home_ul}>
          <li>
            <Link to={`/Movies`}>Main</Link>
          </li>
          <li>
            <Link to={`/Movie/category`}>Category</Link>
          </li>
          <li>
            <Link to={`/Movie/my`}>My</Link>
          </li>
        </ul>
      </header>)}
      
      {loading ? null : (
        <div
          style={{
            backgroundImage: `url(${movies[num].background_image})`,
            backgroundSize: `cover`,
            height: `55vh`,
            backgroundPosition: `center center`,
            transition: "all 2s ease-in-out",
          }}
        >
          <p id={styles.slideNum}>
            {num/2 + 1} / {movies.length/2}
          </p>
          <p
            className={styles.btnP}
            onClick={onClickP}
            style={{ cursor: "pointer" }}
          >
            {elementL}
          </p>
          <p
            className={styles.btnN}
            onClick={onClickN}
            style={{ cursor: "pointer" }}
          >
            {elementR}
          </p>
          <div className={styles.slideZip}>
            <div className={styles.slide}>
              <Link to={`/movie/${movies[num].id}`}>
                <img
                  src={movies[num].large_cover_image}
                  style={{ width: "250px", transition: "all 1s ease-in-out" }}
                />
              </Link>
            </div>
            <div className={styles.slideTitle} >
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
        <div className={styles.loading}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        // <h1>Loading...</h1>
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