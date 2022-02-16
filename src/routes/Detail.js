import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(true);
    setMovie(json.data.movie);
    console.log(json);
  };
  const { id } = useParams();
  useEffect(() => {
    getMovie();
  }, []);
  console.log(id);
  const movieGen = movie.genres;

  return (
    <div>
      {loading ? null : <h1>Loading...</h1>}
      <h1>{movie.id}</h1>
      <h1>{movie.background_image}</h1>
      <img src={movie.background_image_original} />
      <ul>
        {movieGen && movieGen.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
