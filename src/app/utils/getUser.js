import { auth } from "@clerk/nextjs/server"
import { db } from "@/app/utils/connect"
import { redirect } from "next/navigation"
 
export async function getUser() {
  const { userId } = await auth()
 
  if (!userId) {
    redirect("/users/newUser")
  }
 
  const user = await db.query(
    `SELECT * FROM users WHERE clerk_id = $1`,
    [userId]
  )
 
  if (user.rows.length === 0) {
    redirect("/users/newUser")
  }
 
  return user.rows
}