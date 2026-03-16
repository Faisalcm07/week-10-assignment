import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/app/utils/connect"
import Navbar from "@/app/components/nav"
import Image from "next/image"
 
export default async function CreateProfile() {
  const user = await currentUser()
 
  async function handleSubmitNewUser(formData) {
    "use server"
    const { display_name, bio } = Object.fromEntries(formData)
    const { userId } = await auth()
    await db.query(
      `INSERT INTO users (clerk_id, display_name, bio) VALUES ($1, $2, $3)`,
      [userId, display_name, bio]
    )
    redirect(`/users/userPage`)
  }
 
  return (
    <div>
      <Navbar />
      <div className="new-user-container">
        {user?.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="profile picture"
            width={80}
            height={80}
            style={{ borderRadius: "50%", marginBottom: "1rem" }}
          />
        )}
        <h2>please Create your profile</h2>
        <form className="new-user-form" action={handleSubmitNewUser}>
          <input name="display_name" placeholder="display name" />
          <input name="bio" placeholder="bio" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}