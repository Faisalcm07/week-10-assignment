import { db } from "@/app/utils/connect"


export default async function Comments({ id }) {

  const result = await db.query(
    "SELECT * FROM comments WHERE movie_id = $1 ORDER BY id DESC",
    [id]
  );
 const comments = result.rows;

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div key={comment.id}>
          <p className="comment-item">{comment.comment}</p>
          <p className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}