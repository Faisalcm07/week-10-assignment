import { getUser } from "@/app/utils/getUser"
import { db } from "@/app/utils/connect"
import Link from "next/link"
import Navbar from "@/app/components/nav"
 
export default async function UserPage() {
  const user = await getUser()
 
  const comments = (await db.query(`
    SELECT comments.*, movies.movie
    FROM comments
    JOIN movies
    ON comments.movie_id = movies.id
    WHERE comments.clerk_id = $1
  `, [user[0].clerk_id])).rows
 
  const movies = (await db.query(`
    SELECT * FROM movies
    WHERE clerk_id = $1
  `, [user[0].clerk_id])).rows
 
  return (
    <div className="profile-container">
      <Navbar />
 
      <div className="profile-header">
        <div className="profile-text">
          <h1>{user[0].display_name}</h1>
          <p>{user[0].bio || "No bio yet."}</p>
        </div>
        <div className="comments-number">
          <span>{comments.length}</span>
          <span>Comments</span>
        </div>
      </div>
 
      <div className="profile-activity">
        <h2>My Movies</h2>
        {movies.length === 0 ? (
          <p className="no-activity">You havent added any movies yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {movies.map((movie) => (
              <li key={movie.id} className="activity-item">
                <Link href={`/movies/${movie.id}`}>
                  <strong>{movie.movie}</strong>
                </Link>
                <p>{movie.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
 
      <div className="profile-activity">
        <h2>My Comments</h2>
        {comments.length === 0 ? (
          <p className="no-activity">You haven't commented on anything yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {comments.map((comment) => (
              <li key={comment.id} className="activity-item">
                <Link href={`/movies/${comment.movie_id}`}>
                  <strong>{comment.movie}</strong>
                </Link>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
