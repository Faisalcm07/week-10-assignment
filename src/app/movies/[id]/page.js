
import AddComment from "@/app/components/AddComment";
import Comments from "@/app/components/comment";
import Navbar from "@/app/components/nav";
import { db } from "@/app/utils/connect"
import { notFound } from "next/navigation"

export default async function MovieDetails({ params }) {
  const { id } = await params;

  const result = await db.query(
    "SELECT * FROM movies WHERE id = $1",
    [id]
  );
  const movie = result.rows[0];

   if (!movie) {
        notFound()
    }

  return (
    <div>
      <div><Navbar/></div>
      <div className="movie-details-container">
        <h2>{movie.movie}</h2>
        <p>{movie.director}</p>
        <p>{movie.description}</p>
        <img src={movie.image} alt={movie.movie} />
      </div>
      <div className="add-comment">
      <AddComment id={id} />
      </div>
      <div><Comments id={id} /></div>
    </div>
  );
}