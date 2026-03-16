import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Navbar from "@/app/components/nav";
import { db } from "@/app/utils/connect"
import { auth } from "@clerk/nextjs/server"
 
export default async function NewMovie() {
  async function handleSubmit(formData) {
    "use server";
    const { userId } = await auth()
    const movie = formData.get("movie");
    const director = formData.get("director");
    const description = formData.get("description");
    const image = formData.get("image");
 
    await db.query(
      "INSERT INTO movies (movie, director, description, image, clerk_id) VALUES ($1, $2, $3, $4, $5)",
      [movie, director, description, image, userId]
    );
 
    revalidatePath("/");
    redirect("/movies");
  }
 
  return (
    <div>
      <div><Navbar/></div>
      <div className="add-movie-container">
        <h1>Add New Movie</h1>
        <form className="add-movie-form" action={handleSubmit}>
          <div>
            <label htmlFor="movie">Movie Title:</label>
            <input name="movie" required />
          </div>
          <div>
            <label htmlFor="director">Director:</label>
            <input name="director" required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea name="description" required />
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input name="image" required />
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
}
