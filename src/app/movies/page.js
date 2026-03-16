import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "../components/nav";
import { db } from "@/app/utils/connect"
import { auth } from "@clerk/nextjs/server"

 
export default async function posts() {
  const { userId } = await auth()
 
  const result = await db.query("SELECT id, movie, director, description, image, clerk_id FROM movies");
  const movies = result.rows;
 
  async function handleDelete(formData) {
    "use server";
    const id = formData.get("id");
    const { userId } = await auth()
    const movie = await db.query("SELECT clerk_id FROM movies WHERE id = $1", [id])
    if (movie.rows[0].clerk_id !== userId) {
      return
    }
    await db.query("DELETE FROM movies WHERE id = $1", [id]);
    redirect("/movies");
  }
 
  return (
    <div>
      <Navbar/>
      <div className="movies-container">
        <h1>Movies</h1>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="card">
              <img src={movie.image} alt={movie.movie} className="img" />
              <span>{movie.movie}</span>
              <p className="director">{movie.director}</p>
              <div className="card-buttons">
                <Link href={`/movies/${movie.id}`}>
                  <button type="button" className="details-button">Details</button>
                </Link>
                {movie.clerk_id === userId && (
                  <form action={handleDelete}>
                    <input name="id" type="hidden" value={movie.id} />
                    <button type="submit" className="delete-button">Delete</button>
                  </form>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No movies found</p>
        )}
      </div>
    </div>
  );
}