import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import Movie from "../components/Movie";

function Category() {
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState([]);

  const getGenre = async () => {
    const jsonGenre = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?genre=action`)
    ).json();
    setGenre(jsonGenre.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getGenre();
  }, []);

  console.log(genre);

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
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
      {loading ? null : (
        <div className={styles.genZip}>
          <p>Action</p>
        </div>
      )}
      {loading ? null : (
        <div>
          <p id={styles.genTitle}>Movies</p>
          <div className={styles.movies}>
            {genre.map((gen) => (
              <Movie
                key={gen.id}
                id={gen.id}
                coverImg={gen.medium_cover_image}
                title={gen.title}
                summary={gen.summary}
                genres={gen.genres}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
