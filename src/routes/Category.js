import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import Movie from "../components/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Category() {
  const esc = <FontAwesomeIcon icon={faXmark} style={{ fontSize: "34px" }} />;
  const hambar = <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px" }} />;

  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState([]);
  const [select, setSelect] = useState();
  const [ham, setHam] = useState(false);
  const [click, setClick] = useState(true);
  const [hamClick, setHamClick] = useState(true);

  useEffect(() => {
    setPosition();
  }, []);

  const setPosition = () => {
    if (window.innerWidth <= 600) {
      setHam(true);
      setHamClick(false);
    } else if (window.innerWidth > 600) {
      setHam(false);
      setHamClick(true);
    }
  };

  const clicked = () => {
    if (click === true) {
      setClick(false);
      setHamClick(true);
    } else {
      setClick(true);
      setHamClick(false);
    }
  };

  const linkClick = () => {
    setClick(true);
    setHamClick(false);
  };

  window.addEventListener("resize", setPosition);

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
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?genre=${
          select ? select : "action"
        }`
      )
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
          <Link to={`/Movies`} id={styles.logo} onClick={linkClick}>
            Logo
          </Link>
          {ham ? (
            <p id={styles.ham} onClick={clicked}>
              {click ? hambar : esc}
            </p>
          ) : null}
          {hamClick ? (
            <ul id={styles.home_ul}>
              <li>
                <Link to={`/Movies`} onClick={linkClick}>
                  Main
                </Link>
              </li>
              <li>
                <Link to={`/category`} onClick={linkClick}>
                  Category
                </Link>
              </li>
              <li>
                <Link to={`/Movies/my`} onClick={linkClick}>
                  My
                </Link>
              </li>
            </ul>
          ) : null}
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
          <p id={styles.genTitle}>{select ? select : "Action"} Movies</p>
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
