import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import Movie from "../components/Movie";

function Category() {
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState([]);
  const [select, setSelect] = useState();
  
  const gen = [
    "Action",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Film Noir",
  ];

  const getGenre = async () => {
    const jsonGenre = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?genre=${select ? select : 'action'}`)
    ).json();
    setGenre(jsonGenre.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getGenre();
  }, []);

  useEffect(() => {
    getGenre();
  }, [select]);

  console.log(genre);
  console.log(select);
  const onClick = (e) => {
    const target = e.target.innerText;
    setSelect(target);
  };

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
          <ul className={styles.genres}>
            <li onClick={onClick}>{gen[0]}</li>
            <li onClick={onClick}>{gen[1]}</li>
            <li onClick={onClick}>{gen[2]}</li>
            <li onClick={onClick}>{gen[3]}</li>
            <li onClick={onClick}>{gen[4]}</li>
            <li onClick={onClick}>{gen[5]}</li>
            <li onClick={onClick}>{gen[6]}</li>
            <li onClick={onClick}>{gen[7]}</li>
            <li onClick={onClick}>{gen[8]}</li>
            <li onClick={onClick}>{gen[9]}</li>
            <li onClick={onClick}>{gen[10]}</li>
          </ul>
        </div>
      )}
      {loading ? null : (
        <div>
          <p id={styles.genTitle}>{select ? select : 'Action'} Movies</p>
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
