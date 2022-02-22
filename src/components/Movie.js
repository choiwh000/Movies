import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, rating, summary, genres }) {
  return (
    <div className={styles.movie}>
      <div claaName={styles.movieImg}>
        <img id={styles.coverImg} src={coverImg} alt={title} />
      </div>
      <div>
        <p className={styles.title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </p>
      </div>
      <h3>{rating}</h3>
      {/* <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p> */}
      {/* <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul> */}
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
