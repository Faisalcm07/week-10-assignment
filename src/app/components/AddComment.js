import { revalidatePath } from "next/cache";
import { db } from "@/app/utils/connect"
import { auth } from "@clerk/nextjs/server"
 
export default async function AddComment({ id }) {
  async function handleComment(formData) {
    "use server";
    const { userId } = await auth()
    const { comment } = Object.fromEntries(formData);
 
    await db.query(
      "INSERT INTO comments (comment, movie_id, clerk_id) VALUES ($1, $2, $3)",
      [comment, id, userId]
    );
 
    revalidatePath(`/movies/${id}`);
  }
 
  return (
    <div className="add-comment-form">
      <form action={handleComment}>
        <label htmlFor="comment">Enter a comment</label>
        <textarea placeholder="Enter a comment" name="comment" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}