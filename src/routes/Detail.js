import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [loadingTwo, setLoadingTwo] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);

    console.log(json);
  };
  const { id } = useParams();

  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    LoadingTwo();
  }, [movie]);

  const LoadingTwo = () => {
    setLoadingTwo(movie.description_full);
  };

  const movieGen = movie.genres;

  const des = () => {
    if (loadingTwo && loadingTwo.length > 500) {
      return loadingTwo.slice(0, 500);
    } else {
      return loadingTwo;
    }
  };

  const elementDown = <FontAwesomeIcon icon={faCaretDown} />;
  const elementUp = <FontAwesomeIcon icon={faCaretUp} />;

  const [btn, setBtn] = useState(true);
  const [count, setCount] = useState(true);

  const onClickDown = () => {
    if (btn) {
      setBtn(false);
      setCount(false);
    } else {
      setBtn(true);
      setCount(true);
    }
  };
  const onCount = () => {
    if (loadingTwo.length > 500) {
      setCount(true);
    } else {
      setCount(false);
    }
  };
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: '-1',
          height: "100vh",
          width: "100vw",
          backgroundImage: `url(${movie.background_image_original})`,
          backgroundPosition: `center center`,
          backgroundSize: `cover`,
          opacity: 0.2,
        }}
      >
        {" "}
      </div>
      {loading ? null : (
        <header>
          <Link to={`/Movies`} id={styles.logo}>
            Logo
          </Link>
          <ul id={styles.home_ul}>
            <li>
              <Link to={`/Movies`}>Main</Link>
            </li>
            <li>
              <Link to={`/category`}>Category</Link>
            </li>
            <li>
              <Link to={`/Movies/my`}>My</Link>
            </li>
          </ul>
        </header>
      )}

      {loading ? (
        <div className={styles.loading}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div>
          <div className={styles.topSection}>
            <div id={styles.topBack}/>
            <div className={styles.titleZip}>
              <p id={styles.movieTitle}>{movie.title}</p>
              <p id={styles.movieRating}>💗 {movie.rating}</p>
              <p id={styles.movieRuntime}>🕓 {movie.runtime} min</p>
              <p id={styles.movieYear}>🎬 {movie.year}</p>
              <p id={styles.movieDescription}>
                📄 {count ? loadingTwo.slice(0, 500) + "..." : loadingTwo}
                <button id={styles.moreBtn} onClick={onClickDown}>
                  {btn ? elementDown : elementUp}
                </button>
              </p>
              <ul id={styles.movieGen}>
                {movieGen && movieGen.map((a) => <li key={a}>#{a}</li>)}
              </ul>
            </div>
          </div>
          <img src={movie.medium_cover_image} id={styles.topImg} />
        </div>
      )}
    </div>
  );
}

export default Detail;
